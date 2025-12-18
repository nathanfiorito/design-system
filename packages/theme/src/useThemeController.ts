import { useState, useEffect, useMemo, useCallback } from "react";
import { Theme } from "@ds/tokens";
import { ModePreference, ThemeMode, ThemeName } from "./types";
import { getSystemMode, subscribeSystemMode } from "./prefersColorScheme";
import { readState, writeState } from "./storage";

type UseThemeControllerProps = {
    activeThemeName?: ThemeName;
    mode?: ModePreference;
    persist?: boolean;
    storageKey?: string;
    initialState?: {
        activeThemeName?: ThemeName;
        mode?: ModePreference;
    };
    defaultTheme: Theme;
};

export function useThemeController({
    activeThemeName: propActiveThemeName,
    mode: propMode = "system",
    persist = true,
    storageKey = "ds.theme",
    initialState,
    defaultTheme,
}: UseThemeControllerProps) {
    // 1. Initialize State
    // Priority: initialState > props > defaults
    // We DO NOT read storage here to avoid hydration mismatch (FOUC is handled by fallback).

    const [activeThemeName, setActiveThemeName] = useState<ThemeName>(
        initialState?.activeThemeName ?? propActiveThemeName ?? defaultTheme.meta.name
    );

    const [mode, setMode] = useState<ModePreference>(
        initialState?.mode ?? propMode // Default is "system" from propMode default
    );

    // Sync props to state (Controlled behavior)
    useEffect(() => {
        if (propActiveThemeName) {
            setActiveThemeName(propActiveThemeName);
        }
    }, [propActiveThemeName]);

    useEffect(() => {
        if (propMode) {
            setMode(propMode);
        }
    }, [propMode]);

    // 2. System Mode Sync (Client Only)
    const [systemMode, setSystemMode] = useState<ThemeMode>(() => matchSystemMode());

    function matchSystemMode(): ThemeMode {
        // Safe for SSR (returns 'light')
        return getSystemMode();
    }

    // Effect to subscribe to system changes
    useEffect(() => {
        setSystemMode(getSystemMode()); // Update on mount
        const unsubscribe = subscribeSystemMode((newMode) => {
            setSystemMode(newMode);
        });
        return unsubscribe;
    }, []);

    // 3. Hydrate from Storage (Client Only)
    useEffect(() => {
        if (!persist) return;

        const stored = readState(storageKey);
        if (stored) {
            if (stored.activeThemeName) {
                setActiveThemeName(stored.activeThemeName);
            }
            if (stored.mode) {
                setMode(stored.mode);
            }
        }
    }, [persist, storageKey]);

    // 4. Persistence Effect
    useEffect(() => {
        if (!persist) return;

        // Only write if we are client-side and state has stabilized
        writeState(storageKey, {
            activeThemeName,
            mode,
        });
    }, [activeThemeName, mode, persist, storageKey]);

    // 5. Resolve Effective Mode
    const resolvedMode: ThemeMode = useMemo(() => {
        if (mode === "system") {
            return systemMode;
        }
        return mode;
    }, [mode, systemMode]);

    return {
        activeThemeName,
        setActiveThemeName,
        mode,
        setMode,
        resolvedMode,
    };
}
