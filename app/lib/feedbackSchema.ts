// schemas/contactSchema.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'), // Ensures the name is not empty
  email: z
    .string()
    .email('Invalid email address') // Validates the email format
    .min(1, 'Email is required'), // Ensures the email is not empty
  feedback: z.string().min(1, 'Message is required'), // Ensures the feedback is not empty
});

// Create a TypeScript type from the schema
export type ContactFormData = z.infer<typeof contactSchema>;
