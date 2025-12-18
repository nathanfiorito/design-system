import { Theme } from "../contracts/theme";

export function mapSemanticColors(
    primitives: Theme["primitives"],
    mode: "light" | "dark"
): Theme["semantic"]["color"] {
    const { neutral, primary, success, warning, danger } = primitives.palette;
    const isLight = mode === "light";

    return {
        bg: {
            canvas: isLight ? neutral[50] : neutral[900],
            surface: isLight ? "#ffffff" : neutral[800],
            elevated: isLight ? "#ffffff" : neutral[700],
        },
        text: {
            primary: isLight ? neutral[900] : neutral[50],
            secondary: isLight ? neutral[500] : neutral[400],
            muted: isLight ? neutral[400] : neutral[500],
            inverse: isLight ? neutral[50] : neutral[900],
        },
        border: {
            default: isLight ? neutral[200] : neutral[700],
            muted: isLight ? neutral[100] : neutral[800],
            focus: primary[500],
        },
        action: {
            primary: {
                default: primary[500],
                hover: primary[600],
                active: primary[700],
                disabled: primary[200],
                text: "#ffffff",
            },
            danger: {
                default: danger[500],
                hover: danger[600],
                text: "#ffffff",
            },
        },
        feedback: {
            success: success[500],
            warning: warning[500],
            danger: danger[500],
        },
    };
}
