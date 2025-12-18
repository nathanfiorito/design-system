# Pacote @ds/tokens

Este documento detalha a implementação técnica e o uso do pacote `@ds/tokens`, responsável por distribuir os tokens de design para todas as aplicações, seja via variáveis CSS (Web) ou objetos JSON (Mobile/JS).

## Visão Geral

O pacote `@ds/tokens` é a fonte única da verdade para estilos no Design System. Ele implementa a arquitetura de **dois níveis**:

1.  **Primitives**: Valores brutos (hex, pixels) que formam as escalas básicas.
2.  **Semantic**: Alias que dão significado e contexto aos valores (ex: cores de fundo, texto, ação).


## Estrutura do Objeto Theme

O contrato `Theme` foi desenhado para ser serializável e carregar metadados essenciais para automação.

### `meta` (Novidade)

Todo tema possui uma propriedade `meta` que define seu nome e modo. Isso é utilizado pelos exporters para gerar seletores CSS automaticamente.

```typescript
export type Theme = {
  meta: {
    name: string;          // Ex: "default"
    mode: "light" | "dark"; // Ex: "light"
  };
  primitives: { ... };
  semantic: { ... };
}
```

Isso garante que:
1. `defaultLight` gera `[data-theme="default"][data-mode="light"]`
2. `defaultDark` gera `[data-theme="default"][data-mode="dark"]`

## Instalação

```bash
npm install @ds/tokens
# ou
yarn add @ds/tokens
```

## Como Usar

### 1. Web (Variáveis CSS)

Para aplicações web, a forma preferida de consumo é via **CSS Variables**. Isso permite theming nativo e alta performance.

Importe o tema e o utilitário `toCssVars` para gerar os estilos globais (geralmente no arquivo de entrada da app ou em um componente de ThemeProvider).

```typescript
import { defaultLight, defaultDark, toCssVars } from "@ds/tokens";

// Gera string CSS:
// [data-theme="default"][data-mode="light"] { --ds-color-... }
const lightVars = toCssVars(defaultLight);

// [data-theme="default"][data-mode="dark"] { --ds-color-... }
const darkVars = toCssVars(defaultDark);

// Injete no <style> global ou Styled Components GlobalStyle
// Veja documentação detalhada em: docs/tokens-exporter.md
```

Para detalhes completa da API `toCssVars`, consulte [Tokens Exporter](./tokens-exporter.md).

No seu CSS:

```css
.my-card {
  background-color: var(--ds-color-bg-surface);
  color: var(--ds-color-text-primary);
  padding: var(--ds-space-16);
  border-radius: var(--ds-radius-md);
}
```

### 2. JavaScript / Mobile (React Native)

Para ambientes que não suportam CSS Variables (como React Native), você deve consumir os tokens como objetos JavaScript.

```typescript
import { defaultLight } from "@ds/tokens";

const styles = {
  container: {
    backgroundColor: defaultLight.semantic.color.bg.surface,
    padding: defaultLight.primitives.space[16],
  },
  text: {
    color: defaultLight.semantic.color.text.primary,
    fontSize: defaultLight.semantic.typography.body.md.fontSize,
  }
};
```

> **Dica:** Para React Native, recomenda-se criar um wrapper context (ThemeProvider) que forneça o tema ativo.

## Arquitetura do Pacote

### Estrutura de Pastas

*   `src/contracts`: Define as interfaces TypeScript (`Theme`, `ColorScale`, etc.) que garantem consistência.
*   `src/primitives`: Contém as escalas de valores (Palette, Space, Radius, Shadow, Typography).
*   `src/semantic`: Lógica de mapeamento. Aqui definimos como `bg.surface` vira `#ffffff` no Light Mode.
*   `src/themes`: Arquivos de exportação dos temas prontos (`defaultLight`, `defaultDark`).
*   `src/exporters`: Funções para converter o tema em outros formatos (`toCssVars`).

### Tipagem (TypeScript)

O pacote exporta tipos fortes para ajudar no desenvolvimento:

```typescript
import type { Theme } from "@ds/tokens";

const myCustomTheme: Theme = {
  // ... o TypeScript vai garantir que você siga o contrato
};
```

## Próximos Passos

*   Criar pacote `@ds/theme` para React (Provider e Hooks).
*   Implementar componentes visuais no `@ds/ui` consumindo essas variáveis.
