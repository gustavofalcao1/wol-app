import { z } from 'zod';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  VIEWER = 'viewer'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

// Schema Zod para validação
export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  status: z.nativeEnum(UserStatus),
  avatar: z.string().url().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  lastLogin: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// Tipo inferido do schema
export type UserType = z.infer<typeof userSchema>;

// Tipo para criação de usuário (sem id e timestamps)
export type CreateUserInput = Omit<UserType, 'id' | 'createdAt' | 'updatedAt' | 'lastLogin'> & {
  password: string;
};

// Tipo para atualização de usuário (todos os campos opcionais exceto id)
export type UpdateUserInput = Partial<Omit<UserType, 'id'>> & { id: string };

export interface AuthResponse {
  user: UserType;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  remember: z.boolean().optional()
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  name: z.string().min(1).max(100),
  confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterData = z.infer<typeof registerSchema>;

export interface AuthSession {
  user: UserType;
  expires: string;
}

export interface AuthTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
