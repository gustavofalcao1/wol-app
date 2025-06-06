import { createHash } from 'crypto';
import { User, LoginCredentials, AuthResponse } from '@/types/auth';
import { SignJWT, jwtVerify } from 'jose';
import { users } from '@/data/users';

export const JWT_SECRET = new TextEncoder().encode('WTD#G$#$11nEg9bKnH^95b6izJo^NWNR');

/**
 * Hash a password using SHA-256
 * @param password - Plain text password
 * @returns Hashed password
 */
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

/**
 * Generate JWT token
 * @param user - User data without password
 * @returns JWT token
 */
async function generateToken(user: Omit<User, 'password'>): Promise<string> {
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

/**
 * Authenticate user
 * @param credentials - Login credentials
 * @returns Authentication response with token if successful
 */
export async function authenticate(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const user = users.find(u => u.username === credentials.username);

    if (!user) {
      return {
        success: false,
        message: 'User not found'
      };
    }

    const hashedPassword = hashPassword(credentials.password);
    if (user.password !== hashedPassword) {
      return {
        success: false,
        message: 'Invalid password'
      };
    }

    const { password, ...userWithoutPassword } = user;
    const token = await generateToken(userWithoutPassword);

    return {
      success: true,
      message: 'Authentication successful',
      token,
      user: userWithoutPassword
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      message: 'Authentication failed'
    };
  }
}
