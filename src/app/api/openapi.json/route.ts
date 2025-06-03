import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ConLine - Sirius API',
      version: '1.0.0',
      description: 'API Sirius da ConLine: Interface de integração para consulta e acompanhamento online de processos gerenciados através do sistema Sirius.',
      contact: {
        name: 'Suporte ConLine - Sirius API',
        url: 'https://conlinebr.com.br', 
        email: 'ti@conlinebr.com.br', 
      },
    },
    servers: [
      {
        url: '/api', 
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
      }
    },
    security: [ 
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
