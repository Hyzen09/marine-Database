// app/page.tsx
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <main style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#f8fafc', letterSpacing: '-1px' }}>
        Vedang
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
        Secure terminal connection established. Please select your sector operation from the dashboard below.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <Link href="/view" style={{
          padding: '2rem',
          border: '1px solid #334155',
          borderRadius: '12px',
          background: '#1e293b',
          textDecoration: 'none',
          color: '#f8fafc',
          width: '280px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>📋 View Bounties</h2>
          <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Retrieve active wanted posters, threat levels, and recent sightings.</p>
        </Link>

        <Link href="/add" style={{
          padding: '2rem',
          border: '1px solid #334155',
          borderRadius: '12px',
          background: '#1e293b',
          textDecoration: 'none',
          color: '#f8fafc',
          width: '280px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>📝 Issue Order</h2>
          <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Authorize and log new pirate targets into the global system.</p>
        </Link>
      </div>
    </main>
  );
}