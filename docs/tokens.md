# Formato dos Tokens do Design System

Este documento define o **formato oficial dos tokens** do Design System, incluindo convenções, níveis de abstração e contratos. Ele deve servir como **referência única** para criação, uso e evolução dos tokens.

O objetivo principal é garantir que o Design System seja:

* Flexível entre aplicações
* Multi-tema (light / dark / brand)
* Compatível com Web e Mobile
* Independente de framework

---

## Princípios Fundamentais

1. **Token-First**

   * Nenhum componente utiliza valores visuais diretos.
   * Tudo deve passar por tokens.

2. **Separação entre valor e significado**

   * Tokens primitivos representam valores.
   * Tokens semânticos representam intenção.

3. **Componentes consomem apenas tokens semânticos**

   * Isso garante flexibilidade para troca de identidade visual.

---

## Níveis de Tokens

### 1️⃣ Tokens Primitivos

Representam valores visuais brutos e escalas base.

Exemplos:

* `palette.primary.500`
* `space.4`
* `radius.md`
* `font.size.sm`

Esses tokens **não devem ser usados diretamente em componentes**.

---

### 2️⃣ Tokens Semânticos

Representam o significado visual utilizado pelos componentes.

Exemplos:

* `color.bg.surface`
* `color.text.primary`
* `color.action.primary.hover`
* `typography.body.md`

Os tokens semânticos mapeiam os primitivos e são o **ponto de consumo dos componentes**.

---

## Convenção de Nomenclatura

### Categorias

* `color`
* `space`
* `radius`
* `font`
* `shadow`
* `zIndex`
* `motion`

### Padrão de nomes

* Utilizar **singular**
* Separar níveis por ponto (`.`)

Exemplos:

* `color.text.primary`
* `color.action.primary.disabled`
* `space.4`
* `radius.lg`

---

## Escalas Recomendadas

### 🎨 Cores

* Escala numérica: `50 → 900`

### 📐 Espaçamento

* Base 4: `4, 8, 12, 16, 24, 32, 48...`

### 🟦 Bordas

* `none`, `sm`, `md`, `lg`, `xl`, `full`

### 🔠 Tipografia

* Tamanhos: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
* Peso: `regular`, `medium`, `semibold`, `bold`

---

## Contrato do Theme

O `Theme` é a **unidade principal de configuração** e deve ser:

* Tipado
* Serializável
* Reutilizável entre plataformas

### Estrutura base

```ts
export type Theme = {
  meta: {
    name: string;
    mode: "light" | "dark";
  };

  primitives: {
    palette: {
      neutral: Record<number, string>;
      primary: Record<number, string>;
      success: Record<number, string>;
      warning: Record<number, string>;
      danger: Record<number, string>;
    };

    space: Record<number, string>;

    radius: Record<
      "none" | "sm" | "md" | "lg" | "xl" | "full",
      string
    >;

    shadow: Record<"sm" | "md" | "lg", string>;

    font: {
      family: {
        sans: string;
        mono: string;
      };
      size: Record<"xs" | "sm" | "md" | "lg" | "xl" | "2xl", string>;
      weight: Record<"regular" | "medium" | "semibold" | "bold", number>;
      lineHeight: Record<"tight" | "normal" | "relaxed", string>;
      letterSpacing: Record<"tight" | "normal" | "wide", string>;
    };
  };

  semantic: {
    color: {
      bg: {
        canvas: string;
        surface: string;
        elevated: string;
      };
      text: {
        primary: string;
        secondary: string;
        muted: string;
        inverse: string;
      };
      border: {
        default: string;
        muted: string;
        focus: string;
      };
      action: {
        primary: {
          default: string;
          hover: string;
          active: string;
          disabled: string;
          text: string;
        };
        danger: {
          default: string;
          hover: string;
          text: string;
        };
      };
      feedback: {
        success: string;
        warning: string;
        danger: string;
      };
    };

    typography: {
      body: {
        sm: { fontSize: string; lineHeight: string; fontWeight: number };
        md: { fontSize: string; lineHeight: string; fontWeight: number };
      };
      heading: {
        sm: { fontSize: string; lineHeight: string; fontWeight: number };
        md: { fontSize: string; lineHeight: string; fontWeight: number };
        lg: { fontSize: string; lineHeight: string; fontWeight: number };
      };
    };

    motion: {
      duration: {
        fast: string;
        normal: string;
        slow: string;
      };
      easing: {
        standard: string;
        emphasized: string;
      };
    };
  };
};
```

---

## Tokens como CSS Variables (Web)

Os tokens devem ser exportados automaticamente como **CSS Variables**, seguindo o padrão:

* Prefixo fixo: `--ds-`
* Nomes derivados dos tokens semânticos

Exemplos:

* `--ds-color-bg-surface`
* `--ds-color-text-primary`
* `--ds-space-4`
* `--ds-radius-md`

Aplicação por tema:

```css
[data-theme="default"][data-mode="light"] {
  --ds-color-bg-surface: #ffffff;
  --ds-color-text-primary: #0f172a;
  --ds-font-family-sans: Inter, system-ui, sans-serif;
}
```

---

## Uso em Mobile (React Native)

No mobile, os tokens podem ser consumidos via:

* Objeto `Theme` em TypeScript
* JSON gerado a partir do mesmo contrato

A chave semântica deve ser a mesma:

```ts
semantic.color.text.primary
```

A implementação muda, mas o **significado permanece**.

---

## Organização no `packages/tokens`

```txt
packages/tokens/
├─ src/
│  ├─ contracts/
│  ├─ primitives/
│  ├─ semantic/
│  ├─ themes/
│  ├─ exporters/
│  └─ index.ts
└─ package.json
```

---

## Customização por Aplicação

Cada aplicação pode sobrescrever tokens sem alterar componentes:

```ts
import { defaultLight } from "@ds/tokens";

export const appTheme = {
  ...defaultLight,
  primitives: {
    ...defaultLight.primitives,
    font: {
      ...defaultLight.primitives.font,
      family: {
        ...defaultLight.primitives.font.family,
        sans: "Poppins, sans-serif",
      },
    },
    palette: {
      ...defaultLight.primitives.palette,
      primary: {
        ...defaultLight.primitives.palette.primary,
        500: "#16a34a",
      },
    },
  },
};
```

---

## Observações Finais

* Tokens são a base de todo o Design System
* Componentes dependem apenas de tokens semânticos
* O formato foi pensado para escalar sem refatorações grandes
* A geração automática de CSS Variables é recomendada
