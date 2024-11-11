import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/adminLogin', // Custom sign-in page
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isHomePage = nextUrl.pathname === '/';
      const isOnDashboard = nextUrl.pathname.startsWith('/feedback');

      // Allow access to the home page without authentication
      if (isHomePage) return true;

      if (isOnDashboard) {
        // Redirect unauthenticated users to the login page
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        // Redirect authenticated users to the dashboard
        return Response.redirect(new URL('/feedback/feedbacks', nextUrl));
      }
      return true;
    },

    // Handle the session callback to attach the user info to the session
    async jwt({ token, user }) {
      // If the user is defined (i.e., it's the first login), you can add data to the JWT token
      if (user) {
        token.id = user.id as string; // Assuming `user.id` is available
      }
      return token;
    },

    async session({ session, token }) {
      // Add the custom token data to the session (e.g., add the user id from token)
      if (token.id) {
        session.user.id = token.id as string; // Ensure `token.id` is available here
      }
      return session;
    },
  },
  providers: [], // Providers will be defined in auth.ts
} satisfies NextAuthConfig;
