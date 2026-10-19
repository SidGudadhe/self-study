import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'cognistudy-production-grade-super-secret-key-2026';

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export function signToken(payload: UserSession): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): UserSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserSession;
  } catch (err) {
    return null;
  }
}

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('cognistudy_token')?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function getAuthenticatedUserOrDemo(): Promise<{ id: string; email: string; name: string; role: string }> {
  const session = await getCurrentUser();
  if (session) {
    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (user) return { id: user.id, email: user.email, name: user.name, role: user.role };
  }

  // Fallback to default seeded student
  let defaultStudent = await prisma.user.findFirst({ where: { email: 'student@dbatu.ac.in' } });
  if (!defaultStudent) {
    defaultStudent = await prisma.user.findFirst();
  }
  return {
    id: defaultStudent!.id,
    email: defaultStudent!.email,
    name: defaultStudent!.name,
    role: defaultStudent!.role,
  };
}
