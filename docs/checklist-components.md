# ✅ CHECKLIST DE COMPONENTES — DESIGN SYSTEM

## 🧱 NÍVEL 1 — Primitivos Essenciais (comece aqui)

Esses são **obrigatórios**. Sem eles, tudo vira gambiarra.

### 1️⃣ `Text`

Base de toda tipografia.

**Checklist**

* [ ] Variantes: `body`, `heading`, `caption`, `label`
* [ ] Tamanhos: `sm | md | lg` (mapeados em tokens)
* [ ] Peso via tokens
* [ ] Cor via tokens (`text.primary`, `text.secondary`, `text.muted`)
* [ ] Render prop `as` (`p`, `span`, `h1`…)
* [ ] Sem margens por padrão

📌 **Bloqueador se faltar**: sim

---

### 2️⃣ `Button`

Componente mais crítico do sistema.

**Checklist**

* [ ] Variantes: `primary | secondary | danger | ghost`
* [ ] Estados: `default | hover | active | disabled | loading`
* [ ] Tamanhos: `sm | md | lg`
* [ ] Focus visible acessível
* [ ] `disabled` real (HTML)
* [ ] Suporte a ícone (`startIcon`, `endIcon`)
* [ ] Não usar `div`, usar `<button>`

📌 **Bloqueador se faltar**: sim

---

### 3️⃣ `Input`

Base de formulários.

**Checklist**

* [ ] Estados: `default | hover | focus | disabled | error`
* [ ] Placeholder
* [ ] Label externa (não placeholder-only)
* [ ] `aria-invalid` quando erro
* [ ] Suporte a `type`
* [ ] Focus via tokens
* [ ] Mensagem de erro (slot)

📌 **Bloqueador se faltar**: sim

---

## 🧱 NÍVEL 2 — Primitivos de Layout

Esses evitam CSS espalhado pelo app.

### 4️⃣ `Box`

Wrapper neutro.

**Checklist**

* [ ] Render prop `as`
* [ ] Suporte a padding/margin via tokens
* [ ] Background via tokens
* [ ] Zero estilos opinados

---

### 5️⃣ `Stack`

Layout vertical/horizontal.

**Checklist**

* [ ] `direction`: vertical | horizontal
* [ ] `gap` via tokens
* [ ] `align` e `justify`
* [ ] Implementado com flexbox

---

### 6️⃣ `Divider`

Separador visual.

**Checklist**

* [ ] Horizontal e vertical
* [ ] Espessura via token
* [ ] Cor via `border.muted`
* [ ] Margens configuráveis

---

## 🧩 NÍVEL 3 — Primitivos Visuais

### 7️⃣ `Icon`

Wrapper de ícones (SVG).

**Checklist**

* [ ] Tamanhos via tokens
* [ ] Cor herdada (`currentColor`)
* [ ] Acessível (`aria-hidden` quando decorativo)
* [ ] Compatível com biblioteca externa

---

### 8️⃣ `Card`

Container visual.

**Checklist**

* [ ] Background via `bg.surface`
* [ ] Border ou shadow via tokens
* [ ] Padding via tokens
* [ ] Sem comportamento (apenas visual)

---

## 🧩 NÍVEL 4 — Componentes de Formulário (base)

### 9️⃣ `Checkbox`

* [ ] Label clicável
* [ ] Estado indeterminate
* [ ] Focus visível
* [ ] Tokens para checked/unchecked

---

### 🔟 `Select`

* [ ] Label externa
* [ ] Disabled
* [ ] Keyboard navigation
* [ ] Placeholder real
* [ ] Focus + error state

---

## 🧩 NÍVEL 5 — Feedback e Overlay (quando precisar)

### 1️⃣1️⃣ `Alert`

* [ ] Variantes: success | warning | error | info
* [ ] Ícone opcional
* [ ] Texto acessível

---

### 1️⃣2️⃣ `Modal`

* [ ] Trap de foco
* [ ] ESC fecha
* [ ] Backdrop
* [ ] Scroll lock
* [ ] `aria-modal`

📌 **Só faça quando realmente precisar**

---

## 🧠 CHECKLIST GLOBAL (para TODO componente)

Antes de considerar “pronto”:

* [ ] Usa **tokens semânticos**
* [ ] Tem foco visível
* [ ] Funciona sem JS avançado
* [ ] Props bem tipadas
* [ ] Sem estilos mágicos
* [ ] API pequena
* [ ] Dá pra documentar em Storybook

---

## 🟢 Ordem recomendada (não pule)

1. `Text`
2. `Button`
3. `Input`
4. `Box`
5. `Stack`
6. `Icon`
7. `Card`
8. `Divider`
9. `Checkbox`
10. `Select`
11. `Alert`
12. `Modal`
