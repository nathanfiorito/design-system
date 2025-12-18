import { TokenPath } from "./types";

export function token(path: TokenPath, opts?: { prefix?: string }): string {
    const prefix = opts?.prefix ?? "--ds-";
    const varName = path.replace(/\./g, "-");
    return `var(${prefix}${varName})`;
}
