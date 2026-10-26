import React from 'react';

interface LanggardLogoProps {
  className?: string;
  isTerminal?: boolean;
}

export const LanggardLogo: React.FC<LanggardLogoProps> = ({
  className = 'w-8 h-8',
  isTerminal = false,
}) => {
  // Unique gradient and filter IDs to prevent collisions
  const cyberDiagId = 'langgard-cyber-diag';
  const cyberRightId = 'langgard-cyber-right';
  const termDiagId = 'langgard-term-diag';
  const termRightId = 'langgard-term-right';
  const shadowId = isTerminal ? 'langgard-shadow-term' : 'langgard-shadow-cyber';

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300 ${
        isTerminal
          ? 'drop-shadow-[0_0_8px_rgba(255,117,151,0.55)]'
          : 'drop-shadow-[0_0_8px_rgba(0,240,255,0.45)]'
      }`}
      aria-label="Langgard Logo"
      role="img"
    >
      <defs>
        {/* Cyber Theme Gradients (Cyan to Indigo/Violet) */}
        <linearGradient id={cyberDiagId} x1="25%" y1="85%" x2="70%" y2="25%">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="55%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>

        <linearGradient id={cyberRightId} x1="30%" y1="30%" x2="85%" y2="85%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="45%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>

        {/* Terminal Red / Soft Pink Gradients */}
        <linearGradient id={termDiagId} x1="25%" y1="85%" x2="70%" y2="25%">
          <stop offset="0%" stopColor="#ff7597" />
          <stop offset="60%" stopColor="#ffa3b8" />
          <stop offset="100%" stopColor="#ffd1dc" />
        </linearGradient>

        <linearGradient id={termRightId} x1="30%" y1="30%" x2="85%" y2="85%">
          <stop offset="0%" stopColor="#e11d48" />
          <stop offset="50%" stopColor="#ff4d6d" />
          <stop offset="100%" stopColor="#ff7597" />
        </linearGradient>

        {/* Dynamic Soft Drop Shadow between the overlapping pillars */}
        <filter id={shadowId} x="-20%" y="-20%" width="160%" height="160%">
          <feDropShadow
            dx="2"
            dy="1.5"
            stdDeviation="2"
            floodColor="#000000"
            floodOpacity={isTerminal ? 0.7 : 0.6}
          />
        </filter>
      </defs>

      {/* Part 1 (Background layer): Right 't' / 'L' Structure */}
      <g>
        {/* Middle Crossbar */}
        <path
          d="M 48.5 52 L 64 52"
          stroke={`url(#${isTerminal ? termRightId : cyberRightId})`}
          strokeWidth="11"
          strokeLinecap="round"
        />

        {/* Vertical Stem curving into Bottom Foot */}
        <path
          d="M 48.5 35 L 48.5 61 Q 48.5 68.5 56 68.5 L 68.5 68.5"
          stroke={`url(#${isTerminal ? termRightId : cyberRightId})`}
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Part 2 (Foreground layer): Left Slanted Pillar with Soft Layer Elevation */}
      <g filter={`url(#${shadowId})`}>
        <path
          d="M 33 68.5 L 49 32"
          stroke={`url(#${isTerminal ? termDiagId : cyberDiagId})`}
          strokeWidth="11"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
