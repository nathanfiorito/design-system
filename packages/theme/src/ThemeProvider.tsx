import React, { createContext, useContext, useEffect, useMemo } from "react";
import { ThemeProviderProps, ThemeContextValue } from "./types";
import { createThemeRegistry } from "./createThemeRegistry";
import { injectCssVars } from "./injectCssVars";
import { useThemeController } from "./useThemeController";
import { getDefaultSelector } from "./getDefaultSelector";

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export function ThemeProvider({
    children,
    theme,
    activeThemeName: propActiveThemeName,
    mode: propMode = "system",
    persist = true,
    storageKey = "ds.theme",
    target = "html",
    selectorOverride,
    cssVarPrefix = "--ds-",
    includePrimitives = true,
    includeSemantic = true,
    initialState,
}: ThemeProviderProps) {
    // 1. Normalize Themes
    const registry = useMemo(() => {
        if (!theme) return [];
        return createThemeRegistry(theme);
    }, [theme]);

    const defaultTheme = registry[0];

    if (!defaultTheme) {
        throw new Error("ThemeProvider: Prop 'theme' is required and must contain at least one theme.");
    }

    // 2. State Management
    const {
        activeThemeName,
        setActiveThemeName,
        mode,
        setMode,
        resolvedMode
    } = useThemeController({
        activeThemeName: propActiveThemeName,
        mode: propMode,
        persist,
        storageKey,
        initialState,
        defaultTheme,
    });

    // 3. Apply Attributes to Target
    useEffect(() => {
        let element: HTMLElement | null = null;

        if (typeof target === "string") {
            if (typeof document !== "undefined") {
                element = document.querySelector(target);
            }
        } else {
            element = target;
        }

        if (element) {
            element.setAttribute("data-theme", activeThemeName);
            element.setAttribute("data-mode", resolvedMode);
        }
    }, [target, activeThemeName, resolvedMode]);

    // 4. Generate CSS
    // We use useMemo to avoid re-generating generic CSS on every render
    const css = useMemo(() => {
        return injectCssVars(registry, {
            selectorOverride,
            cssVarPrefix,
            includePrimitives,
            includeSemantic,
        });
    }, [registry, selectorOverride, cssVarPrefix, includePrimitives, includeSemantic]);

    // 5. Context Value
    const value: ThemeContextValue = useMemo(() => ({
        themeName: activeThemeName,
        setThemeName: setActiveThemeName,
        mode,
        setMode,
        resolvedMode,
        themes: registry
    }), [activeThemeName, mode, resolvedMode, registry, setActiveThemeName, setMode]);

    return (
        <ThemeContext.Provider value={value}>
            <style
                id="ds-theme-vars"
                dangerouslySetInnerHTML={{ __html: css }}
            />
            {children}
        </ThemeContext.Provider>
    );
}
