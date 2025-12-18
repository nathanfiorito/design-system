# Pacote UI: `@ds/ui`

O pacote `@ds/ui` é responsável pelos **componentes visuais** e **fundações globais** do Design System.

Atualmente, ele exporta principalmente as **Foundations** (Reset + Globals), garantindo uma base consistente para aplicações Web.

---

## Foundations (Reset + Globals)

O módulo de foundations visa normalizar o comportamento dos navegadores e aplicar os tokens de design globais (`--ds-*`) na raiz da aplicação.

### O que está incluído?

1.  **CSS Reset Robusto**:
    *   `box-sizing: border-box` universal.
    *   Normalização de `margins` e `headings`.
    *   `img`, `video` como `block` e responsivos.
    *   Form controls herdam fontes.

2.  **Integração com Tokens**:
    *   Conecta a raiz (`:root` e `body`) aos tokens de cor e tipografia.
    *   Garante suporte a **Dark Mode** via `color-scheme`.
    *   Fallbacks visuais para evitar FOUC (Flash of Unstyled Content).

3.  **Acessibilidade (A11y)**:
    *   **Focus Ring Padronizado**: Foco visível (`outline`) apenas via `:focus-visible` (clique do mouse não ativa, teclado ativa).
    *   **Prevenção de Erros**: Inputs desabilitados com `cursor: not-allowed` e opacidade reduzida.
    *   **Reduced Motion**: Respeita preferência do usuário, removendo transições suaves se solicitado.

---

## Como usar

### Instalação

```bash
npm install @ds/ui
# ou
npm install @ds/ui
```

### Importando as Foundations

Para aplicar o reset e os estilos globais, importe o CSS entrypoint **uma única vez** na raiz da aplicação.

#### Next.js (App Router)

Em `app/layout.tsx`:

```tsx
import "@ds/ui/foundations"; // <-- Importe aqui
import { ThemeProvider } from "@ds/theme";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

#### Next.js (Pages Router)

Em `pages/_app.tsx`:

```tsx
import "@ds/ui/foundations"; // <-- Importe aqui

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

---

## Estrutura Interna

```txt
packages/ui/
├─ src/
│  ├─ foundations/
│  │  ├─ globals.css  <-- CSS Real
│  │  └─ index.ts     <-- Entrypoint JS
│  └─ index.ts
└─ package.json
```

> **Nota**: Este pacote declara `"sideEffects": ["**/*.css"]` para impedir que bundlers (Webpack, Turbopack) removam o CSS durante o build de produção.
