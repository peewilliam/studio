import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: PowerTrade
 *               password:
 *                 type: string
 *                 example: minhasenha
 *     responses:
 *       200:
 *         description: Authentication successful, token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // In a real application, validate credentials against a database
    if (username === 'PowerTrade' && password === 'minhasenha') {
      // For demo purposes, hardcoding clientId. In real app, fetch from user's record.
      const clientId = 49043; 
      const userPayload = { user: username, clientId: clientId };
      
      const token = jwt.sign(userPayload, process.env.JWT_SECRET!, { expiresIn: '8h' });
      return NextResponse.json({ token });
    } else {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Erro no servidor', error: errorMessage }, { status: 500 });
  }
}
