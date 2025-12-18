import { Theme, toCssVars } from "@ds/tokens";
import { getDefaultSelector } from "./getDefaultSelector";

type InjectCssVarsOptions = {
    selectorOverride?: string;
    cssVarPrefix?: string;
    includePrimitives?: boolean;
    includeSemantic?: boolean;
};

/**
 * Generates the CSS string for a list of themes.
 */
export function injectCssVars(
    themes: Theme[],
    options: InjectCssVarsOptions = {}
): string {
    if (!themes || themes.length === 0) return "";

    return themes
        .map((theme) => {
            const selector = options.selectorOverride || getDefaultSelector(theme);

            return toCssVars(theme, {
                selector,
                prefix: options.cssVarPrefix,
                includePrimitives: options.includePrimitives,
                includeSemantic: options.includeSemantic,
            });
        })
        .join("\n");
}
