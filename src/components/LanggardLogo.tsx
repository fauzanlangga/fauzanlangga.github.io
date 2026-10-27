import React from 'react';

interface LanggardLogoProps {
  className?: string;
  isTerminal?: boolean;
}

/**
 * Official Langgard Logo Emblem
 * Derived directly from Gemini_Generated_Image_srlf6jsrlf6jsrlf_b1e723b2.jpg
 * - Isolated emblem glyph only (no bounding square / box / dark frame)
 * - Zero clipping on all pill stroke caps and baseline
 * - Theme-reactive (Cyber Cyan/Blue/Violet vs Terminal Red/Pink glow)
 */
export const LanggardLogo: React.FC<LanggardLogoProps> = ({
  className = 'w-8 h-8',
  isTerminal = false,
}) => {
  const diagGradId = isTerminal ? 'langgard-term-diag' : 'langgard-cyber-diag';
  const stemGradId = isTerminal ? 'langgard-term-stem' : 'langgard-cyber-stem';
  const barGradId = isTerminal ? 'langgard-term-bar' : 'langgard-cyber-bar';
  const shadowId = isTerminal ? 'langgard-shadow-term' : 'langgard-shadow-cyber';

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible transition-all duration-300 ${
        isTerminal
          ? 'drop-shadow-[0_0_10px_rgba(255,117,151,0.55)]'
          : 'drop-shadow-[0_0_10px_rgba(56,189,248,0.45)]'
      }`}
      aria-label="Langgard Logo"
      role="img"
    >
      <defs>
        {/* Cyber Theme Gradients (Cyan to Sky Blue to Violet) */}
        <linearGradient id="langgard-cyber-diag" x1="80%" y1="10%" x2="15%" y2="90%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        <linearGradient id="langgard-cyber-stem" x1="45%" y1="15%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="35%" stopColor="#3b82f6" />
          <stop offset="70%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>

        <linearGradient id="langgard-cyber-bar" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        {/* Terminal Red / Soft Pink Theme Gradients */}
        <linearGradient id="langgard-term-diag" x1="80%" y1="10%" x2="15%" y2="90%">
          <stop offset="0%" stopColor="#ffd1dc" />
          <stop offset="50%" stopColor="#ffa3b8" />
          <stop offset="100%" stopColor="#ff7597" />
        </linearGradient>

        <linearGradient id="langgard-term-stem" x1="45%" y1="15%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#e11d48" />
          <stop offset="40%" stopColor="#f43f5e" />
          <stop offset="75%" stopColor="#ff4d6d" />
          <stop offset="100%" stopColor="#ff7597" />
        </linearGradient>

        <linearGradient id="langgard-term-bar" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#ff4d6d" />
        </linearGradient>

        {/* Elevation Drop Shadow between overlapping pillars */}
        <filter id={shadowId} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow
            dx="2"
            dy="1.6"
            stdDeviation="1.8"
            floodColor="#000000"
            floodOpacity={isTerminal ? 0.7 : 0.65}
          />
        </filter>
      </defs>

      {/* Layer 1 (Lower): Right 't' / 'L' Structure */}
      <g>
        {/* Horizontal Middle Crossbar */}
        <path
          d="M 48.5 55.5 L 75.5 55.5"
          stroke={`url(#${barGradId})`}
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* Vertical Stem curving into Bottom Foot */}
        <path
          d="M 48.5 19.5 L 48.5 76 Q 48.5 88.5 61 88.5 L 86.5 88.5"
          stroke={`url(#${stemGradId})`}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Layer 2 (Upper): Foreground Slanted Diagonal Pillar with Elevation Drop Shadow */}
      <g filter={`url(#${shadowId})`}>
        <path
          d="M 13.5 88.5 L 48.5 11.5"
          stroke={`url(#${diagGradId})`}
          strokeWidth="11"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
