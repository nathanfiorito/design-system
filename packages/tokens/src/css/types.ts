export type ColorPath =
    | "color.bg.canvas"
    | "color.bg.surface"
    | "color.bg.elevated"
    | "color.text.primary"
    | "color.text.secondary"
    | "color.text.muted"
    | "color.text.inverse"
    | "color.border.default"
    | "color.border.muted"
    | "color.border.focus"
    | "color.action.primary.default"
    | "color.action.primary.hover"
    | "color.action.primary.active"
    | "color.action.primary.disabled"
    | "color.action.primary.text"
    | "color.action.danger.default"
    | "color.action.danger.hover"
    | "color.action.danger.text"
    | "color.feedback.success"
    | "color.feedback.warning"
    | "color.feedback.danger";

export type SpacePath =
    | "space.0"
    | "space.2"
    | "space.4"
    | "space.6"
    | "space.8"
    | "space.12"
    | "space.16"
    | "space.20"
    | "space.24"
    | "space.32"
    | "space.40"
    | "space.48"
    | "space.64";

export type RadiusPath =
    | "radius.none"
    | "radius.sm"
    | "radius.md"
    | "radius.lg"
    | "radius.xl"
    | "radius.full";

export type FontPath =
    | "font.family.sans"
    | "font.family.mono"
    | "font.size.xs"
    | "font.size.sm"
    | "font.size.md"
    | "font.size.lg"
    | "font.size.xl"
    | "font.size.2xl"
    | "font.weight.regular"
    | "font.weight.medium"
    | "font.weight.semibold"
    | "font.weight.bold"
    | "font.lineHeight.tight"
    | "font.lineHeight.normal"
    | "font.lineHeight.relaxed"
    | "font.letterSpacing.tight"
    | "font.letterSpacing.normal"
    | "font.letterSpacing.wide";

export type TokenPath = ColorPath | SpacePath | RadiusPath | FontPath;
