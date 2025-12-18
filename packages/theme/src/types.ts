import { Theme } from "@ds/tokens";

export type ThemeMode = "light" | "dark";
export type ModePreference = ThemeMode | "system";
export type ThemeName = string;

export type ThemeInput =
    | Theme
    | { light: Theme; dark?: Theme };

export type ThemeProviderProps = {
    children: React.ReactNode;

    /**
     * Theme configuration. Can be a single Theme object or an object with light/dark variants.
     */
    theme?: ThemeInput;

    /**
     * Name of the active theme to apply (e.g., "default", "brand-a").
     * Defaults to theme.meta.name of the provided theme.
     */
    activeThemeName?: ThemeName;

    /**
     * Mode preference: "light", "dark", or "system" (default).
     */
    mode?: ModePreference;

    /**
     * Whether to persist mode/theme preference in localStorage.
     * Default: true
     */
    persist?: boolean;

    /**
     * Key used for localStorage persistence.
     * Default: "ds.theme"
     */
    storageKey?: string;

    /**
     * Target element to apply data attributes to.
     * - "html" (default) or "body" are safe for SSR.
     * - HTMLElement is client-side only.
     */
    target?: "html" | "body" | HTMLElement;

    /**
     * Custom CSS selector override for globally scoping variables.
     */
    selectorOverride?: string;

    /**
     * Prefix for CSS variables. Default: "--ds-"
     */
    cssVarPrefix?: string;

    /**
     * Whether to include primitive tokens in CSS output. Default: true
     */
    includePrimitives?: boolean;

    /**
     * Whether to include semantic tokens in CSS output. Default: true
     */
    includeSemantic?: boolean;

    /**
     * Initial state to prevent FOUC during SSR.
     * If provided, these values take precedence during the initial render.
     */
    initialState?: {
        activeThemeName?: string;
        mode?: ModePreference;
    };
};

export type ThemeContextValue = {
    themeName: ThemeName;
    setThemeName: (name: ThemeName) => void;
    mode: ModePreference;
    setMode: (mode: ModePreference) => void;
    resolvedMode: ThemeMode; // The actual mode being applied (light/dark)
    themes: Theme[]; // List of available themes in the registry
};
