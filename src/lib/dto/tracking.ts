/**
 * @swagger
 * components:
 *   schemas:
 *     TrackingItem:
 *       type: object
 *       description: Representa um item individual de rastreamento de processo.
 *       properties:
 *         IdProcesso:
 *           type: integer
 *           description: Identificador único para o processo de rastreamento.
 *           example: 12345
 *         Numero_Processo:
 *           type: string
 *           description: Número oficial do processo.
 *           example: "PROC-2024-001"
 *         Referencia_Cliente:
 *           type: string
 *           description: Referência interna do cliente para o processo.
 *           example: "CLIENTREF-001"
 *         IdCliente:
 *           type: integer
 *           description: Identificador único do cliente.
 *           example: 49043
 *         IdImportador:
 *           type: integer
 *           nullable: true
 *           description: Identificador único do importador (se aplicável).
 *           example: 49043
 *         IdExportador:
 *           type: integer
 *           nullable: true
 *           description: Identificador único do exportador (se aplicável).
 *           example: null
 *         Data:
 *           type: string
 *           format: date-time
 *           description: Timestamp do evento de rastreamento (data e hora).
 *           example: "2024-07-29T10:30:00Z"
 *         Status:
 *           type: string
 *           description: Status atual do processo.
 *           example: "Em Trânsito"
 *         DescricaoEvento:
 *           type: string
 *           description: Descrição detalhada do evento de rastreamento.
 *           example: "Embarque saiu do porto de origem"
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
