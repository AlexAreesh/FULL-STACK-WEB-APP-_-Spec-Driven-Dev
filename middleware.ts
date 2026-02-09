import { betterAuth } from 'better-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Initialize Better Auth
const auth = betterAuth({
  // Configuration will come from environment variables
});

export async function middleware(request: NextRequest) {
  // Protect routes that start with /dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Check if user is authenticated
    const session = await auth.getSession({
      headers: request.headers,
    });
    
    if (!session) {
      // Redirect to login if not authenticated
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

// Specify which paths the middleware should run for
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};