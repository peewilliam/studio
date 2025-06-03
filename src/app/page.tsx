import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Github, Zap, UserCheck } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-background to-secondary">
      <div className="text-center mb-12">
        <Zap className="mx-auto h-24 w-24 text-primary mb-4" />
        <h1 className="text-5xl font-bold font-headline text-primary mb-3">
          Bem-vindo à TrackMaster APIs
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Uma API RESTful moderna, segura e bem estruturada para rastreamento de processos.
          Construída com Next.js e SQL Server.
        </p>
      </div>

      <Card className="w-full max-w-lg shadow-2xl mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">Comece a Usar</CardTitle>
          <CardDescription className="text-center">
            Explore a documentação da API para entender como integrar e usar nossos serviços.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Link href="/api-docs" legacyBehavior passHref>
            <Button size="lg" className="w-full">
              <FileText className="mr-2 h-5 w-5" />
              Ver Documentação da API
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            (Desenvolvido com Swagger/OpenAPI)
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
           <p className="text-xs text-muted-foreground">
            Versão 1.0.0
          </p>
        </CardFooter>
      </Card>

      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center flex items-center justify-center">
            <UserCheck className="mr-2 h-6 w-6 text-primary" />
            Acesso à API (Demonstração)
          </CardTitle>
          <CardDescription className="text-center">
            Para fins de demonstração, utilize as seguintes credenciais para login:
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-2">
          <p className="text-md">
            <span className="font-semibold">Usuário:</span> PowerTrade
          </p>
          <p className="text-md">
            <span className="font-semibold">Senha:</span> minhasenha
          </p>
           <p className="text-sm text-muted-foreground mt-2">
            Estas são credenciais fixas para teste. Um sistema completo de gerenciamento de usuários (como criação de novas contas) não está implementado nesta versão de demonstração.
          </p>
        </CardContent>
      </Card>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground">
          Precisa de ajuda ou quer contribuir?
        </p>
        <a
          href="https://github.com" // Substitua pelo link real do GitHub, se disponível
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-accent transition-colors font-medium inline-flex items-center"
        >
          <Github className="mr-2 h-4 w-4" /> Visite nosso GitHub (Exemplo)
        </a>
      </div>
    </main>
  );
}
