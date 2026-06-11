// app/layout.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Marine Database',
  description: 'Track and update bounties across the Grand Line',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
        {/* Global Navigation Bar */}
        <nav style={{
          background: '#020617',
          padding: '1.2rem 2rem',
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
          borderBottom: '1px solid #1e293b',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{ fontWeight: '800', fontSize: '1.3rem', letterSpacing: '3px', color: '#38bdf8' }}>
            ⚓ MARINE HQ
          </div>
          <Link href="/" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }}>Terminal</Link>
          <Link href="/view" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>Active Bounties</Link>
          <Link href="/add" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: '500' }}>Issue Order</Link>
        </nav>

        {/* Page Content Renders Here */}
        <div style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          {children}
        </div>
      </body>
    </html>
  );
}