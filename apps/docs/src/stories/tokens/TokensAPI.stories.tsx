import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ds, token } from '@ds/tokens/css';

const meta: Meta = {
    title: 'Foundations/Tokens API',
    parameters: {
        layout: 'padded',
    },
};

export default meta;

export const Documentation = () => {
    return (
        <div className="tokens-api" style={{ fontFamily: 'var(--ds-font-family-sans, sans-serif)', color: 'var(--ds-color-text-primary)' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h1>Tokens API</h1>
                <p>
                    Utilize o objeto <code>ds</code> ou a função <code>token()</code> para consumir variáveis CSS com segurança de tipos.
                </p>
            </header>

            <section style={{ marginBottom: '3rem' }}>
                <h2>A. Como usar</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <h3>Objeto <code>ds</code></h3>
                        <p>O jeito preferido: oferece autocomplete e previne typos.</p>
                        <pre style={{ background: token('color.bg.surface'), border: `1px solid ${token('color.border.default')}`, padding: '1rem', borderRadius: '8px', overflowX: 'auto' }}>
                            <code>
                                {`import { ds } from "@ds/tokens/css";

// Retorna "var(--ds-color-bg-surface)"
<div style={{ background: ds.color.bg.surface }} />`}
                            </code>
                        </pre>
                    </div>
                    <div>
                        <h3>Função <code>token()</code></h3>
                        <p>Útil para composição dinâmica de strings.</p>
                        <pre style={{ background: token('color.bg.surface'), border: `1px solid ${token('color.border.default')}`, padding: '1rem', borderRadius: '8px', overflowX: 'auto' }}>
                            <code>
                                {`import { token } from "@ds/tokens/css";

// Retorna "var(--ds-space-4)"
<div style={{ padding: token("space.4") }} />`}
                            </code>
                        </pre>
                    </div>
                </div>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2>B. Cores Semânticas</h2>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <ColorGroup
                        title="Background"
                        tokens={[
                            { path: 'ds.color.bg.canvas', value: token('color.bg.canvas') },
                            { path: 'ds.color.bg.surface', value: token('color.bg.surface') },
                            { path: 'ds.color.bg.elevated', value: token('color.bg.elevated') },
                        ]}
                    />
                    <ColorGroup
                        title="Text"
                        tokens={[
                            { path: 'ds.color.text.primary', value: token('color.text.primary') },
                            { path: 'ds.color.text.secondary', value: token('color.text.secondary') },
                            { path: 'ds.color.text.muted', value: token('color.text.muted') },
                            { path: 'ds.color.text.inverse', value: token('color.text.inverse'), bg: 'black' },
                        ]}
                    />
                    <ColorGroup
                        title="Border"
                        tokens={[
                            { path: 'ds.color.border.default', value: token('color.border.default'), border: true },
                            { path: 'ds.color.border.muted', value: token('color.border.muted'), border: true },
                            { path: 'ds.color.border.focus', value: token('color.border.focus'), border: true },
                        ]}
                    />
                    <ColorGroup
                        title="Action Primary"
                        tokens={[
                            { path: 'ds.color.action.primary.default', value: token('color.action.primary.default') },
                            { path: 'ds.color.action.primary.hover', value: token('color.action.primary.hover') },
                            { path: 'ds.color.action.primary.active', value: token('color.action.primary.active') },
                            { path: 'ds.color.action.primary.disabled', value: token('color.action.primary.disabled') },
                        ]}
                    />
                </div>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2>Tipografia</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TypographySample label="Heading LG" style={{ fontSize: 'var(--ds-typography-heading-lg-fontSize)', fontWeight: 'var(--ds-typography-heading-lg-fontWeight)' }} />
                    <TypographySample label="Heading MD" style={{ fontSize: 'var(--ds-typography-heading-md-fontSize)', fontWeight: 'var(--ds-typography-heading-md-fontWeight)' }} />
                    <TypographySample label="Heading SM" style={{ fontSize: 'var(--ds-typography-heading-sm-fontSize)', fontWeight: 'var(--ds-typography-heading-sm-fontWeight)' }} />
                    <hr />
                    <TypographySample label="Body MD" style={{ fontSize: 'var(--ds-typography-body-md-fontSize)' }} />
                    <TypographySample label="Body SM" style={{ fontSize: 'var(--ds-typography-body-sm-fontSize)' }} />
                </div>
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2>Espaçamento</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    {['4', '8', '12', '16', '24', '32'].map((space) => (
                        <div key={space} style={{ textAlign: 'center' }}>
                            <div style={{
                                width: token(`space.${space}` as any),
                                height: token(`space.${space}` as any),
                                background: token('color.action.primary.default'),
                                opacity: 0.2
                            }} />
                            <code style={{ fontSize: '10px' }}>space.{space}</code>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Radius</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {['sm', 'md', 'lg', 'full'].map((r) => (
                        <div key={r} style={{
                            width: '64px',
                            height: '64px',
                            border: `2px solid ${token('color.border.default')}`,
                            borderRadius: token(`radius.${r}` as any),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <code>{r}</code>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

// Components helpers
const ColorGroup = ({ title, tokens }: { title: string, tokens: any[] }) => (
    <div>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{title}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {tokens.map((t) => (
                <div key={t.path} style={{ border: `1px solid ${token('color.border.muted')}`, borderRadius: '8px', padding: '0.5rem', background: t.bg || 'transparent' }}>
                    <div style={{
                        height: '48px',
                        background: t.value,
                        borderRadius: '4px',
                        border: t.border ? '2px solid' : 'none',
                        borderColor: t.value,
                        marginBottom: '0.5rem'
                    }}></div>
                    <div style={{ fontSize: '12px', fontFamily: 'monospace' }}>
                        <div style={{ fontWeight: 'bold' }}>{t.path}</div>
                        <div style={{ color: token('color.text.muted') }}>{t.value}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const TypographySample = ({ label, style }: { label: string, style: React.CSSProperties }) => (
    <div>
        <span style={{ fontSize: '10px', color: token('color.text.muted'), display: 'block', marginBottom: '0.25rem' }}>{label}</span>
        <div style={style}>The quick brown fox jumps over the lazy dog.</div>
    </div>
);
