// KS Capital Portal — site-wide Basic Auth gate
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
};
