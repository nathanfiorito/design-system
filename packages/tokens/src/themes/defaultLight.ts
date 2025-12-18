import { buildTheme } from "../semantic/buildSemanticTheme";
import { neutral, primary, success, warning, danger } from "../primitives/palette";
import { space } from "../primitives/space";
import { radius } from "../primitives/radius";
import { shadow } from "../primitives/shadow";
import * as typography from "../primitives/typography";

const primitives = {
    palette: { neutral, primary, success, warning, danger },
    space,
    radius,
    shadow,
    font: {
        family: typography.family,
        size: typography.size,
        weight: typography.weight,
        lineHeight: typography.lineHeight,
        letterSpacing: typography.letterSpacing,
    },
};

export const defaultLight = buildTheme({
    meta: {
        name: "default",
        mode: "light",
    },
    primitives,
});
