/**
 * @swagger
 * components:
 *   schemas:
 *     TrackingItem:
 *       type: object
 *       properties:
 *         IdProcesso:
 *           type: integer
 *           description: Unique identifier for the tracking process.
 *         Numero_Processo:
 *           type: string
 *           description: Process number.
 *         Referencia_Cliente:
 *           type: string
 *           description: Client's reference for the process.
 *         IdCliente:
 *           type: integer
 *           description: Client ID.
 *         IdImportador:
 *           type: integer
 *           description: Importer ID.
 *         IdExportador:
 *           type: integer
 *           description: Exporter ID.
 *         Data:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the tracking event.
 *         Status:
 *           type: string
 *           description: Current status of the process.
 *         DescricaoEvento:
 *           type: string
 *           description: Description of the tracking event.
 *       example:
 *         IdProcesso: 12345
 *         Numero_Processo: "PROC-2024-001"
 *         Referencia_Cliente: "CLIENTREF-001"
 *         IdCliente: 49043
 *         IdImportador: 49043
 *         IdExportador: null
 *         Data: "2024-07-29T10:30:00Z"
 *         Status: "In Transit"
 *         DescricaoEvento: "Shipment left port"
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A human-readable error message.
 *         error:
 *           type: string
 *           description: Optional technical error detail.
 *       example:
 *         message: "Invalid credentials"
 *         error: "Authentication failed"
 */
export {}; // This file is primarily for JSDoc type definitions for Swagger
