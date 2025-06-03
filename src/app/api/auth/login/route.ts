import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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
 *                 example: PowerTrade
 *               password:
 *                 type: string
 *                 example: minhasenha
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

    // Em uma aplicação real, valide as credenciais contra um banco de dados.
    // Para esta demonstração, as credenciais são fixas.
    if (username === 'PowerTrade' && password === 'minhasenha') {
      // Para fins de demonstração, o clientId é fixo. Em uma aplicação real, obtenha do registro do usuário.
      const clientId = 49043; 
      const userPayload = { user: username, clientId: clientId };
      
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
