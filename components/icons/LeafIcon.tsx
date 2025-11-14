
import React from 'react';

const LeafIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M11 20A7 7 0 0 1 4 13V7a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 .586l1 1.732a1 1 0 0 0 1.732 0l1-1.732a1 1 0 0 1 1-.586H13a1 1 0 0 1 1 1v6a7 7 0 0 1-7 7z" />
    <path d="M12 21a1 1 0 0 0 1-1v-5.5a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1z" />
  </svg>
);

export default LeafIcon;
