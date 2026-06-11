// app/add/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPiratePage() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [crew, setCrew] = useState('');
    const [bounty, setBounty] = useState(0);
    const [isDevilFruit, setIsDevilFruit] = useState(false);
    const [marineRank, setMarineRank] = useState('soldier');
    const [statusMessage, setStatusMessage] = useState('');
    const [errorDetails, setErrorDetails] = useState<any>(null);

    const handleAddPirate = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorDetails(null);
        setStatusMessage('Transmitting data to headquarters...');

        try {
            const response = await fetch('/api/bounties', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Marine-Rank': marineRank,
                },
                body: JSON.stringify({
                    name, crew, bounty: Number(bounty), is_devil_fruit_user: isDevilFruit,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setStatusMessage(result.detail || result.error || 'Submission rejected.');
                if (result.details) setErrorDetails(result.details);
                return;
            }

            setStatusMessage(`✅ Success: ${result.message}. Redirecting to logs...`);

            setTimeout(() => {
                router.push('/view');
            }, 1500);

        } catch (err) {
            setStatusMessage('❌ Network connection failure.');
        }
    };

    // Reusable input style object to keep code clean
    const inputStyle = {
        width: '100%', padding: '0.75rem', borderRadius: '6px',
        border: '1px solid #475569', background: '#0f172a', color: '#f8fafc',
        fontSize: '1rem', outline: 'none', boxSizing: 'border-box' as const
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid #334155', paddingBottom: '1rem', fontSize: '2rem' }}>
                Issue New Bounty
            </h2>

            {statusMessage && (
                <div style={{ background: statusMessage.includes('✅') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(56, 189, 248, 0.1)', border: `1px solid ${statusMessage.includes('✅') ? '#10b981' : '#38bdf8'}`, padding: '1rem', marginBottom: '1.5rem', borderRadius: '6px', color: statusMessage.includes('✅') ? '#34d399' : '#7dd3fc' }}>
                    {statusMessage}
                </div>
            )}

            {errorDetails && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', color: '#fca5a5', overflowX: 'auto' }}>
                    <strong>⚠️ Validation Error:</strong>
                    <pre style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>{JSON.stringify(errorDetails, null, 2)}</pre>
                </div>
            )}

            <form onSubmit={handleAddPirate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#1e293b', padding: '2rem', borderRadius: '12px', border: '1px solid #334155', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' }}>

                <div>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Officer Override Rank:</label>
                    <select value={marineRank} onChange={(e) => setMarineRank(e.target.value)} style={inputStyle}>
                        <option value="soldier">Seaman (Standard)</option>
                        <option value="Admiral">Admiral (Authorized)</option>
                        <option value="Fleet-Admiral">Fleet-Admiral (Authorized)</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Target Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required placeholder="e.g., Eustass Kid" />
                </div>

                <div>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Pirate Crew / Affiliation:</label>
                    <input type="text" value={crew} onChange={(e) => setCrew(e.target.value)} style={inputStyle} required placeholder="e.g., Kid Pirates" />
                </div>

                <div>
                    <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Bounty Amount (Berries):</label>
                    <input type="number" value={bounty} onChange={(e) => setBounty(Number(e.target.value))} style={inputStyle} required min="1" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                    <input type="checkbox" id="fruit" checked={isDevilFruit} onChange={(e) => setIsDevilFruit(e.target.checked)} style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }} />
                    <label htmlFor="fruit" style={{ color: '#cbd5e1', cursor: 'pointer', userSelect: 'none' }}>Confirmed Devil Fruit User</label>
                </div>

                <button type="submit" style={{
                    padding: '1rem',
                    background: '#0284c7',
                    color: '#f8fafc',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    transition: 'background 0.2s',
                    boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.4)'
                }}>
                    Transmit Order to Headquarters
                </button>
            </form>
        </div>
    );
}