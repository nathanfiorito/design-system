export const ds = {
    color: {
        bg: {
            canvas: "var(--ds-color-bg-canvas)",
            surface: "var(--ds-color-bg-surface)",
            elevated: "var(--ds-color-bg-elevated)",
        },
        text: {
            primary: "var(--ds-color-text-primary)",
            secondary: "var(--ds-color-text-secondary)",
            muted: "var(--ds-color-text-muted)",
            inverse: "var(--ds-color-text-inverse)",
        },
        border: {
            default: "var(--ds-color-border-default)",
            muted: "var(--ds-color-border-muted)",
            focus: "var(--ds-color-border-focus)",
        },
        action: {
            primary: {
                default: "var(--ds-color-action-primary-default)",
                hover: "var(--ds-color-action-primary-hover)",
                active: "var(--ds-color-action-primary-active)",
                disabled: "var(--ds-color-action-primary-disabled)",
                text: "var(--ds-color-action-primary-text)",
            },
            danger: {
                default: "var(--ds-color-action-danger-default)",
                hover: "var(--ds-color-action-danger-hover)",
                text: "var(--ds-color-action-danger-text)",
            },
        },
        feedback: {
            success: "var(--ds-color-feedback-success)",
            warning: "var(--ds-color-feedback-warning)",
            danger: "var(--ds-color-feedback-danger)",
        },
    },
    space: {
        0: "var(--ds-space-0)",
        2: "var(--ds-space-2)",
        4: "var(--ds-space-4)",
        6: "var(--ds-space-6)",
        8: "var(--ds-space-8)",
        9: "var(--ds-space-9)",
        12: "var(--ds-space-12)",
        16: "var(--ds-space-16)",
        20: "var(--ds-space-20)",
        24: "var(--ds-space-24)",
        32: "var(--ds-space-32)",
        40: "var(--ds-space-40)",
        48: "var(--ds-space-48)",
        64: "var(--ds-space-64)",
    },
    radius: {
        none: "var(--ds-radius-none)",
        sm: "var(--ds-radius-sm)",
        md: "var(--ds-radius-md)",
        lg: "var(--ds-radius-lg)",
        xl: "var(--ds-radius-xl)",
        full: "var(--ds-radius-full)",
    },
    font: {
        family: {
            sans: "var(--ds-font-family-sans)",
            mono: "var(--ds-font-family-mono)",
        },
        size: {
            xs: "var(--ds-font-size-xs)",
            sm: "var(--ds-font-size-sm)",
            md: "var(--ds-font-size-md)",
            lg: "var(--ds-font-size-lg)",
            xl: "var(--ds-font-size-xl)",
            "2xl": "var(--ds-font-size-2xl)",
        },
        weight: {
            regular: "var(--ds-font-weight-regular)",
            medium: "var(--ds-font-weight-medium)",
            semibold: "var(--ds-font-weight-semibold)",
            bold: "var(--ds-font-weight-bold)",
        },
        lineHeight: {
            tight: "var(--ds-font-lineHeight-tight)",
            normal: "var(--ds-font-lineHeight-normal)",
            relaxed: "var(--ds-font-lineHeight-relaxed)",
        },
        letterSpacing: {
            tight: "var(--ds-font-letterSpacing-tight)",
            normal: "var(--ds-font-letterSpacing-normal)",
            wide: "var(--ds-font-letterSpacing-wide)",
        },
    },
} as const;
