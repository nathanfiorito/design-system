
import { toCssVars } from "./toCssVars";
import type { Theme } from "../contracts/theme";

// Mock Theme for demonstration since defaultLight is not yet available in the file system context
const mockTheme: Theme = {
    meta: {
        name: "demo",
        mode: "light",
    },
    primitives: {
        palette: {
            neutral: { 50: "#fafafa", 900: "#171717" },
            primary: { 500: "#3b82f6" },
            success: { 500: "#22c55e" },
            warning: { 500: "#eab308" },
            danger: { 500: "#ef4444" },
        },
        space: { 4: "1rem", 16: "4rem" },
        radius: { sm: "0.125rem", md: "0.25rem", lg: "0.5rem", xl: "1rem", full: "9999px", none: "0" },
        shadow: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)", md: "0 4px 6px -1px rgb(0 0 0 / 0.1)", lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)" },
        font: {
            family: { sans: "Inter, sans-serif", mono: "monospace" },
            size: { xs: "0.75rem", sm: "0.875rem", md: "1rem", lg: "1.125rem", xl: "1.25rem", "2xl": "1.5rem" },
            weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
            lineHeight: { tight: "1.25", normal: "1.5", relaxed: "1.75" },
            letterSpacing: { tight: "-0.025em", normal: "0em", wide: "0.025em" },
        },
    },
    semantic: {
        color: {
            bg: { canvas: "#ffffff", surface: "#ffffff", elevated: "#ffffff" },
            text: { primary: "#000000", secondary: "#555555", muted: "#888888", inverse: "#ffffff" },
            border: { default: "#e5e5e5", muted: "#f5f5f5", focus: "#3b82f6" },
            action: {
                primary: { default: "#3b82f6", hover: "#2563eb", active: "#1d4ed8", disabled: "#93c5fd", text: "#ffffff" },
                danger: { default: "#ef4444", hover: "#dc2626", text: "#ffffff" },
            },
            feedback: { success: "#22c55e", warning: "#eab308", danger: "#ef4444" },
        },
        typography: {
            body: { sm: { fontSize: "0.875rem", lineHeight: "1.25", fontWeight: 400 }, md: { fontSize: "1rem", lineHeight: "1.5", fontWeight: 400 } },
            heading: { sm: { fontSize: "1.25rem", lineHeight: "1.75", fontWeight: 600 }, md: { fontSize: "1.5rem", lineHeight: "1.75", fontWeight: 700 }, lg: { fontSize: "2.25rem", lineHeight: "2.5", fontWeight: 800 } },
        },
        motion: {
            duration: { fast: "150ms", normal: "300ms", slow: "500ms" },
            easing: { standard: "ease-in-out", emphasized: "cubic-bezier(0.2, 0.0, 0, 1.0)" },
        },
    },
};

console.log("--- Generated CSS Vars ---");
console.log(toCssVars(mockTheme).slice(0, 1000)); // Limit output length
console.log("... (truncated)");
