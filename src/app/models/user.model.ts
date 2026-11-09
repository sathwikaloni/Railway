export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  password?: string;
  gender: 'Male' | 'Female' | 'Other';
  createdAt: string;
}
