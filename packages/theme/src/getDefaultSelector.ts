import { Theme } from "@ds/tokens";

/**
 * Generates the default CSS selector for a theme.
 * Format: [data-theme="NAME"][data-mode="MODE"]
 */
export function getDefaultSelector(theme: Theme): string {
    const { name, mode } = theme.meta;
    return `[data-theme="${name}"][data-mode="${mode}"]`;
}
