import { SignJWT, jwtVerify } from 'jose';
import { User } from '@/types/auth';

export const JWT_SECRET = new TextEncoder().encode('WTD#G$#$11nEg9bKnH^95b6izJo^NWNR');

/**
 * Generate JWT token
 * @param user - User data without password
 * @returns JWT token
 */
export async function generateToken(user: Omit<User, 'password'>): Promise<string> {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

/**
 * Verify JWT token
 * @param token - JWT token to verify
 * @returns true if token is valid
 */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}
