import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Server,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  X,
  Zap,
  HelpCircle,
  Laptop
} from 'lucide-react';
import { getApiBaseUrl, setApiBaseUrl, getBackendStatus } from '../services/api';
import { toast } from 'react-toastify';

export const BackendStatusBadge: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLive, setIsLive] = useState<boolean | null>(null);
  const [latency, setLatency] = useState<number | undefined>(undefined);
  const [checking, setChecking] = useState<boolean>(false);

  const checkStatus = async () => {
    setChecking(true);
    try {
      const res = await getBackendStatus();
      setIsLive(res.ok);
      setLatency(res.latencyMs);
    } catch {
      setIsLive(false);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkStatus();
    // Ping every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        title="Click to view Backend API connection status & settings"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all shadow-xs border cursor-pointer select-none ${
          isLive === true
            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100/80'
            : isLive === false
            ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100/80'
            : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
        }`}
      >
        <span className="relative flex h-2 w-2">
          {isLive === true && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isLive === true
                ? 'bg-emerald-500'
                : isLive === false
                ? 'bg-amber-500'
                : 'bg-slate-400'
            }`}
          ></span>
        </span>
        <span className="font-semibold">
          {isLive === true
            ? `Live API ${latency ? `(${latency}ms)` : ''}`
            : isLive === false
            ? 'Offline Mode'
            : 'Connecting...'}
        </span>
      </button>

      <BackendStatusModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isLive={isLive}
        latency={latency}
        onRefresh={() => checkStatus()}
        checking={checking}
      />
    </>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLive: boolean | null;
  latency?: number;
  onRefresh: () => void;
  checking: boolean;
}

export const BackendStatusModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  isLive,
  latency,
  onRefresh,
  checking
}) => {
  const [apiUrl, setApiUrl] = useState<string>(getApiBaseUrl());
  const [testing, setTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setApiUrl(getApiBaseUrl());
      setTestResult(null);
    }
  }, [isOpen]);

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    const candidate = apiUrl.trim().replace(/\/$/, '');
    try {
      const res = await fetch(`${candidate}/health`, { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        setTestResult({ ok: true, message: `Connected successfully! (HTTP ${res.status})` });
        toast.success('Backend connection verified!');
      } else {
        setTestResult({ ok: false, message: `Received HTTP ${res.status} from ${candidate}/health` });
        toast.error(`Backend returned HTTP ${res.status}`);
      }
    } catch (err: any) {
      setTestResult({
        ok: false,
        message: err.name === 'TimeoutError'
          ? 'Request timed out. If on Render free tier, server may still be waking up (~40s).'
          : `Connection failed: ${err.message || 'Network error / CORS blocked'}`
      });
      toast.warning('Could not reach backend URL');
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    const clean = apiUrl.trim().replace(/\/$/, '');
    setApiBaseUrl(clean);
    toast.success('Backend API URL saved! Reloading application data...');
    onRefresh();
    setTimeout(() => {
      onClose();
      window.location.reload();
    }, 400);
  };

  const handlePreset = (presetUrl: string) => {
    setApiUrl(presetUrl);
    setTestResult(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-[#DCE3EA]"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Server className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Backend API Intelligence</h3>
                  <p className="text-xs text-slate-300">MoSPI Ekalavya REST Service Telemetry</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {/* Connection Status Card */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3.5 transition-colors ${
                  isLive === true
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50/70 border-amber-200 text-amber-950'
                }`}
              >
                {isLive === true ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-sm">
                    <span>
                      {isLive === true ? 'Live Cloud Backend Connected' : 'Resilient Offline Sandbox Active'}
                    </span>
                    {latency && <span className="text-xs font-mono text-emerald-700">{latency} ms</span>}
                  </div>
                  <p className="mt-1 leading-relaxed opacity-90">
                    {isLive === true
                      ? 'Real-time database records, live AI recommendations via Gemini 2.5 Flash, and Neon PostgreSQL persistence are active.'
                      : 'The remote backend server is currently unreachable or spinning up from sleep on Render free tier. Ekalavya is seamlessly using its high-fidelity offline engine so you can explore all features without interruption.'}
                  </p>
                </div>
              </div>

              {/* Endpoint Configuration */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#102A43] flex items-center justify-between">
                  <span>Backend REST API Base URL</span>
                  <span className="text-[11px] text-slate-500 font-normal">Stored in browser localStorage</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="https://ekalavya-backend.onrender.com"
                    className="flex-1 px-3.5 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800"
                  />
                  <button
                    onClick={handleTest}
                    disabled={testing}
                    type="button"
                    className="px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                    <span>{testing ? 'Testing...' : 'Test'}</span>
                  </button>
                </div>

                {/* Test Result Message */}
                {testResult && (
                  <div
                    className={`text-xs p-2.5 rounded-lg border flex items-center gap-2 ${
                      testResult.ok
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-red-50 text-red-800 border-red-200'
                    }`}
                  >
                    {testResult.ok ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span>{testResult.message}</span>
                  </div>
                )}
              </div>

              {/* Presets */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quick Presets</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handlePreset('https://ekalavya-backend.onrender.com')}
                    type="button"
                    className={`px-3 py-2 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                      apiUrl === 'https://ekalavya-backend.onrender.com'
                        ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold">
                      <Zap className="w-3 h-3 text-blue-600" />
                      <span>Render Production</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono truncate mt-0.5">
                      ekalavya-backend.onrender.com
                    </div>
                  </button>

                  <button
                    onClick={() => handlePreset('http://localhost:8000')}
                    type="button"
                    className={`px-3 py-2 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                      apiUrl === 'http://localhost:8000'
                        ? 'bg-blue-50 border-blue-400 text-blue-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold">
                      <Laptop className="w-3 h-3 text-slate-600" />
                      <span>Local Dev Server</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono truncate mt-0.5">
                      http://localhost:8000
                    </div>
                  </button>
                </div>
              </div>

              {/* Render Cold-Start Guide */}
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200/60 text-xs text-blue-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-blue-950">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Render Free Tier Cold-Start Note</span>
                </div>
                <p className="text-[11px] leading-relaxed text-blue-800">
                  Render spins down free-tier instances after 15 minutes of inactivity. When woken up, the initial spin-up takes ~30–50 seconds. Once awake, all API responses return in &lt;100ms.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={onRefresh}
                disabled={checking}
                type="button"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
                <span>Re-check Status</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  type="button"
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  type="button"
                  className="px-4 py-1.5 text-xs font-semibold bg-[#2563D9] hover:bg-[#1D4ED8] text-white rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Apply & Reload
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
