// KS Capital Portal — Basic Auth gate
//
// 預設全站擋下（path: "/*"），只在 excludedPath 明確放行少數公開路徑。
// 用「預設拒絕」而非「逐一列舉要保護的路徑」，是為了讓日後新增的月報資料夾
// （例如 2027_01/）自動受保護，不會因為忘了加規則而外洩。
import type { Context, Config } from "@netlify/edge-functions";

export default async (req: Request, context: Context) => {
  const user = Netlify.env.get("SITE_USER");
  const pass = Netlify.env.get("SITE_PASS");

  try {
    const authHeader = req.headers.get("authorization");

    if (authHeader) {
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
    // Malformed or non-Base64 Authorization header — fall through to 401 below
    // instead of crashing the edge function.
  }

  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="KS Capital Portal", charset="UTF-8"',
    },
  });
};

export const config: Config = {
  path: "/*",
  excludedPath: [
    // 品牌歡迎頁（index.html）。這是對外的公開門面，客戶要先看到它才能按
    // 「客戶登入」。頁面本身只有公司介紹，不含任何客戶資料，也沒有引用本站
    // 的其他檔案（字型走 Google CDN），所以放行它不會連帶暴露別的東西。
    "/",
    "/index.html",
    // Netlify 自己的內部端點。
    "/.netlify/*",
  ],
};
