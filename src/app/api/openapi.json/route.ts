import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';

// Determine server URL based on environment
const getServerUrl = () => {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  if (process.env.VERCEL_URL) { // Vercel deployment
    return `https://${process.env.VERCEL_URL}`;
  }
  // Fallback for local development or other environments
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
};


const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TrackMaster API',
      version: '1.0.0',
      description: 'API de consulta de processos para parceiros, construída com Next.js e SQL Server. Secure, scalable, and well-documented.',
      contact: {
        name: 'API Support',
        url: 'http://example.com/support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: `${getServerUrl()}/api`,
        description: 'Current Environment Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: Bearer {token}'
        },
      },
    },
    security: [ // You can apply security globally or per-operation
      // { bearerAuth: [] } // Uncomment to apply globally once login is confirmed working
    ],
  },
  // Path to the API docs
  // Note: glob patterns are relative to the current working directory when swaggerJsdoc is called
  apis: ['./src/app/api/**/route.ts'], 
};

export async function GET() {
  try {
    const openapiSpecification = swaggerJsdoc(swaggerOptions);
    return NextResponse.json(openapiSpecification);
  } catch (error) {
    console.error("Error generating OpenAPI spec:", error);
    return NextResponse.json({ message: "Error generating OpenAPI spec" }, { status: 500 });
  }
}
