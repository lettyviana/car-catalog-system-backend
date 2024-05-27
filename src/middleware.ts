import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathBaseUrl = request.nextUrl.pathname;
  const isPublicPage = pathBaseUrl === "/login" || pathBaseUrl === "/";
  const token = request.cookies.get("authentication") || "";

  if (isPublicPage && token) {
    return Response.redirect(new URL("/admin", request.nextUrl));
  } else if (!isPublicPage && !token) {
    return Response.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/auth/login", "/auth/cadastro/:path*", "/admin/:path*"],
};
