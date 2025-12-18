# Pacote: Theme (`@ds/theme`)

O pacote `@ds/theme` é responsável por gerenciar a aplicação de temas, controle de modo (light/dark) e injeção de variáveis CSS na aplicação. Ele foi desenhado para ser **SSR-safe** (Next.js App Router compatible) e suportar **múltiplos temas** simultâneos.

## Instalação

```bash
pnpm add @ds/theme @ds/tokens
```

> **Nota Técnica:** O pacote expõe seus artefatos via `exports` no `package.json`. Certifique-se de que seu bundler suporta resolução moderna (Node 16+ resolution).


## Setup Básico

Envolva sua aplicação com o `ThemeProvider`. Em Next.js (App Router), isso geralmente é feito no `layout.tsx` raiz.

```tsx
// app/layout.tsx
import { ThemeProvider } from "@ds/theme";
import { defaultLight, defaultDark } from "@ds/tokens";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider
          theme={{ light: defaultLight, dark: defaultDark }}
          activeThemeName="default"
          mode="system"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

> **Nota:** Adicione `suppressHydrationWarning` na tag `html` pois o `ThemeProvider` manipula atributos `data-theme` e `data-mode` que podem causar warning de hidratação (embora o pacote trate isso para evitar FOUC).

## Features

### Auto Dark Mode (System Preference)

O provider suporta a detecção automática da preferência do sistema operacional.

* `mode="system"` (default): Segue `prefers-color-scheme`.
* `mode="light"`: Força modo claro.
* `mode="dark"`: Força modo escuro.

No SSR, se o modo for `"system"`, o fallback é `"light"` para garantir que o HTML inicial seja renderizável sem acesso a `window`. Assim que o JavaScript carrega (hydration), ele detecta a preferência real e atualiza se necessário.

### Persistência (localStorage)

Por padrão, a preferência de tema e modo é salva no `localStorage` do navegador.

* Se o usuário trocar para "dark manually", isso será lembrado.
* Se a persistência estiver ativa (`persist={true}`), o provider tentará restaurar o estado salvo no client-side.

### Múltiplos Temas

Você pode passar diferentes temas para a propriedade `theme`.

```tsx
import { brandTheme, salesTheme } from "./my-tokens";

<ThemeProvider theme={brandTheme} activeThemeName="brand" ... />
```

Para trocar de tema dinamicamente, use o hook `useTheme()`.

## API Reference

### `ThemeProvider` Props

| Prop | Tipo | Default | Descrição |
| :--- | :--- | :--- | :--- |
| `theme` | `ThemeInput` | **Obrigatório** | Objeto contendo o(s) tema(s). Pode ser um único `Theme` ou `{ light, dark }`. |
| `activeThemeName` | `string` | `theme.meta.name` | O nome do tema ativo inicial. |
| `mode` | `"light" \| "dark" \| "system"` | `"system"` | O modo inicial ou preferência. |
| `persist` | `boolean` | `true` | Se deve salvar as escolhas no localStorage. |
| `storageKey` | `string` | `"ds.theme"` | A chave usada no localStorage. |
| `target` | `"html" \| "body" \| HTMLElement` | `"html"` | Onde os atributos `data-theme` e `data-mode` serão aplicados. |

### `useTheme` Hook

Hook para acessar e controlar o tema em qualquer componente filho.

```tsx
"use client";

import { useTheme } from "@ds/theme";

export function ThemeToggle() {
  const { mode, setMode, resolvedMode } = useTheme();

  return (
    <button onClick={() => setMode(resolvedMode === "dark" ? "light" : "dark")}>
      Atual: {mode} (Resolvido: {resolvedMode})
    </button>
  );
}
```

#### Retorno de `useTheme`

* `themeName`: Nome do tema ativo.
* `setThemeName(name)`: Troca o tema ativo.
* `mode`: A preferência atual (`light`, `dark` ou `system`).
* `setMode(mode)`: Define a preferência (ex: usuário escolheu "system").
* `resolvedMode`: O modo efetivo aplicado na tela (`light` ou `dark`). Útil quando `mode` é `system`.
* `themes`: Lista de temas disponíveis registrados.

## Como funciona (Under the Hood)

1. **CSS Variables**: O provider gera uma tag `<style>` com todas as variáveis CSS dos tokens fornecidos.
2. **Seletores**: O CSS é escopado por atributos de dados:
   ```css
   [data-theme="default"][data-mode="dark"] {
     --ds-color-bg-surface: #000000;
   }
   ```
3. **SSR Safety**:
   * Não acessa `window` no render principal.
   * Prioriza props iniciais no servidor.
   * Resolve `system` e `localStorage` apenas no cliente (useEffect), evitando FOUC (Flash of Unstyled Content) através de valores padrão sensatos.
129:
130: ## Guia de Uso Rápido
131: 
132: ### Exemplo 1: Automático (System Default)
133: 
134: Configuração ideal para a maioria das apps. Respeita a preferência do sistema operacional e salva alterações manuais.
135: 
136: ```tsx
137: <ThemeProvider mode="system" persist />
138: ```
139: 
140: ### Exemplo 2: Forçado (Dark Mode)
141: 
142: Útil para apps que são "dark only" ou para forçar um tema específico independentemente do usuário.
143: 
144: ```tsx
145: <ThemeProvider mode="dark" persist />
146: ```
147: 
148: ### Exemplo 3: Tema por App + Persistência Customizada
149: 
150: Para quando você tem múltiplos temas (ex: one-label apps) e quer isolar a persistência.
151: 
152: ```tsx
153: <ThemeProvider
154:   theme={{ light: appLight, dark: appDark }}
155:   activeThemeName="app-delivery"
156:   mode="system"
157:   persist
158:   storageKey="myapp.theme"
159: />
160: ```
