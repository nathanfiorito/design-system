
import { toCssVars } from './packages/tokens/src/exporters/toCssVars';
import { Theme } from './packages/tokens/src/contracts/theme';

const mockTheme: Theme = {
    meta: {
        name: 'default',
        mode: 'light'
    },
    primitives: {
        palette: {
            neutral: { 0: '#ffffff', 900: '#000000' } as any,
            primary: { 500: '#0000ff' } as any,
            success: {}, warning: {}, danger: {}
        } as any,
        space: { 4: '1rem' } as any,
        radius: { md: '4px' } as any,
        shadow: { sm: '0 1px 2px 0 rgba(0,0,0,0.05)' } as any,
        font: {
            family: { sans: 'Inter', mono: 'monospace' },
            size: {}, weight: {}, lineHeight: {}, letterSpacing: {}
        } as any
    },
    semantic: {
        color: {
            bg: { surface: '#ffffff', canvas: '#f0f0f0', elevated: '#fff' },
            text: { primary: '#000', secondary: '#333', muted: '#666', inverse: '#fff' },
            border: {}, action: { primary: {}, danger: {} }, feedback: {}
        } as any,
        typography: { body: {}, heading: {} } as any,
        motion: { duration: {}, easing: {} } as any
    }
};

const css = toCssVars(mockTheme);
console.log('--- Generated CSS ---');
console.log(css);

const cssOnlySemantic = toCssVars(mockTheme, { includePrimitives: false });
console.log('--- Semantic Only CSS ---');
console.log(cssOnlySemantic);
