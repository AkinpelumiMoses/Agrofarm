
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' |'staff';
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  address?: string;
  phone?: string;
  password: string;
  role?: 'user' | 'admin' ;
}

export interface StaffRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}