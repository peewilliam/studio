
/**
 * @swagger
 * components:
 *   schemas:
 *     ProcessInfo:
 *       type: object
 *       description: Informações detalhadas de um processo de comex.
 *       properties:
 *         IdCliente:
 *           type: integer
 *           description: Identificador único do cliente principal associado ao processo.
 *           example: 49491
 *         Cliente:
 *           type: string
 *           description: Nome do cliente.
 *           example: "RIO FASHION BOLSAS LTDA"
 *         Numero_Processo:
 *           type: string
 *           description: Número de identificação único do processo.
 *           example: "IM0923-22"
 *         Data_Abertura_Processo:
 *           type: string
 *           format: date-time
 *           description: Data e hora da abertura do processo.
 *           example: "2022-05-06T14:09:00.000Z"
 *         IdImportador:
 *           type: integer
 *           nullable: true
 *           description: Identificador único do importador, se aplicável.
 *           example: 49043
 *         IdExportador:
 *           type: integer
 *           nullable: true
 *           description: Identificador único do exportador, se aplicável.
 *           example: 52958
 *         Referencia_Cliente:
 *           type: string
 *           nullable: true
 *           description: Referência fornecida pelo cliente para este processo.
 *           example: "2351"
 *
 *     FollowUpItem:
 *       type: object
 *       description: Um evento de acompanhamento (follow-up) de um processo.
 *       properties:
 *         Data:
 *           type: string
 *           format: date-time
 *           description: Timestamp do evento de rastreamento (data e hora UTC).
 *           example: "2022-05-06T17:42:00.000Z"
 *         DataConvertido:
 *           type: string
 *           description: Data e hora do evento formatada (geralmente dd/MM/yyyy HH:mm:ss), conforme fornecido pelo sistema de origem.
 *           example: "06/05/2022 17:42:00"
 *         Descricao:
 *           type: string
 *           description: Descrição detalhada do evento de rastreamento.
 *           example: "Agradecemos pelo fechamento! Informamos que nosso agente foi instruído a contatar o exportador."
 *
 *     TrackingResponseByReferencia:
 *       type: object
 *       description: Resposta do rastreamento quando uma referência de processo específica é fornecida.
 *       properties:
 *         process:
 *           $ref: '#/components/schemas/ProcessInfo'
 *           nullable: true
 *           description: Detalhes do processo consultado. Será nulo se a referência não for encontrada.
 *         follow:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FollowUpItem'
 *           description: Lista de eventos de acompanhamento para o processo.
 *
 *     TrackingItem:
 *       type: object
 *       description: Representa um item individual de rastreamento de processo (um evento de follow-up completo, incluindo dados do processo repetidos). Usado quando nenhuma referência específica é fornecida, retornando uma lista de todos os eventos.
 *       allOf: # Combina ProcessInfo com os campos de evento
 *         - $ref: '#/components/schemas/ProcessInfo'
 *         - type: object
 *           properties:
 *             Data: # Data do evento de follow-up
 *               type: string
 *               format: date-time
 *               description: Timestamp do evento de rastreamento (data e hora UTC).
 *               example: "2022-05-06T17:42:00.000Z"
 *             DataConvertido: # DataConvertido do evento de follow-up
 *               type: string
 *               description: Data e hora do evento formatada (geralmente dd/MM/yyyy HH:mm:ss).
 *               example: "06/05/2022 17:42:00"
 *             Descricao: # Descricao do evento de follow-up
 *               type: string
 *               description: Descrição detalhada do evento de rastreamento.
 *               example: "Agradecemos pelo fechamento! ..."
 *
 *     ErrorResponse:
 *       type: object
 *       description: Estrutura padrão para respostas de erro da API.
 *       properties:
 *         message:
 *           type: string
 *           description: Uma mensagem de erro legível por humanos.
 *         error:
 *           type: string
 *           nullable: true
 *           description: Detalhe técnico opcional do erro.
 *       example:
 *         message: "Credenciais inválidas"
 *         error: "Falha na autenticação do usuário"
 */
export {}; // Este arquivo é primariamente para definições de tipo JSDoc para Swagger
