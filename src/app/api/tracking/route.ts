
import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/middlewares/auth';
import { getTracking } from '@/lib/services/trackingService';
import 'dotenv/config';

/**
 * @swagger
 * /tracking:
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
 *         required: false
 *         description: Número de referência opcional (Numero_Processo ou Referencia_Cliente) para filtrar um processo específico. Se não fornecido, retorna todos os eventos de tracking para o cliente.
 *     responses:
 *       200:
 *         description: Dados de rastreamento recuperados com sucesso. A estrutura da resposta varia; se 'referencia' for fornecida, retorna um objeto {process, follow}. Caso contrário, retorna um array de todos os eventos de tracking (TrackingItem).
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/TrackingResponseByReferencia'
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/TrackingItem'
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
    const referencia = searchParams.get('referencia') || undefined;

    const data = await getTracking({ referencia }, user.clientId);
    
    // Se 'referencia' foi usada e 'process' é null, poderia ser um 404, mas a lógica atual do serviço retorna {process: null, follow: []}
    // Para consistência com o retorno quando a referência não é usada (que pode ser um array vazio),
    // retornar 200 com os dados (ou {process: null, follow: []}) é aceitável.
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados de tracking:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado';
    return NextResponse.json({ message: 'Erro ao buscar dados de tracking', error: errorMessage }, { status: 500 });
  }
}
