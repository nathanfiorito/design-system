import { Theme } from "../contracts/theme";

export function mapTypography(
    primitives: Theme["primitives"]
): Theme["semantic"]["typography"] {
    const { font } = primitives;

    return {
        body: {
            sm: {
                fontSize: font.size.sm,
                lineHeight: font.lineHeight.normal,
                fontWeight: font.weight.regular,
            },
            md: {
                fontSize: font.size.md,
                lineHeight: font.lineHeight.normal,
                fontWeight: font.weight.regular,
            },
        },
        heading: {
            sm: {
                fontSize: font.size.lg,
                lineHeight: font.lineHeight.tight,
                fontWeight: font.weight.semibold,
            },
            md: {
                fontSize: font.size.xl,
                lineHeight: font.lineHeight.tight,
                fontWeight: font.weight.bold,
            },
            lg: {
                fontSize: font.size["2xl"],
                lineHeight: font.lineHeight.tight,
                fontWeight: font.weight.bold,
            },
        },
    };
}
