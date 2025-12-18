import { ModePreference, ThemeName } from "./types";

type StorageState = {
    activeThemeName?: ThemeName;
    mode?: ModePreference;
};

/**
 * Safely reads state from localStorage.
 * Returns null if window is undefined or error occurs.
 */
export function readState(key: string): StorageState | null {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const value = window.localStorage.getItem(key);
        if (!value) return null;
        return JSON.parse(value) as StorageState;
    } catch (e) {
        console.warn(`[@ds/theme] Failed to read from localStorage key "${key}":`, e);
        return null;
    }
}

/**
 * Safely writes state to localStorage.
 * No-op if window is undefined.
 */
export function writeState(key: string, state: StorageState): void {
    if (typeof window === "undefined") {
        return;
    }

    try {
        window.localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
        console.warn(`[@ds/theme] Failed to write to localStorage key "${key}":`, e);
    }
}
