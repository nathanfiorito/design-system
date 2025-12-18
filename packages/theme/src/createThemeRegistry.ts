import { Theme } from "@ds/tokens";
import { ThemeInput } from "./types";

/**
 * Normalizes the ThemeInput prop into a flat array of Theme objects.
 * Ensure that if a simplified input is passed, we have correct meta.
 */
export function createThemeRegistry(input: ThemeInput): Theme[] {
    // If it has 'meta', it's a single Theme object
    if ("meta" in input) {
        return [input];
    }

    // Otherwise it's { light: Theme, dark?: Theme }
    const themes: Theme[] = [input.light];

    if (input.dark) {
        themes.push(input.dark);
    }

    return themes;
}
