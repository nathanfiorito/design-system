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
    // Default: [data-theme="themeName"][data-mode="themeMode"]
    const cssSelector = selector ?? `[data-theme="${theme.meta.name}"][data-mode="${theme.meta.mode}"]`;

    // 2. Generate variables
    let finalVars: Array<[string, string]> = [];

    const primitivesVars = includePrimitives
        ? flattenToVars(theme.primitives, { prefix })
        : [];

    const semanticVars = includeSemantic
        ? flattenToVars(theme.semantic, { prefix })
        : [];

    // 3. Merge (Semantic wins over Primitives)
    finalVars = mergeVars(primitivesVars, semanticVars, { prefer: "B" });

    // 4. Build CSS
    if (finalVars.length === 0) {
        return "";
    }

    const rules = finalVars
        .map(([prop, value]) => `  ${prop}: ${value};`)
        .join("\n");

    return `${cssSelector} {\n${rules}\n}\n`;
}
