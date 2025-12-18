import { Theme } from "../contracts/theme";
import { mapSemanticColors } from "./mapSemanticColors";
import { mapTypography } from "./mapTypography";

export function buildTheme(input: {
    meta: Theme["meta"];
    primitives: Theme["primitives"];
}): Theme {
    const { meta, primitives } = input;

    const semanticColors = mapSemanticColors(primitives, meta.mode);
    const semanticTypography = mapTypography(primitives);

    return {
        meta,
        primitives,
        semantic: {
            color: semanticColors,
            typography: semanticTypography,
            motion: {
                duration: {
                    fast: "120ms",
                    normal: "200ms",
                    slow: "320ms",
                },
                easing: {
                    standard: "cubic-bezier(0.2, 0, 0, 1)",
                    emphasized: "cubic-bezier(0.2, 0, 0, 1)",
                },
            },
        },
    };
}
