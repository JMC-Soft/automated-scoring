'use client';

import React, { useEffect } from 'react';

type Props = {
  max: number;
  current: number;
};

function ProgressBar({ max, current }: Props) {
  const progressRef = React.useRef<HTMLDivElement>(null);
  const percentage = Math.round((current / max) * 100);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (progressRef.current) {
        progressRef.current.style.width = `${percentage}%`;
      }
    }, 100); // Short delay before starting the animation

    return () => clearTimeout(timeout);
  }, [percentage]);

  return (
    <div
      ref={progressRef}
      style={{ width: 0 }}
      className="h-3 rounded-full bg-secondary-500/80 transition-all duration-1000 ease-out"
    />
  );
}

export default ProgressBar;
