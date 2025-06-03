import { getConnectionPool, sql } from '../config/db';

interface TrackingParams {
  referencia?: string;
}

export async function getTracking(params: TrackingParams, clientId: number) {
  const pool = await getConnectionPool();
  let query = `
    SELECT * 
    FROM vis_Tracking_Portal_Follow_API
    WHERE (IdCliente = @clientId OR IdImportador = @clientId OR IdExportador = @clientId)
  `;

  const request = pool.request();
  request.input('clientId', sql.Int, clientId);

  if (params.referencia) {
    query += ` AND (Numero_Processo = @referencia OR Referencia_Cliente = @referencia)`;
    request.input('referencia', sql.NVarChar, params.referencia);
  }

  query += ` ORDER BY Data ASC`;

  try {
    const result = await request.query(query);
    return result.recordset;
  } catch (error) {
    console.error("SQL Error in getTracking:", error);
    throw new Error("Failed to retrieve tracking data from database.");
  }
}
