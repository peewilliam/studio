import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/middlewares/auth';
import { getTracking } from '@/lib/services/trackingService';
import 'dotenv/config';

/**
 * @swagger
 * /api/tracking:
 *   get:
 *     summary: Obtém informações de rastreamento para o cliente autenticado
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: referencia
 *         schema:
 *           type: string
 *         description: Número de referência opcional (Numero_Processo ou Referencia_Cliente)
 *     responses:
 *       200:
 *         description: Dados de rastreamento recuperados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrackingItem'
 *       401:
 *         description: Token de autenticação ausente ou inválido
 *       403:
 *         description: Proibido, token inválido ou expirado
 *       500:
 *         description: Erro no servidor
 */
export async function GET(req: NextRequest) {
  const authResult = await authenticateRequest(req);
  if (authResult.error) {
    return authResult.error;
  }

  const user = authResult.user!;
  
  try {
    const { searchParams } = new URL(req.url);
    const referencia = searchParams.get('referencia') || undefined;

    const data = await getTracking({ referencia }, user.clientId);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados de tracking:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado';
    return NextResponse.json({ message: 'Erro ao buscar dados de tracking', error: errorMessage }, { status: 500 });
  }
}
