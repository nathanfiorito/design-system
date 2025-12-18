# Design System

Bem-vindo ao repositório do Design System. Este projeto é um **Monorepo** organizado com **NPM Workspaces**, contendo todos os pacotes de tokens, temas, componentes UI e configurações compartilhadas.

## Estrutura do Monorepo

```txt
design-system/
├── packages/
│   ├── tokens/      # (@ds/tokens) Tokens de design primitivos e semânticos
│   ├── theme/       # (@ds/theme) ThemeProvider e lógica de temas
│   └── ui/          # (@ds/ui) Componentes React e fundações CSS (Reset/Global)
├── docs/            # Documentação detalhada
├── package.json     # Configuração raiz (Workspaces)
└── tsconfig.base.json # Configuração TypeScript base
```

## Pré-requisitos

* **Node.js**: 18+
* **NPM**: 9+ (suporte a workspaces)

## Começando

1.  **Instale as dependências**:
    Execute na raiz do projeto:
    ```bash
    npm install
    ```

2.  **Compile todos os pacotes**:
    ```bash
    npm run build
    ```

## Comandos Úteis

*   **Instalar dependência em um pacote específico**:
    ```bash
    npm install [nome-do-ote] -w [nome-do-workspace]
    # Exemplo:
    npm install clsx -w @ds/ui
    ```

*   **Rodar script em todos os workspaces**:
    ```bash
    npm run [script] --workspaces
    ```

## Documentação Detalhada

*   [Visão Geral e Introdução](./docs/introduction.md)
*   [Arquitetura](./docs/architecture.md)
*   [Pacote: Tokens](./docs/package-tokens.md)
*   [Pacote: Theme](./docs/package-theme.md)
*   [Pacote: UI](./docs/package-ui.md)
