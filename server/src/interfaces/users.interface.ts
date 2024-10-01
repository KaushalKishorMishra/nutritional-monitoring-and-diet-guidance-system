export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
