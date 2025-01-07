import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./app/utils/supabase/middleware";
import { createClient } from "./app/utils/supabase/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  /*
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();



  if (!user && request.nextUrl.pathname.startsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/sign-in";
    return NextResponse.redirect(url);
  }

  if (user && request.nextUrl.pathname.startsWith("/auth")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }*/

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
