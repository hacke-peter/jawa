import React from 'react';

interface ScoreDonutProps {
  /** Score between 0 and 10 */
  score: number;
  /** Diameter of the SVG in pixels */
  size?: number;
  /** Thickness of the donut ring */
  thickness?: number;
}

const ScoreDonut: React.FC<ScoreDonutProps> = ({
  score,
  size = 64,
  thickness = 6,
}) => {
  // clamp score to [0–10]
  const clamped = Math.max(0, Math.min(10, score));
  // radius = (outer diameter – stroke width) / 2
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  // how much of the circle remains “unfilled”
  const dashOffset = circumference * (1 - clamped / 10);

  // pick color: green if ≥7, amber if ≥4, red otherwise
  const strokeColor =
    clamped >= 7
      ? '#10B981' // tailwind green-500
      : clamped >= 4
      ? '#F59E0B' // tailwind amber-500
      : '#EF4444'; // tailwind red-500

  return (
    <svg
      width={size}
      height={size}
      className="mx-auto transition delay-150 duration-300"
      style={{ cursor: 'pointer' }}
    >
      {/* background track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#E5E7EB" // tailwind gray-200
        strokeWidth={thickness}
        fill="none"
      />
      {/* foreground arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={strokeColor}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
      />
      {/* centered text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="0.35em"
        fontSize={size * 0.35}
        fontWeight="600"
        fill="#111827" // tailwind gray-900
      >
        {clamped}
      </text>
    </svg>
  );
};

export default ScoreDonut;
