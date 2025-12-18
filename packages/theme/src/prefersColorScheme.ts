import { ThemeMode } from "./types";

/**
 * Returns the current system theme preference.
 * SSR-safe: returns "light" if window/matchMedia is not available.
 */
export function getSystemMode(): ThemeMode {
    if (
        typeof window === "undefined" ||
        !window.matchMedia
    ) {
        return "light";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

/**
 * Subscribes to changes in system theme preference.
 * Returns a cleanup function.
 */
export function subscribeSystemMode(
    callback: (mode: ThemeMode) => void
): () => void {
    if (
        typeof window === "undefined" ||
        !window.matchMedia
    ) {
        return () => { };
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
        callback(e.matches ? "dark" : "light");
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }

    // Fallback for older environments
    if (mediaQuery.addListener) {
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
    }

    return () => { };
}
