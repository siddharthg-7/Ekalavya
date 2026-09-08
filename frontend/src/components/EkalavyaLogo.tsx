import React from 'react';

interface EkalavyaLogoProps {
  variant?: 'light' | 'dark'; // 'light' = dark navy text on light bg; 'dark' = white text on dark bg
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const EkalavyaLogo: React.FC<EkalavyaLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const isDark = variant === 'dark';

  const markSizes = {
    sm: { w: 32, h: 32, className: 'w-8 h-8' },
    md: { w: 42, h: 42, className: 'w-[42px] h-[42px]' },
    lg: { w: 54, h: 54, className: 'w-[54px] h-[54px]' }
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const taglineSizes = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm'
  };

  const currentMarkSize = markSizes[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Ekalavya Brand Logo Emblem */}
      <img
        src="/images/ekalavya_logo.png"
        alt="Ekalavya Official Logo"
        width={currentMarkSize.w}
        height={currentMarkSize.h}
        className={`${currentMarkSize.className} object-contain flex-shrink-0 drop-shadow-xs`}
        loading="eager"
      />

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-['Noto_Sans',sans-serif] font-bold tracking-tight ${titleSizes[size]} ${
            isDark ? 'text-white' : 'text-[#102A43]'
          }`}
        >
          Ekalavya
        </span>
        {showTagline && (
          <span
            className={`font-['Noto_Sans',sans-serif] font-medium tracking-normal mt-1 ${taglineSizes[size]} ${
              isDark ? 'text-slate-300' : 'text-[#52657A]'
            }`}
          >
            Learn Today. Serve Better.
          </span>
        )}
      </div>
    </div>
  );
};
