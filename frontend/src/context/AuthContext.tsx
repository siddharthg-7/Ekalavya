import { createContext, useContext, useState, useEffect } from 'react';
import { type OfficialDetail, fetchOfficialDetail, pingBackendHealth } from '../services/api';

export type UserRole = 'learner' | 'admin' | null;
export type UserMode = 'demo' | 'authenticated';

export interface SessionState {
  mode: UserMode;
  role: UserRole;
  officialId?: string;
}

export interface AuthContextType {
  session: SessionState;
  currentOfficial: OfficialDetail | null;
  loadingOfficial: boolean;
  loginAsDemoOfficial: (officialId: string) => Promise<void>;
  loginAsAdmin: () => void;
  signOut: () => void;
}

const STORAGE_KEY = 'ekalavya_session';

const LEGACY_ID_MAP: Record<string, string> = {
  'f101-anjali-sharma': 'ddbffb96-2eb5-4246-b7ed-4c5065f3ac15',
  'f102-rajesh-verma': '6f24d808-f6f7-4988-a7ff-9a6c076ed91c',
  'f103-priya-patel': '3f6a5973-22d5-4bfb-86c4-d0cd2d1cc3d0',
  'f104-suresh-kumar': 'b4f1eefd-06f0-4690-b849-4364cf989272',
  'f105-meera-nair': 'ef2aaa16-6c0d-425f-b21b-d963382bce7e',
  'f106-arvind-singh': '0fc0f4f0-e9a0-4a75-ae8e-a233abef0623',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<SessionState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.role && parsed.mode) {
          if (parsed.officialId && LEGACY_ID_MAP[parsed.officialId]) {
            parsed.officialId = LEGACY_ID_MAP[parsed.officialId];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse session from localStorage:', e);
    }
    return {
      mode: 'demo',
      role: null,
      officialId: undefined,
    };
  });

  const [currentOfficial, setCurrentOfficial] = useState<OfficialDetail | null>(null);
  const [loadingOfficial, setLoadingOfficial] = useState<boolean>(false);

  // Ping backend health to wake up cold container on startup
  useEffect(() => {
    pingBackendHealth();
  }, []);

  // Synchronize current official whenever officialId changes
  useEffect(() => {
    let isMounted = true;
    async function loadOfficial() {
      if (session.role === 'learner' && session.officialId) {
        setLoadingOfficial(true);
        try {
          const data = await fetchOfficialDetail(session.officialId);
          if (isMounted) setCurrentOfficial(data);
        } catch (e) {
          console.error('Error fetching official detail for session:', e);
        } finally {
          if (isMounted) setLoadingOfficial(false);
        }
      } else {
        if (isMounted) {
          setCurrentOfficial(null);
          setLoadingOfficial(false);
        }
      }
    }

    loadOfficial();
    return () => {
      isMounted = false;
    };
  }, [session.role, session.officialId]);

  // Persist session changes to localStorage
  useEffect(() => {
    try {
      if (session.role) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to persist session to localStorage:', e);
    }
  }, [session]);

  const loginAsDemoOfficial = async (officialId: string) => {
    setLoadingOfficial(true);
    try {
      const official = await fetchOfficialDetail(officialId);
      setCurrentOfficial(official);
    } catch (err) {
      console.error('Failed to fetch official during login:', err);
    } finally {
      setLoadingOfficial(false);
    }

    setSession({
      mode: 'demo',
      role: 'learner',
      officialId,
    });
  };

  const loginAsAdmin = () => {
    setCurrentOfficial(null);
    setSession({
      mode: 'demo',
      role: 'admin',
      officialId: undefined,
    });
  };

  const signOut = () => {
    setCurrentOfficial(null);
    setSession({
      mode: 'demo',
      role: null,
      officialId: undefined,
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        currentOfficial,
        loadingOfficial,
        loginAsDemoOfficial,
        loginAsAdmin,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
