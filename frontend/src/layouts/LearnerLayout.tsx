import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import { EkalavyaLogo } from '../components/EkalavyaLogo';

export const LearnerLayout: React.FC = () => {
  const { session, currentOfficial, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleExitDemo = () => {
    signOut();
    navigate('/login', { replace: true });
  };

  const navItems = [
    { path: '/learner', label: 'Dashboard', exact: true },
    { path: '/learner/profile', label: 'Competencies' },
    { path: '/learner/gaps', label: 'Skill Gaps' },
    { path: '/learner/learning', label: 'Learning' },
    { path: '/learner/assessments', label: 'Assessments' },
    { path: '/learner/progress', label: 'Progress' },
  ];

  return (
    <div className="min-h-screen bg-[var(--mc-canvas)] text-[var(--mc-ink)] flex flex-col font-['Sofia_Sans',sans-serif]">
      {/* Learner Top Header */}
      <header className="sticky top-0 z-40 bg-[var(--mc-canvas)]/90 backdrop-blur-md border-b border-[var(--mc-border-light)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div 
            onClick={() => navigate('/learner')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <EkalavyaLogo variant="light" size="sm" showTagline={false} />
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#102A43] text-white">
              Learner
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 p-1 rounded-full border border-[var(--mc-border-light)] shadow-xs">
            {navItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-150 no-underline ${
                    isActive
                      ? 'bg-[var(--mc-ink)] text-white shadow-xs'
                      : 'text-[var(--mc-granite)] hover:text-[var(--mc-ink)] hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* User Profile Info & Exit Demo */}
          <div className="flex items-center gap-3">
            {currentOfficial && (
              <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[var(--mc-border-light)] text-xs shadow-xs">
                <div className="w-5 h-5 rounded-full bg-[var(--mc-ink)] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentOfficial.name.charAt(0)}
                </div>
                <span className="font-semibold text-[var(--mc-ink)] truncate max-w-[120px]">
                  {currentOfficial.name}
                </span>
              </div>
            )}

            <button
              onClick={handleExitDemo}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sign Out / Exit Demo Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Demo</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto px-6 py-2 border-t border-gray-200 gap-2 text-xs">
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-medium no-underline ${
                  isActive
                    ? 'bg-[var(--mc-ink)] text-white'
                    : 'text-[var(--mc-granite)] bg-white'
                }`}
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </header>

      {/* Main Outlet for Learner Pages */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 py-8">
        <Outlet />
      </main>

      {/* Learner Sub-Footer */}
      <footer className="border-t border-[var(--mc-border-light)] py-4 text-center text-xs text-[var(--mc-slate-gray)]">
        Ekalavya Learner Portal • Session Active ({session.mode.toUpperCase()})
      </footer>
    </div>
  );
};
