import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Award,
  AlertCircle,
  BookOpen,
  Brain,
  TrendingUp,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { EkalavyaLogo } from '../components/EkalavyaLogo';

export const LearnerLayout: React.FC = () => {
  const { currentOfficial, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Collapsible sidebar state (persisted in localStorage)
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ek_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('ek_sidebar_collapsed', String(collapsed));
    } catch {
      // ignore
    }
  }, [collapsed]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleExitDemo = () => {
    signOut();
    toast.info('Exited demo session');
    navigate('/login', { replace: true });
  };

  const navSections = [
    {
      title: 'CORE INTELLIGENCE',
      items: [
        {
          path: '/learner',
          label: 'Dashboard',
          exact: true,
          icon: LayoutDashboard,
          badge: null,
        },
        {
          path: '/learner/profile',
          label: 'Competency Profile',
          exact: false,
          icon: Award,
          badge: '33',
        },
        {
          path: '/learner/gaps',
          label: 'Skill Gap Analysis',
          exact: false,
          icon: AlertCircle,
          badge: '3 Gaps',
          badgeColor: 'bg-amber-100 text-[#E8871A]',
        },
      ],
    },
    {
      title: 'CAPACITY BUILDING',
      items: [
        {
          path: '/learner/learning',
          label: 'Personalized Learning',
          exact: false,
          icon: BookOpen,
          badge: '38',
        },
        {
          path: '/learner/assessments',
          label: 'Adaptive Diagnostics',
          exact: false,
          icon: Brain,
          badge: 'Active',
          badgeColor: 'bg-blue-100 text-[#2563D9]',
        },
        {
          path: '/learner/progress',
          label: 'Growth Trajectory',
          exact: false,
          icon: TrendingUp,
          badge: '+10 pts',
          badgeColor: 'bg-emerald-100 text-[#16845B]',
        },
      ],
    },
  ];

  // Current page title lookup for top breadcrumb
  const currentTitle = (() => {
    if (location.pathname === '/learner') return 'Competency Workspace';
    if (location.pathname.startsWith('/learner/profile')) return 'Cadre Competency Profile';
    if (location.pathname.startsWith('/learner/gaps')) return 'Skill Gap Diagnostics';
    if (location.pathname.startsWith('/learner/learning')) return 'Curriculum Catalog';
    if (location.pathname.startsWith('/learner/assessments')) return 'Adaptive Assessment Engine';
    if (location.pathname.startsWith('/learner/progress')) return 'Growth Telemetry';
    return 'Official Workspace';
  })();

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#102A43] flex flex-col font-['Noto_Sans','Inter',sans-serif]">
      {/* ═════════════════════════════════════════════════════════════════
          TOP GLOBAL HEADER (64px) — Clean, elevated, accessible
         ═════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DCE3EA] h-[64px] flex items-center px-4 sm:px-8 justify-between shrink-0 shadow-2xs">
        
        {/* LEFT: Mobile hamburger + Brand + Breadcrumb */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg text-[#52657A] hover:text-[#102A43] hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Top Header Logo on mobile / tablet */}
          <div 
            onClick={() => navigate('/learner')}
            className="flex md:hidden items-center gap-2 cursor-pointer select-none"
          >
            <EkalavyaLogo variant="light" size="sm" showTagline={false} />
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#102A43] text-[#8CCBFF] tracking-wider uppercase">
              LEARNER
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-[#52657A]">
            <span>Official Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span className="text-[#102A43] font-bold">{currentTitle}</span>
          </div>
        </div>

        {/* RIGHT: Institutional Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-medium text-[#52657A] bg-[#F7F9FC] px-3.5 py-1.5 rounded-full border border-[#DCE3EA]">
            <span className="w-2 h-2 rounded-full bg-[#2563D9]" />
            <span>Mission Karmayogi • NSSTA Framework</span>
          </div>
        </div>
      </header>

      {/* ═════════════════════════════════════════════════════════════════
          BODY: COLLAPSIBLE SIDEBAR + MAIN CONTENT WORKSPACE
         ═════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex w-full relative">
        
        {/* DESKTOP SIDEBAR */}
        <aside
          className={`hidden md:flex flex-col shrink-0 bg-white border-r border-[#DCE3EA] transition-all duration-300 sticky top-[64px] h-[calc(100vh-64px)] z-30 ${
            collapsed ? 'w-[76px]' : 'w-64'
          }`}
        >
          {/* TOP OF SIDEBAR: Logo & Toggle Button (>) Directly Below Logo */}
          <div className="p-3 border-b border-[#DCE3EA] flex flex-col gap-2.5 bg-[#FBFDFF]">
            {/* Logo */}
            <div 
              onClick={() => navigate('/learner')}
              className={`flex items-center cursor-pointer select-none ${
                collapsed ? 'justify-center' : 'justify-between px-1'
              }`}
              title="Ekalavya Official Portal"
            >
              <EkalavyaLogo variant="light" size="sm" showTagline={false} iconOnly={collapsed} />
              {!collapsed && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#102A43] text-[#8CCBFF] tracking-wider uppercase">
                  LEARNER
                </span>
              )}
            </div>

            {/* Toggle Button (>) directly below the logo */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className={`w-full py-1.5 px-2 rounded-lg bg-[#F7F9FC] hover:bg-blue-50 text-[#52657A] hover:text-[#2563D9] border border-[#DCE3EA] hover:border-blue-200 text-xs font-semibold flex items-center transition-all cursor-pointer group ${
                collapsed ? 'justify-center h-8' : 'justify-between'
              }`}
              title={collapsed ? 'Expand Sidebar (>)' : 'Collapse Sidebar (<)'}
              aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {!collapsed ? (
                <>
                  <span className="text-[11px] font-medium text-[#52657A] group-hover:text-[#2563D9]">Collapse Menu</span>
                  <div className="w-5 h-5 rounded flex items-center justify-center bg-white border border-[#DCE3EA] group-hover:border-blue-300">
                    <ChevronLeft className="w-3.5 h-3.5 text-[#52657A] group-hover:text-[#2563D9]" />
                  </div>
                </>
              ) : (
                <ChevronRight className="w-4 h-4 text-[#2563D9]" />
              )}
            </button>
          </div>

          {/* Navigation Links Scroll Container */}
          <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                {!collapsed && (
                  <div className="px-3 text-[10px] font-bold text-[#52657A] tracking-wider uppercase">
                    {section.title}
                  </div>
                )}

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = item.exact
                      ? location.pathname === item.path
                      : location.pathname.startsWith(item.path);
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.exact}
                        className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 no-underline cursor-pointer ${
                          isActive
                            ? 'bg-[#2563D9]/10 text-[#2563D9] font-bold'
                            : 'text-[#52657A] hover:text-[#102A43] hover:bg-slate-50'
                        }`}
                        title={collapsed ? item.label : undefined}
                      >
                        {/* Active Left Pill Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeSidebarIndicator"
                            className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#2563D9] rounded-r-full"
                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          />
                        )}

                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-[#2563D9]' : 'text-[#52657A] group-hover:text-[#102A43]'
                        }`} />

                        {!collapsed && (
                          <div className="flex-1 flex items-center justify-between min-w-0">
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                                item.badgeColor || 'bg-slate-100 text-[#52657A]'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer — Telemetry Status, Official Profile & Exit Demo directly in nav */}
          <div className={`border-t border-[#DCE3EA] bg-[#FBFDFF] ${collapsed ? 'p-2 flex flex-col items-center gap-3' : 'p-3.5 space-y-3'}`}>
            {/* 1. Telemetry Status */}
            {!collapsed ? (
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-[11px] font-semibold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-[#16845B] animate-pulse shrink-0" />
                <span className="truncate">Telemetry Synchronized</span>
              </div>
            ) : (
              <div 
                className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center cursor-default shadow-2xs"
                title="Telemetry Synchronized"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#16845B] animate-pulse" />
              </div>
            )}

            {/* 2. Official Profile snippet (Anjali Sharma, Deputy Director) */}
            {currentOfficial && (
              !collapsed ? (
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#DCE3EA] shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#102A43] text-[#8CCBFF] flex items-center justify-center text-xs font-bold shrink-0">
                    {currentOfficial.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#102A43] text-xs truncate leading-tight">
                      {currentOfficial.name}
                    </div>
                    <div className="text-[10px] text-[#52657A] truncate leading-tight mt-0.5">
                      {currentOfficial.designation}
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  className="w-8 h-8 rounded-full bg-[#102A43] text-[#8CCBFF] flex items-center justify-center text-xs font-bold shadow-2xs cursor-default"
                  title={`${currentOfficial.name} • ${currentOfficial.designation}`}
                >
                  {currentOfficial.name.charAt(0)}
                </div>
              )
            )}

            {/* 3. Exit Demo CTA */}
            {!collapsed ? (
              <button
                onClick={handleExitDemo}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer group"
                title="Sign Out / Exit Demo Session"
              >
                <LogOut className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Exit Demo</span>
              </button>
            ) : (
              <button
                onClick={handleExitDemo}
                className="w-8 h-8 rounded-lg bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                title="Exit Demo Session"
                aria-label="Exit Demo"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </aside>

        {/* MOBILE SLIDE-OVER DRAWER */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 md:hidden"
              />

              {/* Drawer panel */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className="fixed top-0 bottom-0 left-0 w-72 bg-white z-50 shadow-2xl flex flex-col p-6 md:hidden"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#DCE3EA]">
                  <EkalavyaLogo variant="light" size="sm" showTagline={false} />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-[#52657A] cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 py-6 space-y-6 overflow-y-auto">
                  {navSections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="px-3 text-[10px] font-bold text-[#52657A] tracking-wider uppercase">
                        {section.title}
                      </div>

                      <div className="space-y-1">
                        {section.items.map((item) => {
                          const isActive = item.exact
                            ? location.pathname === item.path
                            : location.pathname.startsWith(item.path);
                          const Icon = item.icon;

                          return (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              end={item.exact}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold no-underline ${
                                isActive
                                  ? 'bg-[#2563D9] text-white shadow-xs'
                                  : 'text-[#52657A] hover:bg-slate-100'
                              }`}
                            >
                              <Icon className="w-4 h-4 shrink-0" />
                              <span className="flex-1 truncate">{item.label}</span>
                              {item.badge && (
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#52657A]'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#DCE3EA] space-y-3">
                  {/* Telemetry Status in Drawer */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-[#16845B] animate-pulse shrink-0" />
                    <span>Telemetry Synchronized</span>
                  </div>

                  {/* Profile snippet in Drawer */}
                  {currentOfficial && (
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#F7F9FC] border border-[#DCE3EA]">
                      <div className="w-8 h-8 rounded-full bg-[#102A43] text-[#8CCBFF] flex items-center justify-center text-xs font-bold shrink-0">
                        {currentOfficial.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#102A43] text-xs truncate leading-tight">
                          {currentOfficial.name}
                        </div>
                        <div className="text-[10px] text-[#52657A] truncate leading-tight">
                          {currentOfficial.designation}
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleExitDemo}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Exit Demo Session</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN WORKSPACE VIEWPORT — Max 1440px, non-overlapping */}
        <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10 max-w-[1440px] mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {/* Global Sub-Footer */}
      <footer className="border-t border-[#DCE3EA] bg-white py-3.5 px-6 text-center text-xs text-[#52657A] shrink-0">
        Ekalavya Capacity Intelligence Portal • Mission Karmayogi & NSSTA Framework Aligned
      </footer>
    </div>
  );
};
