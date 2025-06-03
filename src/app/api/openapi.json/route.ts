import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';

const getServerUrl = () => {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  if (process.env.VERCEL_URL) { 
    return `https://${process.env.VERCEL_URL}`;
  }
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
};


const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TrackMaster API',
      version: '1.0.0',
      description: 'API de consulta de processos para parceiros, construída com Next.js e SQL Server. Segura, escalável e bem documentada.',
      contact: {
        name: 'Suporte da API',
        url: 'http://example.com/support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: `${getServerUrl()}/api`,
        description: 'Servidor do Ambiente Atual'
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
      schemas: { // Ensure schemas from DTOs are included
        // Schemas defined in src/lib/dto/tracking.ts will be picked up by apis glob
      }
    },
    security: [ 
      // { bearerAuth: [] } // Descomente para aplicar globalmente após a confirmação do funcionamento do login
    ],
  },
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
