import { auth } from '@/auth'; // Import auth from your auth.ts (or wherever NextAuth is configured)

export { auth as middleware } from '@/auth'; // This ensures the auth handler is used in the middleware

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
