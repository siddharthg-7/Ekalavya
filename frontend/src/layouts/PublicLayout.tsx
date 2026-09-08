import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { EkalavyaLogo } from '../components/EkalavyaLogo';

export const PublicLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--mc-canvas)] text-[var(--mc-ink)] flex flex-col font-['Sofia_Sans',sans-serif]">
      {/* Public Header */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 pb-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center no-underline group select-none">
          <EkalavyaLogo variant="light" size="sm" />
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4 text-xs font-medium">
          <Link
            to="/help"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              location.pathname === '/help'
                ? 'bg-[var(--mc-ink)] text-white'
                : 'text-[var(--mc-granite)] hover:text-[var(--mc-ink)] hover:bg-white/60'
            }`}
          >
            Help
          </Link>
          <Link
            to="/accessibility"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              location.pathname === '/accessibility'
                ? 'bg-[var(--mc-ink)] text-white'
                : 'text-[var(--mc-granite)] hover:text-[var(--mc-ink)] hover:bg-white/60'
            }`}
          >
            Accessibility
          </Link>
          <Link
            to="/demo"
            className="px-4 py-1.5 rounded-full bg-white text-[var(--mc-ink)] border border-[var(--mc-border-light)] hover:border-[var(--mc-ink)] transition-all font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--mc-signal-orange)]" />
            <span>Explore Demo</span>
          </Link>
          <Link
            to="/login"
            className="mc-btn-primary py-1.5 px-4 text-xs no-underline"
          >
            Sign In
          </Link>
        </nav>
      </header>

      {/* Page Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 py-8">
        <Outlet />
      </main>

      {/* Simple Public Footer */}
      <footer className="border-t border-[var(--mc-border-light)] py-6 text-center text-xs text-[var(--mc-slate-gray)]">
        <p>Ekalavya AI Competency Platform • Ministry of Statistics and Programme Implementation (MoSPI)</p>
      </footer>
    </div>
  );
};
