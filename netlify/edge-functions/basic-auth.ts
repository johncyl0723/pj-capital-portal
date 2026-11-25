// P&J Capital Portal — Access gate（單一登入畫面）
//
// 全站預設擋下（path: "/*"），只有登入頁本身與它需要的資源公開。
// 客戶只在 /portal/ 的登入畫面輸入一次密碼：
//   POST /api/login   {client, password} → 伺服器比對 → 發 HttpOnly cookie
//   GET  /api/session → 已有有效 cookie 回 200（頁面據此自動登入）
//   POST /api/logout  → 清除 cookie
// 其他通行方式：
//   - 分享連結 /portal/?k=<SITE_LINK_TOKEN>：直接發 cookie，進入後免輸入密碼。
//   - HTTP Basic Auth（SITE_USER / SITE_PASS）：只接受主動帶來的帳密，
//     不再回傳 WWW-Authenticate，因此瀏覽器不會跳出小視窗。
// 未通行時：網頁轉回 /portal/ 登入畫面；其他資源回 401。
//
// 帳密來源：CLIENT_LOGINS（JSON，例 {"sophia":"密碼"}，可放多位客戶）；
//           未設定時用 SITE_USER / SITE_PASS。
// cookie 400 天（Chrome 上限），每次開網頁自動續期。
// 撤銷所有已登入裝置：到 Netlify 改掉 SITE_LINK_TOKEN 並重新部署。
import type { Context, Config } from "@netlify/edge-functions";

const COOKIE_NAME = "pj_access";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 400;
const LOGIN_PAGE = "/portal/";

// 未登入也可讀取：登入頁本身（其餘公開路徑見 config.excludedPath）
const PUBLIC_PAGES = new Set(["/portal", "/portal/", "/portal/index.html"]);

async function sha256hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// 長度與內容皆比對，避免逐字元提早結束造成的時間差
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function setCookie(value: string, maxAge = COOKIE_MAX_AGE): string {
  return `${COOKIE_NAME}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

function json(body: unknown, status = 200, cookie?: string): Response {
  const headers = new Headers({ "Content-Type": "application/json", "Cache-Control": "no-store" });
  if (cookie) headers.append("Set-Cookie", cookie);
  return new Response(JSON.stringify(body), { status, headers });
}

function isPage(path: string): boolean {
  return path.endsWith("/") || path.endsWith(".html") || !/\.[A-Za-z0-9]+$/.test(path);
}

function clientLogins(): Record<string, string> {
  const raw = Netlify.env.get("CLIENT_LOGINS");
  if (raw) {
    try {
      const obj = JSON.parse(raw);
      if (obj && typeof obj === "object") return obj as Record<string, string>;
    } catch {
      // 格式錯誤時退回 SITE_USER / SITE_PASS
    }
  }
  const user = Netlify.env.get("SITE_USER");
  const pass = Netlify.env.get("SITE_PASS");
  return user && pass ? { [user]: pass } : {};
}

function checkLogin(client: string, password: string): boolean {
  const logins = clientLogins();
  let ok = false;
  for (const [u, p] of Object.entries(logins)) {
    // 逐一比對全部帳號，不提早結束
    if (safeEqual(u.toLowerCase(), client.trim().toLowerCase()) && safeEqual(p, password)) ok = true;
  }
  return ok;
}

export default async (req: Request, context: Context) => {
  const linkToken = Netlify.env.get("SITE_LINK_TOKEN");
  const url = new URL(req.url);
  const path = url.pathname;

  if (!linkToken) {
    return new Response("Portal is not configured (SITE_LINK_TOKEN missing).", { status: 503 });
  }
  const token = await sha256hex("pj-portal:" + linkToken);
  const c = context.cookies.get(COOKIE_NAME);
  const hasCookie = !!c && safeEqual(c, token);

  // ── API ──
  if (path === "/api/login") {
    if (req.method !== "POST") return json({ ok: false }, 405);
    let client = "", password = "";
    try {
      const body = await req.json();
      client = String(body.client ?? "");
      password = String(body.password ?? "");
    } catch {
      return json({ ok: false }, 400);
    }
    if (checkLogin(client, password)) return json({ ok: true }, 200, setCookie(token));
    await new Promise((r) => setTimeout(r, 600)); // 減緩暴力嘗試
    return json({ ok: false }, 401);
  }
  if (path === "/api/session") {
    return hasCookie ? json({ ok: true }, 200, setCookie(token)) : json({ ok: false }, 401);
  }
  if (path === "/api/logout") {
    return json({ ok: true }, 200, setCookie("", 0));
  }

  // ── 分享連結 ──
  const k = url.searchParams.get("k");
  if (k && safeEqual(k, linkToken)) {
    const response = await context.next();
    response.headers.append("Set-Cookie", setCookie(token));
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  }

  // ── 已登入 ──
  if (hasCookie) {
    const response = await context.next();
    if (isPage(path)) response.headers.append("Set-Cookie", setCookie(token));
    return response;
  }

  // ── 登入頁本身公開 ──
  if (PUBLIC_PAGES.has(path)) return context.next();

  // ── 主動帶來的 Basic Auth（不再要求，所以不會跳小視窗）──
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    try {
      const decoded = atob(authHeader.slice(6));
      const sep = decoded.indexOf(":");
      if (sep > 0 && checkLogin(decoded.slice(0, sep), decoded.slice(sep + 1))) {
        const response = await context.next();
        response.headers.append("Set-Cookie", setCookie(token));
        return response;
      }
    } catch {
      // 格式錯誤 → 視為未登入
    }
  }

  // ── 未登入 ──
  if (req.method === "GET" && isPage(path)) {
    return new Response(null, { status: 302, headers: { Location: LOGIN_PAGE, "Cache-Control": "no-store" } });
  }
  return new Response("Authentication required.", { status: 401, headers: { "Cache-Control": "no-store" } });
};

export const config: Config = {
  path: "/*",
  excludedPath: [
    "/",
    "/index.html",
    "/logo-icon.png",
    "/logo.png",
    "/portal-config.js",
    "/.netlify/*",
  ],
};
