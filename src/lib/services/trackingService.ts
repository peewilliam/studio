
import { getConnectionPool, sql } from '../config/db';

interface TrackingParams {
  referencia?: string;
}

// Interface para o formato de cada linha retornada pela view/query
interface TrackingRecord {
  IdCliente: number;
  Cliente: string;
  Numero_Processo: string;
  Data_Abertura_Processo: string; // Ou Date
  IdImportador: number | null;
  IdExportador: number | null;
  Referencia_Cliente: string;
  Data: string; // Ou Date, data do evento de follow-up
  DataConvertido: string; // Data formatada do evento
  Descricao: string; // Descrição do evento
  // Outros campos que possam existir na view e sejam parte do processo ou do evento
  [key: string]: any; // Para flexibilidade com outros campos não listados explicitamente
}

interface ProcessInfo {
  IdCliente: number;
  Cliente: string;
  Numero_Processo: string;
  Data_Abertura_Processo: string;
  IdImportador: number | null;
  IdExportador: number | null;
  Referencia_Cliente: string;
  // Adicionar outros campos fixos do processo aqui, se houver
}

interface FollowUpItem {
  Data: string;
  DataConvertido: string;
  Descricao: string;
}

interface TrackingResponseByReferencia {
  process: ProcessInfo | null;
  follow: FollowUpItem[];
}

export async function getTracking(
  params: TrackingParams,
  clientId: number
): Promise<TrackingResponseByReferencia | TrackingRecord[]> {
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
    const recordset: TrackingRecord[] = result.recordset as TrackingRecord[];

    if (params.referencia) {
      if (recordset.length === 0) {
        return { process: null, follow: [] };
      }

      const firstRecord = recordset[0];
      const processInfo: ProcessInfo = {
        IdCliente: firstRecord.IdCliente,
        Cliente: firstRecord.Cliente,
        Numero_Processo: firstRecord.Numero_Processo,
        Data_Abertura_Processo: firstRecord.Data_Abertura_Processo,
        IdImportador: firstRecord.IdImportador,
        IdExportador: firstRecord.IdExportador,
        Referencia_Cliente: firstRecord.Referencia_Cliente,
        // Copie quaisquer outros campos que são específicos do processo e não do evento
        // Ex: IdProcesso: firstRecord.IdProcesso, (se existir)
      };

      const followItems: FollowUpItem[] = recordset.map(record => ({
        Data: record.Data,
        DataConvertido: record.DataConvertido,
        Descricao: record.Descricao,
      }));

      return { process: processInfo, follow: followItems };
    } else {
      // Se não houver referência, retorna a lista de eventos como está (comportamento original)
      // Cada item no array será um TrackingRecord completo
      return recordset;
    }
  } catch (error) {
    console.error("Erro SQL em getTracking:", error);
    // Lançar um erro mais específico ou formatado se necessário
    if (error instanceof Error) {
        throw new Error(`Falha ao recuperar dados de rastreamento: ${error.message}`);
    }
    throw new Error("Falha ao recuperar dados de rastreamento do banco de dados.");
  }
}
