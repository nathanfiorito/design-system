export type ColorScale = Record<number, string>;
export type SpaceScale = Record<number, string>;
export type RadiusScale = Record<"none" | "sm" | "md" | "lg" | "xl" | "full", string>;
export type ShadowScale = Record<"sm" | "md" | "lg", string>;

export type FontFamilyScale = {
    sans: string;
    mono: string;
};

export type FontSizeScale = Record<"xs" | "sm" | "md" | "lg" | "xl" | "2xl", string>;
export type FontWeightScale = Record<"regular" | "medium" | "semibold" | "bold", number>;
export type LineHeightScale = Record<"tight" | "normal" | "relaxed", string>;
export type LetterSpacingScale = Record<"tight" | "normal" | "wide", string>;
