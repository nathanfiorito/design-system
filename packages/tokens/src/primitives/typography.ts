import {
    FontFamilyScale,
    FontSizeScale,
    FontWeightScale,
    LetterSpacingScale,
    LineHeightScale,
} from "../contracts/scales";

export const family: FontFamilyScale = {
    sans: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};

export const size: FontSizeScale = {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
};

export const weight: FontWeightScale = {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
};

export const lineHeight: LineHeightScale = {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
};

export const letterSpacing: LetterSpacingScale = {
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
};
