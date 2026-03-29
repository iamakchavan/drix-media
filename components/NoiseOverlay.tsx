import React from 'react';

const NoiseOverlay: React.FC = () => {
  return (
    <div 
      className="pointer-events-none absolute inset-0 z-10"
      style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.0) 50%, rgba(175, 255, 0, 0.02) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
      }}
    />
  );
};

export default NoiseOverlay;