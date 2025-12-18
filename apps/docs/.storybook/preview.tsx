import React from "react";
import type { Preview } from "@storybook/react";
import "@ds/ui/foundations";
import { ThemeProvider } from "@ds/theme";
import { defaultLight, defaultDark } from "@ds/tokens";

const preview: Preview = {
    globalTypes: {
        mode: {
            description: "Theme mode",
            defaultValue: "light",
            toolbar: {
                title: "Mode",
                items: ["light", "dark", "system"],
            },
        },
    },
    decorators: [
        (Story, ctx) => (
            <ThemeProvider
                theme={{ light: defaultLight, dark: defaultDark }}
                mode={ctx.globals.mode ?? "light"}
                persist={false}
            >
                <div style={{ padding: "16px" }}>
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
};

export default preview;
