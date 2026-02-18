import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 16 }}>
          <h2>404</h2>
          <p>Page not found.</p>
          <Link href="/">Go back home</Link>
        </div>
      </body>
    </html>
  );
}
