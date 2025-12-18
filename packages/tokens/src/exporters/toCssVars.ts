import type { Theme } from "../contracts/theme";
import { flattenToVars, mergeVars } from "./utils";

type ToCssVarsOptions = {
    selector?: string;
    includePrimitives?: boolean; // default true
    includeSemantic?: boolean;   // default true
    prefix?: string;             // default "--ds-"
};

/**
 * Converts a Theme object into a CSS string with variables.
 * 
 * @param theme The theme object to convert
 * @param opts Options for generation
 * @returns A full CSS string block
 */
export function toCssVars(
    theme: Theme,
    opts: ToCssVarsOptions = {}
): string {
    const {
        selector,
        includePrimitives = true,
        includeSemantic = true,
        prefix = "--ds-"
    } = opts;

    // 1. Selector logic
    const cssSelector = selector ?? `[data-theme="${theme.meta.name}"][data-mode="${theme.meta.mode}"]`;

    // 2. Generate variables
    let finalVars: Array<[string, string]> = [];

    const primitivesVars = includePrimitives
        ? flattenToVars(theme.primitives, {
            prefix,
            dropRoots: ["primitives"]
            // Note: The memory says "dropRoots contains the first key of the path".
            // If we pass theme.primitives, the keys will start from inside primitives (e.g. "palette").
            // But the requirements say: "primitives.space.16 -> --ds-space-16".
            // If we start flattening from theme.primitives, the path starts at "space".
            // So we don't need to drop "primitives" if we pass theme.primitives directly?
            // Wait, the requirement says: "semantic.color.bg.surface -> --ds-color-bg-surface".
            // If we flatten `theme`, the path is `theme.semantic.color...`? No, theme is the root object.
            // `theme.semantic` is a key "semantic".

            // Let's look at `flattenToVars` implementation:
            // flattenToVars(theme.primitives, ...) -> recursion starts with keys of primitives.
            // if theme.primitives = { space: { ... } }, first key is "space".
            // Path becomes ["space", "16"]. Result: --ds-space-16. 
            // This matches the requirement `primitives.space.16 -> --ds-space-16`.
            // The requirement "Remove the root primitives/semantic" implies that if we started from `theme`, 
            // we would see `primitives` as the first key.
            // But here we can just pass `theme.primitives` directly, so "primitives" isn't in the path at all.
            // HOWEVER, `flattenToVars` generally takes an object. 
            // If I pass `theme.semantic`, the path starts with `color`, etc.
            // This naturally achieves "semantic.color.bg..." -> "color-bg...".
            // BUT wait, "semantic.color.bg.surface" -> "--ds-color-bg-surface".
            // The prompt says "Remova a raiz semantic. e primitives. do nome final Mantenha o resto do caminho".
            // Example: `primitives.space.16 -> --ds-space-16`.
            // This means `space` IS preserved.

            // If I call flattenToVars(theme.primitives), paths are ["space", "16"]. Result: space-16. Correct.
            // If I call flattenToVars(theme.semantic), paths are ["color", "bg", "surface"]. Result: color-bg-surface. Correct.

            // So actually I don't need to specify `dropRoots` if I pass the sub-objects directly!
            // `dropRoots` would only be needed if I passed `theme` and wanted to drop "primitives" from `["primitives", "space", "16"]`.

            // Let's stick to passing the sub-objects directly as it's cleaner.
        })
        : [];

    const semanticVars = includeSemantic
        ? flattenToVars(theme.semantic, { prefix })
        : [];

    // 3. Merge (Semantic wins over Primitives if conflicts exist, though usually namespaces differ)
    // Primitives usually start with palette, space, radius...
    // Semantic usually start with color, typography...
    // Warning: `typography` exists in both? 
    // theme.primitives.font... 
    // theme.semantic.typography...
    // So likely no collision. But strict merging is safe.
    finalVars = mergeVars(primitivesVars, semanticVars, { prefer: "B" });

    // 4. Build CSS
    // Indentation: 2 spaces
    const rules = finalVars
        .map(([prop, value]) => `  ${prop}: ${value};`)
        .join("\n");

    return `${cssSelector} {\n${rules}\n}\n`;
}
