import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, ArrowRight, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  const handleReturn = () => {
    if (session.role === 'admin') {
      navigate('/admin', { replace: true });
    } else if (session.role === 'learner') {
      navigate('/learner', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 sm:p-10 border border-[#DCE3EA] shadow-2xs">
        <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-5 border border-amber-200">
          <AlertCircle className="w-7 h-7" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] mb-2 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#52657A] mb-8">
          The route you requested does not exist or has been relocated within the competency platform.
        </p>

        <button
          onClick={handleReturn}
          className="mc-btn-primary mx-auto flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>
            {session.role === 'admin'
              ? 'Return to Admin Dashboard'
              : session.role === 'learner'
                ? 'Return to Learner Dashboard'
                : 'Return to Login'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
