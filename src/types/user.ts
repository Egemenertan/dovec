export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
} 