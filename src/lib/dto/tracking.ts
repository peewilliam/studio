/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: 'Mensagem de erro'
 *         error:
 *           type: string
 *           description: 'Descrição técnica opcional do erro'
 *       required:
 *         - message
 *       example:
 *         message: "Credenciais inválidas"
 *         error: "Falha na autenticação do usuário"
 * 
 *     ProcessInfo:
 *       type: object
 *       description: Informações básicas sobre um processo de comex.
 *       properties:
 *         IdCliente:
 *           type: integer
 *           description: ID do cliente principal do processo.
 *         Cliente:
 *           type: string
 *           description: Nome do cliente principal.
 *         Numero_Processo:
 *           type: string
 *           description: Identificador único do processo no sistema Sirius.
 *         Data_Abertura_Processo:
 *           type: string
 *           format: date-time
 *           description: Data e hora de abertura do processo.
 *         IdImportador:
 *           type: integer
 *           nullable: true
 *           description: ID do importador, se aplicável.
 *         IdExportador:
 *           type: integer
 *           nullable: true
 *           description: ID do exportador, se aplicável.
 *         Referencia_Cliente:
 *           type: string
 *           description: Referência fornecida pelo cliente para o processo.
 *
 *     FollowUpItem:
 *       type: object
 *       description: Representa um único evento de follow-up de um processo.
 *       properties:
 *         Data:
 *           type: string
 *           format: date-time
 *           description: Timestamp do evento de rastreamento (data e hora UTC).
 *         DataConvertido:
 *           type: string
 *           description: Data e hora do evento formatada (geralmente dd/MM/yyyy HH:mm:ss).
 *         Descricao:
 *           type: string
 *           description: Descrição detalhada do evento de rastreamento.
 *
 *     TrackingResponseByReferencia:
 *       type: object
 *       description: Resposta para uma consulta de tracking por referência específica.
 *       properties:
 *         process:
 *           $ref: '#/components/schemas/ProcessInfo'
 *         follow:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FollowUpItem'
 * 
 *     ProcessWithFollows:
 *       type: object
 *       description: "Representa um processo completo, incluindo suas informações básicas e todos os seus eventos de follow-up."
 *       properties:
 *         process:
 *           $ref: '#/components/schemas/ProcessInfo'
 *         follow:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FollowUpItem'
 */
export {}; // Este arquivo é primariamente para definições de tipo JSDoc para Swagger
