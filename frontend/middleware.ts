    import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/"];
const publicRoutes = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const isProtected = protectedRoutes.includes(pathname);
  const isPublic = publicRoutes.includes(pathname);

  const accessToken = req.cookies.get("token")?.value;

  const isAuthenticated = Boolean(accessToken);

  // Si la ruta es pública y hay sesión, redirige al inicio
  if (isPublic && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Si la ruta es protegida y no hay access_token
  if (isProtected && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"]
};