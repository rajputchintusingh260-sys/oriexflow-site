import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_USER = "admin";
const DEFAULT_PASS = "oriexflow2026";

export function middleware(req: NextRequest) {
  const expectedUser = process.env.DASHBOARD_USER || DEFAULT_USER;
  const expectedPass = process.env.DASHBOARD_PASSWORD || DEFAULT_PASS;

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const idx = decoded.indexOf(":");
      const user = decoded.slice(0, idx);
      const pass = decoded.slice(idx + 1);
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="ORIEXFLOW Ops", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
