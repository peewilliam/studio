
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Array de usuários de demonstração
// Em uma aplicação real, estes dados viriam de um banco de dados.
const demoUsers = [
  { username: 'sirius', password: 'proximos', clientId: 48277, name: 'Sirius Principal' },
  { username: 'powertrade', password: 'minhapower@2025', clientId: 49043, name: 'Power Trade' },
  // Adicione mais usuários de demonstração aqui, se necessário:
  // { username: 'outro_usuario', password: 'outra_senha', clientId: 12345, name: 'Outro Cliente' },
];

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica o usuário e obtém um token JWT
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
 *                 example: sirius
 *               password:
 *                 type: string
 *                 example: proximos
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida, token retornado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const foundUser = demoUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      const userPayload = { user: foundUser.username, clientId: foundUser.clientId, name: foundUser.name };
      
      const token = jwt.sign(userPayload, process.env.JWT_SECRET!, { expiresIn: '8h' });
      return NextResponse.json({ token });
    } else {
      return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado';
    return NextResponse.json({ message: 'Erro no servidor', error: errorMessage }, { status: 500 });
  }
}
