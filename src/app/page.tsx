
'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Github, KeyRound, ArrowRightCircle, ShieldCheck, TerminalSquare, PackageSearch, Info } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const curlLoginExample = `
curl -X POST '${baseUrl}/api/auth/login' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "username": "sirius",
    "password": "proximos"
  }'`;

  const tokenResponseExample = `
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic2lyaXVzIiwiY2xpZW50SWQiOjQ5MDQzLCJuYW1lIjoiU2lyaXVzIFByaW5jaXBhbCIsImlhdCI6MTcyMzgxNzQwMiwiZXhwIjoxNzIzODQ2MjAyfQ.xxxxxxxxxxxx"
}`;

  const curlTrackingExample = `
curl -X GET '${baseUrl}/api/tracking' \\
  -H 'Authorization: Bearer SEU_TOKEN_JWT_AQUI'`;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-gradient-to-br from-background to-secondary">
      <div className="text-center mb-10">
        <PackageSearch className="mx-auto h-20 w-20 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-3">
          Bem-vindo à ConLine - Sirius API
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          API Sirius da ConLine: Interface de integração para consulta e acompanhamento online de processos gerenciados através do sistema Sirius.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 w-full max-w-5xl">
        <Card className="shadow-xl col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-headline text-primary flex items-center">
              <ArrowRightCircle className="mr-3 h-7 w-7" /> Como Começar
            </CardTitle>
            <CardDescription>
              Siga estes passos para autenticar e começar a usar a API.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center">
              <KeyRound className="mr-2 h-6 w-6 text-primary" /> Passo 1: Obtenha seu Token de Acesso
            </CardTitle>
            <CardDescription>
              Para acessar os endpoints protegidos, você precisará de um token JWT.
              Faça uma requisição POST para <code className="bg-muted px-1 py-0.5 rounded text-sm">/api/auth/login</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Credenciais de Demonstração:</h3>
              <p className="text-sm">Usuário: <code className="bg-muted px-1 py-0.5 rounded">sirius</code></p>
              <p className="text-sm">Senha: <code className="bg-muted px-1 py-0.5 rounded">proximos</code></p>
            </div>
            <div className="flex items-start p-3 bg-blue-50 border border-blue-200 rounded-md">
              <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700">
                As credenciais de demonstração fornecem acesso a um conjunto limitado de dados para teste. Consulte seu contato na ConLine para credenciais, se necessário.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Exemplo de Requisição (cURL):</h3>
              <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                <code className="language-bash">{baseUrl ? curlLoginExample.trim() : 'Carregando exemplo...'}</code>
              </pre>
              {!baseUrl && (
                <p className="text-xs text-muted-foreground mt-1">
                  Aguarde enquanto o exemplo de URL é carregado...
                </p>
              )}
            </div>
            <div>
              <h3 className="font-semibold mb-1">Exemplo de Resposta (Token JWT):</h3>
              <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                <code className="language-json">{tokenResponseExample.trim()}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline flex items-center">
              <ShieldCheck className="mr-2 h-6 w-6 text-primary" /> Passo 2: Faça Requisições Autenticadas
            </CardTitle>
            <CardDescription>
              Inclua o token JWT recebido no cabeçalho <code className="bg-muted px-1 py-0.5 rounded text-sm">Authorization</code> como <code className="bg-muted px-1 py-0.5 rounded text-sm">Bearer SEU_TOKEN</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Exemplo de Requisição (cURL para /api/tracking):</h3>
              <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                <code className="language-bash">{baseUrl ? curlTrackingExample.trim() : 'Carregando exemplo...'}</code>
              </pre>
              <p className="text-xs text-muted-foreground mt-1">
                Substitua <code className="bg-muted px-1 py-0.5 rounded text-xs">SEU_TOKEN_JWT_AQUI</code> pelo token obtido no Passo 1.
                {!baseUrl && "Aguarde enquanto o exemplo de URL é carregado..."}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Consulte a documentação completa para ver todos os endpoints disponíveis e seus parâmetros.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center">
              <FileText className="mr-3 h-7 w-7 text-primary" /> Documentação Completa da API
            </CardTitle>
            <CardDescription>
              Explore todos os endpoints, schemas e detalhes técnicos na nossa documentação interativa.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/api-docs" legacyBehavior passHref>
              <Button size="lg" className="w-full max-w-xs">
                <TerminalSquare className="mr-2 h-5 w-5" />
                Acessar Documentação
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground text-sm">
          Precisa de ajuda ou quer saber mais?
        </p>
        <a
          href="https://conlinebr.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-accent transition-colors font-medium inline-flex items-center text-sm"
        >
          <Github className="mr-2 h-4 w-4" /> Visite o site da ConLine
        </a>
         <p className="text-xs text-muted-foreground mt-2">
            Versão 1.0.0
          </p>
      </div>
    </main>
  );
}
