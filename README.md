# Firebase Studio - ConLine - Sirius API (PT-BR)

Esta é uma aplicação de API construída com NextJS no Firebase Studio, configurada para o idioma Português do Brasil (pt-BR).

## Visão Geral

A ConLine - Sirius API fornece uma interface de integração para o acompanhamento online dos seus processos, conectando-se diretamente ao sistema Sirius da ConLine, focada em agilidade e segurança.

## Como Utilizar

### 1. Executar a Aplicação

Para iniciar a aplicação em ambiente de desenvolvimento, utilize o comando:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000` (ou a porta especificada pela variável de ambiente `PORT`). A página inicial (`/`) e a documentação da API (`/api-docs`) fornecerão mais informações.

### 2. Documentação da API

A documentação completa da API está disponível e pode ser acessada através da interface Swagger UI. Após iniciar a aplicação, navegue para:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs) (ou o endereço correspondente se estiver usando uma porta diferente)

Lá você encontrará todos os endpoints disponíveis, seus parâmetros, corpos de requisição, exemplos de resposta e os schemas dos dados.

### 3. Autenticação (Login)

**Login:**

Para interagir com os endpoints protegidos da API (como `/api/tracking`), você precisará de um token JWT. Faça uma requisição `POST` para o endpoint `/api/auth/login` com as seguintes credenciais de demonstração:

-   **username**: `sirius`
-   **password**: `proximos`

Exemplo de corpo da requisição:
```json
{
  "username": "sirius",
  "password": "proximos"
}
```
A API retornará um token JWT. Este token deverá ser incluído no cabeçalho `Authorization` de requisições subsequentes aos endpoints protegidos, no formato `Bearer {seu_token}`. O sistema agora suporta múltiplos usuários de demonstração; consulte seu contato na ConLine para credenciais adicionais, se necessário.

**Criação de Usuário:**

**Importante**: Atualmente, **não há um endpoint ou funcionalidade para criação de novos usuários**. O sistema de autenticação utiliza um conjunto de credenciais de demonstração (como `sirius`/`proximos`) exclusivamente para fins de teste da API. Em uma aplicação de produção, um sistema completo de gerenciamento de usuários (com registro, perfis, etc.) seria necessário, integrado ao sistema de autenticação da ConLine.

### 4. Rastreamento de Processos

O principal endpoint para consulta é `/api/tracking`. Ele requer autenticação (veja a seção "Autenticação").

-   `GET /api/tracking`: Retorna todos os processos associados ao `clientId` do usuário autenticado.
-   `GET /api/tracking?referencia={sua_referencia}`: Retorna processos filtrados pelo `Numero_Processo` ou `Referencia_Cliente` correspondente.

Consulte a [documentação da API](/api-docs) para mais detalhes sobre os parâmetros e o formato das respostas.

## Tecnologias Utilizadas (Estrutura Base)

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- ShadCN UI
- SQL Server (via pacote `mssql`)
- Swagger/OpenAPI para documentação da API

## Estrutura do Projeto

-   `src/app/api/`: Contém os route handlers da API Next.js.
    -   `src/app/api/auth/login/route.ts`: Endpoint de autenticação.
    -   `src/app/api/tracking/route.ts`: Endpoint de rastreamento.
    -   `src/app/api/openapi.json/route.ts`: Gera a especificação OpenAPI.
-   `src/app/api-docs/`: Página da documentação Swagger UI.
-   `src/app/page.tsx`: Página inicial da aplicação.
-   `src/components/`: Componentes React reutilizáveis (principalmente UI da ShadCN).
-   `src/lib/`: Utilitários, configuração de banco de dados, serviços, middlewares.
    -   `src/lib/config/db.ts`: Configuração da conexão com o SQL Server.
    -   `src/lib/services/trackingService.ts`: Lógica de negócios para buscar dados de rastreamento.
    -   `src/lib/middlewares/auth.ts`: Middleware de autenticação JWT.
    -   `src/lib/dto/tracking.ts`: Definições de schemas para Swagger.

## Suporte

Para questões relacionadas à API, entre em contato:
- Email: ti@conlinebr.com.br
- Website: [https://conlinebr.com.br](https://conlinebr.com.br)

## Próximos Passos (Sugestões para Desenvolvimento Futuro)

- Implementar um sistema completo de gerenciamento de usuários integrado ao sistema ConLine (registro, recuperação de senha, diferentes perfis de acesso).
- Expandir as funcionalidades de rastreamento com mais filtros ou detalhes, conforme necessidades da ConLine.
- Adicionar testes unitários e de integração.
- Configurar variáveis de ambiente de forma mais robusta para ambientes de produção (ex: utilizando `.env.production`).
- Melhorar o tratamento de erros e logging.
