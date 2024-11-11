export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  updated_at: Date;
  emailVerified: Date | null;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};
