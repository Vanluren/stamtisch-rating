import { PROTECTED_ROUTES, ROUTES } from "@/lib/routes";
import { NextRequest, NextResponse } from "next/server";

const checkProtectedRoutes = (req: NextRequest) => {
  const currentUser = req.cookies.get("currentUser")?.value;

  if (PROTECTED_ROUTES.includes(req.nextUrl.pathname) && !currentUser) {
    req.cookies.delete("currentUser");
    const response = NextResponse.redirect(
      new URL(ROUTES.LOGIN, req.nextUrl.origin).href,
    );

    return response;
  }
  if (
    [ROUTES.LOGIN, ROUTES.REGISTER].includes(req.nextUrl.pathname) &&
    currentUser
  ) {
    const response = NextResponse.redirect(
      new URL(ROUTES.HOME, req.nextUrl.origin).href,
    );

    return response;
  }
};
export function middleware(req: NextRequest) {
  const response = checkProtectedRoutes(req);

  return response;
}
