import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { db } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

// Fetch the user from the database by email
async function getUser(email: string): Promise<any | undefined> {
  try {
    const user = await db.sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null; // Return null if there is an error fetching the user
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validate input using Zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          console.log(user);
          if (!user) return null;
          const passwordsMatch = password === user.password;
          console.log('Inputted password: ' + password);
          console.log('Password in db: ' + user.password);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null; // Return null if credentials are invalid
      },
    }),
  ],
});
