import { getConnectionPool, sql } from '../config/db';

interface TrackingParams {
  referencia?: string;
}

// Interface para os novos parâmetros de filtro
interface ProcessesParams {
  referencia?: string;
  data_processo_de?: string;
  data_processo_ate?: string;
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

// Interface para a nova resposta, um processo com seus follows
interface ProcessWithFollows {
  process: ProcessInfo;
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

      const followItems: FollowUpItem[] = recordset.map((record) => ({
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
    console.error('Erro SQL em getTracking:', error);
    // Lançar um erro mais específico ou formatado se necessário
    if (error instanceof Error) {
      throw new Error(
        `Falha ao recuperar dados de rastreamento: ${error.message}`
      );
    }
    throw new Error(
      'Falha ao recuperar dados de rastreamento do banco de dados.'
    );
  }
}

export async function getProcesses(
  params: ProcessesParams,
  clientId: number
): Promise<ProcessWithFollows[]> {
  const pool = await getConnectionPool();
  const request = pool.request();
  let query = `
    SELECT * 
    FROM vis_Tracking_Portal_Follow_API
    WHERE (IdCliente = @clientId OR IdImportador = @clientId OR IdExportador = @clientId)
  `;

  request.input('clientId', sql.Int, clientId);

  if (params.referencia) {
    query += ` AND (Numero_Processo = @referencia OR Referencia_Cliente = @referencia)`;
    request.input('referencia', sql.NVarChar, params.referencia);
  }

  if (params.data_processo_de) {
    query += ` AND Data_Abertura_Processo >= @data_processo_de`;
    request.input('data_processo_de', sql.DateTime, new Date(params.data_processo_de));
  } else if (params.data_processo_ate) {
    // Se só data_ate for fornecida, não fazemos nada com data_de (comportamento padrão)
  } else {
    // Se NENHUMA data de processo for fornecida, filtra pelo ano atual
    const anoAtual = new Date().getFullYear();
    const inicioDoAno = new Date(anoAtual, 0, 1); // 1 de Janeiro do ano atual
    const fimDoAno = new Date(anoAtual, 11, 31, 23, 59, 59, 999); // 31 de Dezembro

    query += ` AND Data_Abertura_Processo BETWEEN @inicioDoAno AND @fimDoAno`;
    request.input('inicioDoAno', sql.DateTime, inicioDoAno);
    request.input('fimDoAno', sql.DateTime, fimDoAno);
  }

  if (params.data_processo_ate) {
    query += ` AND Data_Abertura_Processo <= @data_processo_ate`;
    request.input('data_processo_ate', sql.DateTime, new Date(params.data_processo_ate));
  }

  query += ` ORDER BY Numero_Processo, Data ASC`; // Ordenar para facilitar o agrupamento

  try {
    const result = await request.query(query);
    const recordset: TrackingRecord[] = result.recordset as TrackingRecord[];

    if (recordset.length === 0) {
      return [];
    }
    
    // Agrupar resultados por processo
    const processesMap = new Map<string, ProcessWithFollows>();

    recordset.forEach((record) => {
      const processId = record.Numero_Processo;
      if (!processesMap.has(processId)) {
        processesMap.set(processId, {
          process: {
            IdCliente: record.IdCliente,
            Cliente: record.Cliente,
            Numero_Processo: record.Numero_Processo,
            Data_Abertura_Processo: record.Data_Abertura_Processo,
            IdImportador: record.IdImportador,
            IdExportador: record.IdExportador,
            Referencia_Cliente: record.Referencia_Cliente,
          },
          follow: [],
        });
      }

      processesMap.get(processId)!.follow.push({
        Data: record.Data,
        DataConvertido: record.DataConvertido,
        Descricao: record.Descricao,
      });
    });

    return Array.from(processesMap.values());

  } catch (error) {
    console.error('Erro SQL em getProcesses:', error);
    if (error instanceof Error) {
      throw new Error(
        `Falha ao recuperar a lista de processos: ${error.message}`
      );
    }
    throw new Error('Falha ao recuperar a lista de processos do banco de dados.');
  }
}
