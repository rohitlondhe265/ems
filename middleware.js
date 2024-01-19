import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const email = req.nextauth.token?.email;
    const admins = ["rohitlondhe727@gmail.com", "vaibhavshilar9@gmail.com"];
    if (!admins.includes(email)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/admin/:path*"] };
