# Tokens Exporter: `toCssVars`

O módulo exporter (`@ds/tokens/exporters`) fornece utilitários para converter o objeto de tema TypeScript em variáveis CSS nativas, permitindo integração perfeita com aplicações Web.

## `toCssVars`

A função principal que transforma um objeto `Theme` em um bloco CSS de variáveis globais (`:root` ou escopo por seletor).

### Assinatura

```typescript
function toCssVars(
  theme: Theme,
  opts?: {
    selector?: string;         // Seletor CSS (ex: ':root', '[data-theme="dark"]')
    includePrimitives?: boolean; // Padrão: true
    includeSemantic?: boolean;   // Padrão: true
    prefix?: string;             // Padrão: "--ds-"
  }
): string;
```

### Comportamento

A função realiza as seguintes etapas:

1.  **Flattening**: Percorre o objeto de tema recursivamente.
2.  **Naming**: Converte o caminho das propriedades em kebab-case.
    *   Ex: `semantic.color.bg.surface` -> `--ds-color-bg-surface`
    *   Ex: `primitives.space.16` -> `--ds-space-16` (se primitives incluídos)
3.  **Merging**: Se houver colisão de nomes, tokens da camada `semantic` sobrescrevem `primitives` (embora namespaces geralmente evitem isso).
4.  **Sorting**: As variáveis são ordenadas alfabeticamente para garantir determinismo (e diffs limpos).

### Opções

| Opção | Tipo | Default | Descrição |
| :--- | :--- | :--- | :--- |
| `selector` | `string` | `[data-theme="..."][data-mode="..."]` | Define o seletor CSS que envolverá as variáveis. |
| `prefix` | `string` | `"--ds-"` | Prefixo das variáveis CSS. |
| `includePrimitives`| `boolean`| `true` | Se deve exportar também os tokens primitivos (ex: `--ds-space-4`). |
| `includeSemantic` | `boolean`| `true` | Se deve exportar tokens semânticos (ex: `--ds-color-text-primary`). |

## Exemplos de Uso

### Uso Básico

```typescript
import { defaultLight, toCssVars } from "@ds/tokens";

const css = toCssVars(defaultLight);

// Saída:
// [data-theme="default"][data-mode="light"] {
//   --ds-color-bg-surface: #ffffff;
//   --ds-space-4: 1rem;
//   ...
// }
```

### Customizando Seletor (ex: Global Root)

Se você tem apenas um tema e quer aplicá-lo globalmente:

```typescript
const css = toCssVars(defaultLight, {
  selector: ":root"
});
```

### Excluindo Primitivos

Para reduzir o tamanho do CSS final, você pode exportar apenas os tokens semânticos (que são os que os componentes consomem):

```typescript
const css = toCssVars(defaultLight, {
  includePrimitives: false
});
```
