function Logo() {
  return (
    <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <title>Lohit Kolluri</title>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--theme-color)', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: 'var(--lightest-slate)', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g>
        {/* Letter L */}
        <rect
          x="15"
          y="15"
          width="20"
          height="70"
          fill="url(#grad1)"
          stroke="var(--theme-color)"
          strokeWidth="1.5"
        >
          <animate attributeName="y" values="15;13;15" dur="2s" repeatCount="indefinite" />
        </rect>
        <rect
          x="15"
          y="65"
          width="50"
          height="20"
          fill="url(#grad1)"
          stroke="var(--theme-color)"
          strokeWidth="1.5"
        >
          <animate attributeName="x" values="15;13;15" dur="2s" repeatCount="indefinite" />
        </rect>

        {/* Letter K */}
        <path
          d="M 65 15 L 65 55 L 45 35 L 65 15 L 85 15 L 65 55 L 85 95 L 65 95 L 65 55"
          fill="url(#grad1)"
          stroke="var(--theme-color)"
          strokeWidth="1.5"
        >
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1;1.05;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        {/* Additional Shapes */}
        <circle cx="25" cy="25" r="5" fill="var(--theme-color)">
          <animate 
            attributeName="opacity" 
            values="0.3;0.7;0.3" 
            dur="3s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="r" 
            values="4;5;4" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </circle>
        <circle cx="75" cy="75" r="5" fill="var(--theme-color)">
          <animate 
            attributeName="opacity" 
            values="0.3;0.7;0.3" 
            dur="3s" 
            repeatCount="indefinite"
            begin="0.5s" 
          />
          <animate 
            attributeName="r" 
            values="4;5;4" 
            dur="3s" 
            repeatCount="indefinite"
            begin="0.5s" 
          />
        </circle>
        <polygon points="50,10 60,30 40,30" fill="var(--theme-color-secondary)">
          <animate 
            attributeName="opacity" 
            values="0.3;0.7;0.3" 
            dur="3s" 
            repeatCount="indefinite" 
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 20"
            to="360 50 20"
            dur="8s"
            repeatCount="indefinite"
          />
        </polygon>
        <polygon points="30,90 40,70 20,70" fill="var(--theme-color-secondary)">
          <animate 
            attributeName="opacity" 
            values="0.3;0.7;0.3" 
            dur="3s" 
            repeatCount="indefinite"
            begin="0.7s" 
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 30 80"
            to="360 30 80"
            dur="8s"
            repeatCount="indefinite"
          />
        </polygon>

        {/* Glowing Effect */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="var(--theme-color)"
          strokeWidth="1"
          filter="url(#glow)"
          opacity="0.4"
        >
          <animate 
            attributeName="r" 
            values="38;42;38" 
            dur="3s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="opacity" 
            values="0.3;0.5;0.3" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </circle>
      </g>
    </svg>
  );
}

export default Logo;
