import React, { useEffect, useRef } from 'react';

const CrosshairCursor = () => {
  const vLineRef = useRef(null);
  const hLineRef = useRef(null);

  useEffect(() => {
    const moveLines = (e) => {
      // Using RequestAnimationFrame for 60fps smoothness
      requestAnimationFrame(() => {
        if (vLineRef.current && hLineRef.current) {
          // Move Vertical Line along X axis
          vLineRef.current.style.transform = `translateX(${e.clientX}px)`;
          // Move Horizontal Line along Y axis
          hLineRef.current.style.transform = `translateY(${e.clientY}px)`;
        }
      });
    };

    window.addEventListener('mousemove', moveLines);
    
    // Cleanup to prevent memory leaks
    return () => window.removeEventListener('mousemove', moveLines);
  }, []);

  return (
    <>
      {/* Vertical Line */}
      <div 
        ref={vLineRef} 
        style={{
          ...lineStyle,
          width: '1px',
          height: '100vh',
          borderLeft: '1px solid rgba(77, 105, 204)',
          mixBlendMode: 'difference' // Adjust color here
        }} 
      />
      {/* Horizontal Line */}
      <div 
        ref={hLineRef} 
        style={{
          ...lineStyle,
          width: '100vw',
          height: '1px',
          borderTop: '1px solid rgba(77, 105, 204)',
          mixBlendMode: 'difference' // Adjust color here
        }} 
      />
    </>
  );
};

// Shared Styles
const lineStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  pointerEvents: 'none', // Critical: allows clicking elements "under" the lines
  zIndex: 9999,          // Keeps lines on top of everything
  willChange: 'transform' // Optimizes performance
};

export default CrosshairCursor;