import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { EkalavyaLogo } from '../components/EkalavyaLogo';

export const PublicLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#102A43] flex flex-col font-['Noto_Sans','Inter',sans-serif]">
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
                ? 'bg-[#102A43] text-white'
                : 'text-[#52657A] hover:text-[#102A43] hover:bg-white/60'
            }`}
          >
            Help
          </Link>
          <Link
            to="/accessibility"
            className={`px-3 py-1.5 rounded-full transition-colors ${
              location.pathname === '/accessibility'
                ? 'bg-[#102A43] text-white'
                : 'text-[#52657A] hover:text-[#102A43] hover:bg-white/60'
            }`}
          >
            Accessibility
          </Link>
          <Link
            to="/demo"
            className="px-4 py-1.5 rounded-full bg-white text-[#102A43] border border-[#DCE3EA] hover:border-[#2563D9] hover:bg-blue-50/50 transition-all font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <Compass className="w-3.5 h-3.5 text-[#2563D9]" />
            <span>Explore Demo</span>
          </Link>
          <Link
            to="/login"
            className="px-4 py-1.5 rounded-full bg-[#2563D9] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-colors no-underline shadow-xs"
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
