import React from 'react';

const FlaskConicalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8.5 2h7l5 5v13.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 6 20.5V7Z" />
    <path d="M8 2v5h8" />
    <path d="M10 12h4" />
    <path d="M12 10v4" />
  </svg>
);

export default FlaskConicalIcon;