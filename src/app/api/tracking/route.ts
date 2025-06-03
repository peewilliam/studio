import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/middlewares/auth';
import { getTracking } from '@/lib/services/trackingService';
import 'dotenv/config';

/**
 * @swagger
 * /api/tracking:
 *   get:
 *     summary: Get tracking information for the authenticated client
 *     tags: [Tracking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: referencia
 *         schema:
 *           type: string
 *         description: Optional reference number (Numero_Processo or Referencia_Cliente)
 *     responses:
 *       200:
 *         description: Tracking data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IdCliente:
 *                     type: integer
 *                   IdImportador:
 *                     type: integer
 *                   IdExportador:
 *                     type: integer
 *                   Numero_Processo:
 *                     type: string
 *                   Referencia_Cliente:
 *                     type: string
 *                   Data:
 *                     type: string
 *                     format: date-time
 *                   # Add other relevant fields from vis_Tracking_Portal_Follow_API
 *       401:
 *         description: Authentication token missing or invalid
 *       403:
 *         description: Forbidden, token invalid or expired
 *       500:
 *         description: Server error
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
    console.error('Tracking data retrieval error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ message: 'Erro ao buscar dados de tracking', error: errorMessage }, { status: 500 });
  }
}
