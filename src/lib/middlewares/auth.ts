import jwt, { type JwtPayload } from 'jsonwebtoken';
import { type NextRequest, NextResponse } from 'next/server';

export interface AuthenticatedRequestUser extends JwtPayload {
  user: string;
  clientId: number;
}

export async function authenticateRequest(req: NextRequest): Promise<{ user?: AuthenticatedRequestUser; error?: NextResponse }> {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return { error: NextResponse.json({ message: 'Authentication token missing' }, { status: 401 }) };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthenticatedRequestUser;
    return { user: decoded };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return { error: NextResponse.json({ message: 'Token expired' }, { status: 403 }) };
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return { error: NextResponse.json({ message: 'Invalid token' }, { status: 403 }) };
    }
    return { error: NextResponse.json({ message: 'Forbidden' }, { status: 403 }) };
  }
}
