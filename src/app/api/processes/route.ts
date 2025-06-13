import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/middlewares/auth';
import { getProcesses } from '@/lib/services/trackingService';

/**
 * @swagger
 * /processes:
 *   get:
 *     summary: Obtém uma lista de processos com seus eventos de rastreamento
 *     tags: [Processes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: referencia
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtra por um Número de Processo ou Referência de Cliente específico.
 *       - in: query
 *         name: data_processo_de
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: "Filtra processos abertos a partir desta data (formato: AAAA-MM-DD)."
 *       - in: query
 *         name: data_processo_ate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: "Filtra processos abertos até esta data (formato: AAAA-MM-DD)."
 *     responses:
 *       200:
 *         description: Lista de processos e seus eventos de rastreamento.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProcessWithFollows'
 *       401:
 *         description: Token de autenticação ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Proibido, token inválido ou expirado
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
export async function GET(req: NextRequest) {
  const authResult = await authenticateRequest(req);
  if (authResult.error) {
    return authResult.error;
  }

  const user = authResult.user!;

  try {
    const { searchParams } = new URL(req.url);
    const params = {
      referencia: searchParams.get('referencia') || undefined,
      data_processo_de: searchParams.get('data_processo_de') || undefined,
      data_processo_ate: searchParams.get('data_processo_ate') || undefined,
    };

    const data = await getProcesses(params, user.clientId);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar lista de processos:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Ocorreu um erro inesperado';
    return NextResponse.json(
      { message: 'Erro ao buscar lista de processos', error: errorMessage },
      { status: 500 }
    );
  }
} 