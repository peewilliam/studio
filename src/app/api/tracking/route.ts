
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
 *         description: Dados de rastreamento recuperados com sucesso. A estrutura da resposta varia; se 'referencia' for fornecida, retorna um objeto {process, follow}. Caso contrário, retorna um array de objetos, onde cada objeto combina informações do processo com um evento de follow-up.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/TrackingResponseByReferencia'
 *                 - type: array
 *                   items:
 *                     type: object
 *                     description: Combina informações do processo com um evento de follow-up.
 *                     allOf:
 *                       - $ref: '#/components/schemas/ProcessInfo'
 *                       - type: object
 *                         properties:
 *                           Data:
 *                             type: string
 *                             format: date-time
 *                             description: Timestamp do evento de rastreamento (data e hora UTC).
 *                             example: "2022-05-06T17:42:00.000Z"
 *                           DataConvertido:
 *                             type: string
 *                             description: Data e hora do evento formatada (geralmente dd/MM/yyyy HH:mm:ss).
 *                             example: "06/05/2022 17:42:00"
 *                           Descricao:
 *                             type: string
 *                             description: Descrição detalhada do evento de rastreamento.
 *                             example: "Agradecemos pelo fechamento! ..."
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
