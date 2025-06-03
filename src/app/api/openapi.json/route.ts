import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';

// A função getServerUrl não é mais necessária, pois usaremos uma URL relativa.

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TrackMaster API',
      version: '1.0.0',
      description: 'API de consulta de processos para parceiros, construída com Next.js e SQL Server. Segura, escalável e bem documentada.',
      contact: {
        name: 'Suporte da API',
        url: 'http://example.com/support', // Substitua pelo link real, se houver
        email: 'support@example.com', // Substitua pelo email real, se houver
      },
    },
    servers: [
      {
        url: '/api', // Usar URL relativa. Swagger UI irá resolvê-la com base no host atual.
        description: 'Servidor da API (Relativo ao Host Atual)'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT no formato: Bearer {token}'
        },
      },
      schemas: { 
        // Schemas definidos em src/lib/dto/tracking.ts serão incluídos pelo glob 'apis'
      }
    },
    security: [ 
      // { bearerAuth: [] } // Pode ser descomentado para aplicar segurança globalmente
    ],
  },
  // Os paths para os arquivos contendo as definições da API (anotações JSDoc)
  apis: ['./src/app/api/**/route.ts', './src/lib/dto/**/*.ts'], 
};

export async function GET() {
  try {
    const openapiSpecification = swaggerJsdoc(swaggerOptions);
    return NextResponse.json(openapiSpecification);
  } catch (error) {
    console.error("Erro ao gerar especificação OpenAPI:", error);
    return NextResponse.json({ message: "Erro ao gerar especificação OpenAPI" }, { status: 500 });
  }
}
