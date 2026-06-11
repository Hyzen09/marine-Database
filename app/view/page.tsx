// app/view/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Pirate {
    name: string;
    crew: string;
    bounty: number;
    is_devil_fruit_user: boolean;
    threat_level?: string;
}

export default function ViewPiratesPage() {
    const [pirates, setPirates] = useState<Pirate[]>([]);
    const [statusMessage, setStatusMessage] = useState('Decrypting database...');
    const [pingTime, setPingTime] = useState<string | null>(null);

    useEffect(() => {
        const fetchBounties = async () => {
            try {
                const response = await fetch('/api/bounties');
                const ping = response.headers.get('X-Den-Den-Mushi-Ping');
                if (ping) setPingTime(ping);

                const result = await response.json();

                if (!response.ok) {
                    setPirates([]);
                    setStatusMessage(result.message || 'Failed to fetch.');
                    return;
                }

                setPirates(result.data || []);
                setStatusMessage('');
            } catch (err) {
                setStatusMessage('Network connection failure.');
            }
        };

        fetchBounties();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #334155', paddingBottom: '1rem', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0, fontSize: '2rem', color: '#f8fafc' }}>Active Wanted Notices</h2>
                {pingTime && <div style={{ color: '#10b981', fontSize: '0.9rem', fontFamily: 'monospace' }}>Latency: {pingTime}s</div>}
            </div>

            {statusMessage && <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>{statusMessage}</p>}

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {pirates.map((pirate, idx) => (
                    <div key={idx} style={{
                        padding: '1.5rem',
                        background: '#1e293b',
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <strong style={{ fontSize: '1.4rem', letterSpacing: '0.5px' }}>{pirate.name}</strong>
                            <span style={{
                                background: pirate.threat_level === 'Extreme' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                                color: pirate.threat_level === 'Extreme' ? '#fca5a5' : '#cbd5e1',
                                border: `1px solid ${pirate.threat_level === 'Extreme' ? '#ef4444' : '#64748b'}`,
                                padding: '0.35rem 0.75rem',
                                borderRadius: '9999px',
                                fontSize: '0.85rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}>
                                {pirate.threat_level}
                            </span>
                        </div>

                        <div style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                            Affiliation: <span style={{ color: '#e2e8f0' }}>{pirate.crew}</span>
                        </div>

                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fbbf24' }}>
                            🪙 {pirate.bounty.toLocaleString()} <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 'normal' }}>Berries</span>
                        </div>

                        {pirate.is_devil_fruit_user && (
                            <div style={{ marginTop: '1rem', color: '#c084fc', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>🔮</span> Confirmed Devil Fruit User
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}