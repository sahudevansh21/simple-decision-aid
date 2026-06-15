import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Simple Decision Aid',
  description: 'Systematically evaluate options with weighted scoring models.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="navbar-brand">
            <Link href="/">Decision Aid</Link>
          </div>
          <ul className="navbar-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/create-decision-matrix">Create Matrix</Link></li>
            <li><Link href="/saved-matrices">Saved Matrices</Link></li>
          </ul>
        </nav>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
