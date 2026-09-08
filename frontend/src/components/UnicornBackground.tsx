import React, { useEffect } from 'react';

declare global {
  interface Window {
    UnicornStudio?: {
      init?: () => void;
      isInitialized?: boolean;
    };
  }
}

interface UnicornBackgroundProps {
  projectId?: string;
  className?: string;
  opacityClass?: string;
}

export const UnicornBackground: React.FC<UnicornBackgroundProps> = ({
  projectId = 'WdVna2EGJHojbGLRHA52',
  className = 'absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none',
  opacityClass = 'opacity-60 mix-blend-screen',
}) => {
  useEffect(() => {
    const initUnicorn = () => {
      if (window.UnicornStudio && window.UnicornStudio.init) {
        try {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        } catch (err) {
          console.warn('UnicornStudio init warning:', err);
        }
      }
    };

    if (window.UnicornStudio && window.UnicornStudio.init) {
      initUnicorn();
      return;
    }

    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false };
    }

    if (!document.querySelector('script[data-unicorn-loader]')) {
      const s = document.createElement('script');
      s.src =
        'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.0-1/dist/unicornStudio.umd.js';
      s.setAttribute('data-unicorn-loader', 'true');
      s.onload = () => {
        initUnicorn();
      };
      (document.head || document.body).appendChild(s);
    } else {
      initUnicorn();
    }
  }, [projectId]);

  return (
    <div className={className}>
      <div className={`absolute inset-0 w-full h-full ${opacityClass}`}>
        <div
          data-us-project={projectId}
          data-us-dpi="1.5"
          data-us-fps="60"
          data-us-lazyload="true"
          data-us-production="true"
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
};
