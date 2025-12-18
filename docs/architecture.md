# Estrutura de Pastas do Design System

Este documento descreve a **organização de pastas** do Design System, explicando o propósito de cada diretório e como eles se relacionam.

A estrutura foi pensada para ser:

* **Escalável** (múltiplas aplicações)
* **Flexível** (tokens e temas customizáveis)
* **Compatível com Web e Mobile**
* **Independente de framework** (Next.js, Vite, React Native, etc.)

---

## Visão Geral

```txt
design-system/
├─ README.md
├─ package.json
├─ tsconfig.base.json
├─ .gitignore
├─ .editorconfig
├─ apps/
│  ├─ docs/
│  └─ playground/
├─ packages/
│  ├─ tokens/
│  ├─ theme/
│  ├─ ui/
│  ├─ ui-native/
│  ├─ icons/
│  └─ utils/
└─ configs/
   ├─ eslint/
   ├─ prettier/
   └─ tsconfig/
```

---

## Diretório Raiz

### `README.md`

Documento principal do Design System, descrevendo visão, objetivos, princípios e regras de evolução.

### `package.json`

Configuração base do monorepo (workspaces, scripts globais, versionamento).

### `tsconfig.base.json`

Configuração TypeScript compartilhada por todos os pacotes.

### `.editorconfig`, `.gitignore`

Padronização de editor e versionamento.

---

## `apps/`

Aplicações que **consomem** o Design System para documentação, testes e exemplos.

### `apps/docs/`

* Documentação viva do Design System
* Storybook ou site de documentação
* Exemplos de uso real dos componentes

### `apps/playground/`

* Aplicação simples para testes rápidos
* Validação visual e funcional de componentes

---

## `packages/`

Contém todos os **pacotes reutilizáveis** do Design System.

### `packages/tokens/`

Fonte única da verdade para todas as decisões visuais.

Responsável por:

* Cores
* Tipografia
* Espaçamentos
* Bordas
* Elevação

Estrutura típica:

```txt
tokens/
├─ src/
│  ├─ index.ts
│  ├─ contracts/
│  ├─ themes/
│  └─ build/
└─ package.json
```

---

### `packages/theme/`

Responsável por aplicar tokens nas aplicações.

Inclui:

* `ThemeProvider`
* Criação e troca de temas
* Integração com CSS Variables (web)

Estrutura típica:

```txt
theme/
├─ src/
│  ├─ ThemeProvider.tsx
│  ├─ createTheme.ts
│  ├─ setTheme.ts
│  └─ index.ts
└─ package.json
```

---

### `packages/ui/`

Componentes React para **Web**.

Organizados por nível de abstração:

```txt
ui/
├─ src/
│  ├─ foundations/
│  ├─ primitives/
│  ├─ components/
│  ├─ patterns/
│  └─ index.ts
└─ package.json
```

* **foundations**: reset, estilos globais
* **primitives**: Button, Text, Input
* **components**: Card, Modal, Dropdown
* **patterns**: combinações reutilizáveis

---

### `packages/ui-native/`

Componentes React Native para **Mobile**.

Compartilha conceitos e tokens com o `ui`, mas com implementação específica para mobile.

```txt
ui-native/
├─ src/
│  ├─ primitives/
│  ├─ components/
│  ├─ patterns/
│  └─ index.ts
└─ package.json
```

---

### `packages/icons/` (opcional)

Wrapper para ícones:

* SVGs
* Integrações com bibliotecas (Lucide, Phosphor, etc.)
* Padronização de tamanho e cor via tokens

---

### `packages/utils/` (opcional)

Utilitários compartilhados:

* Helpers de classe (`clsx`)
* Formatadores
* Funções puras reutilizáveis

---

## `configs/`

Configurações compartilhadas para manter consistência entre pacotes.

### `configs/eslint/`

Regras ESLint compartilhadas.

### `configs/prettier/`

Configuração de formatação de código.

### `configs/tsconfig/`

Configs TypeScript reutilizáveis por pacote.

---

## Princípios da Estrutura

* O Design System **não depende** das aplicações
* Tokens são a **base de tudo**
* Componentes nunca usam valores visuais diretos
* Cada pacote tem responsabilidade clara
* Evolução incremental e controlada