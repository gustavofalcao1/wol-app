import { createHash } from 'crypto';
import { User, LoginCredentials, AuthResponse } from '@/types/auth';
import { users } from '@/data/users';
import { generateToken } from './auth-edge';

/**
 * Hash a password using SHA-256
 * @param password - Plain text password
 * @returns Hashed password
 */
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
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