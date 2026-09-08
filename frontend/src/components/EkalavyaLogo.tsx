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
    sm: { w: 32, h: 32, className: 'w-8 h-8', totalW: 'w-[140px]' },
    md: { w: 40, h: 40, className: 'w-10 h-10', totalW: 'w-[160px]' },
    lg: { w: 48, h: 48, className: 'w-12 h-12', totalW: 'w-[175px]' }
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const taglineSizes = {
    sm: 'text-[9.5px]',
    md: 'text-[10.5px]',
    lg: 'text-xs'
  };

  const currentMarkSize = markSizes[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${currentMarkSize.totalW} ${className}`}>
      {/* Official Ekalavya Brand Logo Emblem */}
      <img
        src="/images/ekalavya_logo.png"
        alt="Ekalavya Logo"
        width={currentMarkSize.w}
        height={currentMarkSize.h}
        className={`${currentMarkSize.className} object-contain flex-shrink-0`}
        loading="eager"
      />

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-['Noto_Sans',sans-serif] font-bold tracking-tight ${titleSizes[size]} ${
            isDark ? 'text-white' : 'text-[#102A43]'
          }`}
        >
          Ekalavya
        </span>
        {showTagline && (
          <span
            className={`font-['Noto_Sans',sans-serif] font-medium tracking-normal mt-1 whitespace-nowrap ${taglineSizes[size]} ${
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
