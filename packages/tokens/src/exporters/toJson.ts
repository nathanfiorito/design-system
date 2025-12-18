import { Theme } from "../contracts/theme";

export function toJson(theme: Theme): Theme {
    return JSON.parse(JSON.stringify(theme));
}
