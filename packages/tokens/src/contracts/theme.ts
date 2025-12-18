import type {
    ColorScale,
    FontFamilyScale,
    FontSizeScale,
    FontWeightScale,
    LetterSpacingScale,
    LineHeightScale,
    RadiusScale,
    ShadowScale,
    SpaceScale,
} from "./scales";

export type ThemeMode = "light" | "dark";

export type Theme = {
    meta: {
        name: string;
        mode: "light" | "dark";
    };

    primitives: {
        palette: {
            neutral: ColorScale;
            primary: ColorScale;
            success: ColorScale;
            warning: ColorScale;
            danger: ColorScale;
        };
        space: SpaceScale;
        radius: RadiusScale;
        shadow: ShadowScale;
        font: {
            family: FontFamilyScale;
            size: FontSizeScale;
            weight: FontWeightScale;
            lineHeight: LineHeightScale;
            letterSpacing: LetterSpacingScale;
        };
    };

    semantic: {
        color: {
            bg: {
                canvas: string;
                surface: string;
                elevated: string;
            };
            text: {
                primary: string;
                secondary: string;
                muted: string;
                inverse: string;
            };
            border: {
                default: string;
                muted: string;
                focus: string;
            };
            action: {
                primary: {
                    default: string;
                    hover: string;
                    active: string;
                    disabled: string;
                    text: string;
                };
                danger: {
                    default: string;
                    hover: string;
                    text: string;
                };
            };
            feedback: {
                success: string;
                warning: string;
                danger: string;
            };
        };

        typography: {
            body: {
                sm: { fontSize: string; lineHeight: string; fontWeight: number };
                md: { fontSize: string; lineHeight: string; fontWeight: number };
            };
            heading: {
                sm: { fontSize: string; lineHeight: string; fontWeight: number };
                md: { fontSize: string; lineHeight: string; fontWeight: number };
                lg: { fontSize: string; lineHeight: string; fontWeight: number };
            };
        };

        motion: {
            duration: {
                fast: string;
                normal: string;
                slow: string;
            };
            easing: {
                standard: string;
                emphasized: string;
            };
        };
    };
};
