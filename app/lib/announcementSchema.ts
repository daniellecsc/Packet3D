// schemas/contactSchema.ts
import { z } from 'zod';

export const announcementSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'), // Ensures the name is not empty
  content: z.string().min(1, 'Content is required'),
});

// Create a TypeScript type from the schema
export type AnnouncementFormData = z.infer<typeof announcementSchema>;
