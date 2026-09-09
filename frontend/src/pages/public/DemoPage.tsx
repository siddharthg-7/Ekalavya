import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { type OfficialDetail, fetchOfficials } from '../../services/api';
import { 
  User, 
  Shield, 
  CheckCircle2, 
  ArrowRight, 
  Target,
  AlertCircle,
  BookOpen,
  Brain,
  Building2,
  BarChart3,
  Users
} from 'lucide-react';

export const DemoPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAsDemoOfficial, loginAsAdmin } = useAuth();

  const [selectedRole, setSelectedRole] = useState<'learner' | 'admin' | null>('learner');
  const [officials, setOfficials] = useState<OfficialDetail[]>([]);
  const [selectedOfficialId, setSelectedOfficialId] = useState<string>('');
  const [loadingOfficials, setLoadingOfficials] = useState(false);
  const [officialHovered, setOfficialHovered] = useState(false);
  const [adminHovered, setAdminHovered] = useState(false);

  useEffect(() => {
    async function load() {
      setLoadingOfficials(true);
      try {
        const res = await fetchOfficials();
        setOfficials(res.data);
        if (res.data.length > 0) {
          setSelectedOfficialId(res.data[0].id);
        }
      } catch (e) {
        console.error('Failed to load officials for demo:', e);
        toast.error('Could not load official profiles from backend');
      } finally {
        setLoadingOfficials(false);
      }
    }
    load();
  }, []);

  const handleRoleSelect = (role: 'learner' | 'admin') => {
    setSelectedRole(role);
    if (role === 'learner') {
      toast.info('Government Official perspective selected');
    } else {
      toast.info('Administrator perspective selected');
    }
  };

  const handleOfficialSelect = (off: OfficialDetail) => {
    setSelectedOfficialId(off.id);
    toast.success(`Selected profile: ${off.name} (${off.designation})`);
  };

  const handleContinue = async () => {
    if (selectedRole === 'admin') {
      toast.success('Entering Ekalavya Administration Workspace');
      loginAsAdmin();
      navigate('/admin', { replace: true });
    } else if (selectedRole === 'learner' && selectedOfficialId) {
      const selected = officials.find(o => o.id === selectedOfficialId);
      toast.success(`Entering Ekalavya Workspace as ${selected?.name || 'Official'}`);
      await loginAsDemoOfficial(selectedOfficialId);
      navigate('/learner', { replace: true });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12 space-y-10 px-4 sm:px-6 font-['Noto_Sans','Inter',sans-serif]">
      {/* Top Editorial Headline */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#102A43] tracking-tight leading-tight">
          Explore Ekalavya Demo
        </h1>
        <p className="text-xs sm:text-sm text-[#52657A] max-w-2xl leading-relaxed">
          Choose a perspective and explore how competency intelligence works across the Ekalavya ecosystem.
        </p>
      </div>

      {/* Asymmetric Experience Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* PANEL 1: GOVERNMENT OFFICIAL (Left ~7 cols, Asymmetric Layout) */}
        <div
          onClick={() => handleRoleSelect('learner')}
          onMouseEnter={() => setOfficialHovered(true)}
          onMouseLeave={() => setOfficialHovered(false)}
          className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
            selectedRole === 'learner'
              ? 'bg-white border-[#2563D9] shadow-md ring-2 ring-[#2563D9]/20'
              : 'bg-white hover:bg-slate-50 border-[#DCE3EA]'
          }`}
        >
          {/* Subtle architectural background lines */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" stroke="#102A43">
              <line x1="0" y1="50" x2="400" y2="50" strokeWidth="1" />
              <line x1="0" y1="150" x2="400" y2="150" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="100" y1="0" x2="100" y2="400" strokeWidth="1" />
            </svg>
          </div>

          <div className="space-y-5 relative z-10">
            {/* Role Icon & Selection Indicator */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#08233D] text-white text-xs font-bold tracking-wider uppercase">
                <User className="w-4 h-4 text-[#8CCBFF]" />
                <span>GOVERNMENT OFFICIAL</span>
              </div>
              {selectedRole === 'learner' && (
                <CheckCircle2 className="w-5 h-5 text-[#2563D9]" />
              )}
            </div>

            {/* Headline */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
                See your capability clearly.
              </h2>
              <p className="text-xs sm:text-sm text-[#52657A] mt-1.5 leading-relaxed">
                Diagnose individual skill gaps against MoSPI cadre benchmarks, access semantically mapped iGOT courses, and take adaptive assessments.
              </p>
            </div>

            {/* Connected Journey Visualizer */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#52657A] mb-3">
                Connected Competency Journey:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative">
                {/* Connecting animated line */}
                <div className={`hidden sm:block absolute top-1/2 left-4 right-4 h-0.5 bg-blue-200 -translate-y-1/2 z-0 transition-opacity ${officialHovered ? 'opacity-100' : 'opacity-40'}`} />
                
                <div className="relative z-10 p-3 rounded-xl bg-slate-50 border border-slate-200 text-center hover:bg-blue-50 transition-colors">
                  <Target className="w-4 h-4 text-[#2563D9] mx-auto mb-1" />
                  <div className="text-[11px] font-bold text-[#102A43]">Profile</div>
                </div>
                <div className="relative z-10 p-3 rounded-xl bg-slate-50 border border-slate-200 text-center hover:bg-blue-50 transition-colors">
                  <AlertCircle className="w-4 h-4 text-[#E8871A] mx-auto mb-1" />
                  <div className="text-[11px] font-bold text-[#102A43]">Skill Gap</div>
                </div>
                <div className="relative z-10 p-3 rounded-xl bg-slate-50 border border-slate-200 text-center hover:bg-blue-50 transition-colors">
                  <BookOpen className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <div className="text-[11px] font-bold text-[#102A43]">Learning Path</div>
                </div>
                <div className="relative z-10 p-3 rounded-xl bg-slate-50 border border-slate-200 text-center hover:bg-blue-50 transition-colors">
                  <Brain className="w-4 h-4 text-[#2563D9] mx-auto mb-1" />
                  <div className="text-[11px] font-bold text-[#102A43]">Assessment</div>
                </div>
              </div>
            </div>

            {/* Official Profile Selector dropdown if Learner is active */}
            {selectedRole === 'learner' && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#102A43]">Select Synthetic Profile:</span>
                  <span className="text-[#52657A]">{officials.length} Available</span>
                </div>

                {loadingOfficials ? (
                  <div className="py-4 text-center text-xs text-[#52657A]">Loading profile database...</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {officials.map(off => {
                      const isSel = off.id === selectedOfficialId;
                      return (
                        <div
                          key={off.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOfficialSelect(off);
                          }}
                          className={`p-3 rounded-xl border transition-all text-left flex items-start gap-2.5 ${
                            isSel
                              ? 'bg-blue-50 border-[#2563D9] text-[#102A43]'
                              : 'bg-white hover:bg-slate-100 border-slate-200 text-[#52657A]'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                            isSel ? 'bg-[#2563D9] text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {off.name.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold truncate text-[#102A43]">{off.name}</div>
                            <div className="text-[10px] truncate text-[#52657A]">{off.designation}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2563D9]">
            <span>Government Official Lens</span>
            <span className="flex items-center gap-1">Enter as Official <ArrowRight className="w-4 h-4" /></span>
          </div>
        </div>

        {/* PANEL 2: ADMINISTRATOR (Right ~5 cols, Asymmetric Layout) */}
        <div
          onClick={() => handleRoleSelect('admin')}
          onMouseEnter={() => setAdminHovered(true)}
          onMouseLeave={() => setAdminHovered(false)}
          className={`lg:col-span-5 p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
            selectedRole === 'admin'
              ? 'bg-[#08233D] text-white border-[#8CCBFF] shadow-md ring-2 ring-[#8CCBFF]/30'
              : 'bg-[#08233D]/95 text-white hover:bg-[#08233D] border-[#DCE3EA]/20'
          }`}
        >
          <div className="space-y-5 relative z-10">
            {/* Role Icon */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-sm border border-white/15">
                <Shield className="w-4 h-4 text-[#8CCBFF]" />
                <span>ADMINISTRATOR</span>
              </div>
              {selectedRole === 'admin' && (
                <CheckCircle2 className="w-5 h-5 text-[#8CCBFF]" />
              )}
            </div>

            {/* Headline */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                See capability at scale.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                Review directorate-wide competency heatmaps, evaluate iGOT training ROI, and project statistical skill demand across cadres.
              </p>
            </div>

            {/* Organizational Data Visualization Preview */}
            <div className="pt-2 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8CCBFF]">
                Organizational Intelligence:
              </div>
              
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-[#8CCBFF]" /> NSO SDRD Directorate</span>
                  <span className="font-mono text-[#8CCBFF] font-bold">84% Tracked</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-[#8CCBFF] h-full rounded-full" 
                    animate={{ width: adminHovered ? '84%' : '75%' }} 
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                  <span className="flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5 text-emerald-400" /> Training Effectiveness</span>
                  <span className="font-mono text-emerald-400 font-bold">+28.4% Delta</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-emerald-400 h-full rounded-full" 
                    animate={{ width: adminHovered ? '92%' : '80%' }} 
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                  <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-amber-400" /> Priority Deficit Alerts</span>
                  <span className="font-mono text-amber-400 font-bold">3 Cadres</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#8CCBFF]">
            <span>Organizational Lens</span>
            <span className="flex items-center gap-1">Enter as Administrator <ArrowRight className="w-4 h-4" /></span>
          </div>
        </div>

      </div>

      {/* Understated Bottom Navigation Action */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DCE3EA]">
        <div className="text-xs text-[#52657A] font-medium">
          Sandbox Mode &nbsp;•&nbsp; No production credentials required
        </div>
        <button
          onClick={handleContinue}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#102A43] hover:bg-[#08233D] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <span>Enter Ekalavya as {selectedRole === 'admin' ? 'Administrator' : 'Official'}</span>
          <ArrowRight className="w-4 h-4 text-[#8CCBFF]" />
        </button>
      </div>
    </div>
  );
};
