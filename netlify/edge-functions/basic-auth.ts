// P&J Capital Portal — Access gate
//
// 預設全站擋下（path: "/*"），只在 excludedPath 明確放行少數公開路徑。
// 三種方式擇一通過即可：
//   1. 分享連結：/portal/?k=<SITE_LINK_TOKEN>
//      驗證成功後寫入 HttpOnly cookie，並保留完整分享網址，避免從網址列
//      複製時遺失 k。之後同一支手機開啟月報、PDF 都靠 cookie 通過。
//   2. 已持有有效 cookie（之前點過分享連結）。
//   3. 原本的 HTTP Basic Auth（SITE_USER / SITE_PASS），保留給你自己用。
//
// 撤銷所有分享連結：到 Netlify 改掉 SITE_LINK_TOKEN 並重新部署，
// 舊 cookie 的雜湊值對不上，會立即失效。
import type { Context, Config } from "@netlify/edge-functions";

const COOKIE_NAME = "pj_access";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 天

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

export default async (req: Request, context: Context) => {
  const user = Netlify.env.get("SITE_USER");
  const pass = Netlify.env.get("SITE_PASS");
  const linkToken = Netlify.env.get("SITE_LINK_TOKEN");
  const url = new URL(req.url);

  if (linkToken) {
    const expected = await sha256hex("pj-portal:" + linkToken);

    // 1. 分享連結
    const k = url.searchParams.get("k");
    if (k && safeEqual(k, linkToken)) {
      const response = await context.next();
      response.headers.append(
        "Set-Cookie",
        `${COOKIE_NAME}=${expected}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
      );
      response.headers.set("Cache-Control", "private, no-store");
      response.headers.set("Referrer-Policy", "no-referrer");
      return response;
    }

    // 2. cookie
    const c = context.cookies.get(COOKIE_NAME);
    if (c && safeEqual(c, expected)) {
      return context.next();
    }
  }

  // 3. Basic Auth（原邏輯）
  try {
    const authHeader = req.headers.get("authorization");
    if (authHeader && user && pass) {
      const [scheme, encoded] = authHeader.split(" ");
      if (scheme === "Basic" && encoded) {
        const decoded = atob(encoded);
        const sep = decoded.indexOf(":");
        const reqUser = decoded.slice(0, sep);
        const reqPass = decoded.slice(sep + 1);
        if (reqUser === user && reqPass === pass) {
          return context.next();
        }
      }
    }
  } catch {
    // Malformed Authorization header — fall through to 401
  }

  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="P&J Capital Portal", charset="UTF-8"',
    },
  });
};

export const config: Config = {
  path: "/*",
  excludedPath: [
    "/",
    "/index.html",
    "/logo-icon.png",
    "/.netlify/*",
  ],
};
