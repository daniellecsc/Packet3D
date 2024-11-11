'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  let errorOccurred = false;
  // Extract data from FormData
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  try {
    await signIn('credentials', {
      redirect: false, // Don't redirect automatically, handle manually
      email,
      password,
    });
  } catch (error) {
    errorOccurred = true;
    if (error instanceof AuthError) {
      console.log(error);
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  } finally {
    if (!errorOccurred) {
      redirect('/admin/feedbacks');
    }
  }
}
