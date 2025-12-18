import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { token } from '@ds/tokens/css';

const meta: Meta = {
    title: 'Foundations/Tokens Playground',
};

export default meta;

export const Playground = () => {
    const [semanticColor, setSemanticColor] = useState('color.bg.surface');
    const [radius, setRadius] = useState('radius.md');
    const [space, setSpace] = useState('space.16');

    const style = {
        backgroundColor: token(semanticColor as any),
        borderRadius: token(radius as any),
        padding: token(space as any),
        border: `1px solid ${token('color.border.default')}`,
        color: token('color.text.primary'),
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', maxWidth: '600px' }}>
                <Label>
                    Color (Background)
                    <select value={semanticColor} onChange={(e) => setSemanticColor(e.target.value)} style={inputStyle}>
                        <option value="color.bg.canvas">bg.canvas</option>
                        <option value="color.bg.surface">bg.surface</option>
                        <option value="color.bg.elevated">bg.elevated</option>
                        <option value="color.action.primary.default">action.primary.default</option>
                        <option value="color.action.primary.disabled">action.primary.disabled</option>
                        <option value="color.feedback.warning">feedback.warning</option>
                    </select>
                </Label>

                <Label>
                    Radius
                    <select value={radius} onChange={(e) => setRadius(e.target.value)} style={inputStyle}>
                        <option value="radius.none">none</option>
                        <option value="radius.sm">sm</option>
                        <option value="radius.md">md</option>
                        <option value="radius.lg">lg</option>
                        <option value="radius.full">full</option>
                    </select>
                </Label>

                <Label>
                    Padding (Space)
                    <select value={space} onChange={(e) => setSpace(e.target.value)} style={inputStyle}>
                        <option value="space.4">4</option>
                        <option value="space.8">8</option>
                        <option value="space.16">16</option>
                        <option value="space.24">24</option>
                        <option value="space.32">32</option>
                    </select>
                </Label>
            </div>

            <div style={{ padding: '2rem', border: `1px dashed ${token('color.border.muted')}`, borderRadius: '8px', background: token('color.bg.canvas'), display: 'flex', justifyContent: 'center' }}>
                <div style={style}>
                    <strong>Playground Element</strong>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                        Adjust the controls above to change my appearance using design tokens.
                    </p>
                </div>
            </div>

            <div style={{ marginTop: '1rem', fontFamily: 'monospace', fontSize: '12px', color: token('color.text.muted') }}>
                <div>backgroundColor: {token(semanticColor as any)}</div>
                <div>borderRadius: {token(radius as any)}</div>
                <div>padding: {token(space as any)}</div>
            </div>

        </div>
    );
};

const Label = ({ children }: { children: React.ReactNode }) => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '14px', fontWeight: 500 }}>
        {children}
    </label>
);

const inputStyle = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: `1px solid ${token('color.border.default')}`,
    background: token('color.bg.surface'),
    color: token('color.text.primary'),
    fontFamily: 'inherit'
};
