import React, { useEffect, useState } from 'react';

const WatchModel = () => {
  const [angles, setAngles] = useState({ sec: 0, min: 0, hour: 0 });

  useEffect(() => {
    let frameId;
    const update = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const s = now.getSeconds();
      const m = now.getMinutes();
      const h = now.getHours();

      setAngles({
        sec: (s + ms / 1000) * 6,
        min: (m + s / 60) * 6,
        hour: ((h % 12) + m / 60) * 30,
      });
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="flex justify-center items-center">
      {/* WATCH CASE */}
      <div className="relative w-50 h-50 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-full border-[12px] border-slate-800 bg-slate-900 flex justify-center items-center">

        {/* 1. THE DIAL (Background) */}
        <div
          className="absolute inset-0 rounded-full bg-cover bg-center bg-no-repeat shadow-inner"
          style={{
            // Replace the path below with your actual image path
            backgroundImage: `url('Omega Dial.png')`,
            // This helps the image stay crisp
            imageRendering: 'crisp-edges'
          }}
        ></div>

        {/* 2. THE HANDS (Using SVGs for precision) */}
        <div className="relative w-full h-full">

          {/* HOUR HAND */}
          <div className="absolute inset-0 flex justify-center items-center" style={{ transform: `rotate(${angles.hour}deg)` }}>
            <svg width="15" height="150" viewBox="0 0 20 150" className="drop-shadow-2xl">
              <path d="M10 20 L14 100 L10 105 L6 100 Z" fill="#063270" />
              <path d="M10 20 L12 100 L10 102 L8 100 Z" fill="#063270" /> {/* Inset detail */}
            </svg>
          </div>

          {/* MINUTE HAND */}
          <div className="absolute inset-0 flex justify-center items-center" style={{ transform: `rotate(${angles.min}deg)` }}>
            <svg width="20" height="160" viewBox="0 0 20 240" className="drop-shadow-2xl">
              <path d="M10 20 L13 140 L10 145 L7 140 Z" fill="#063270" />
              <path d="M10 20 L11.5 140 L10 142 L8.5 140 Z" fill="#063270" />
            </svg>
          </div>

          {/* SECOND HAND (Smooth Sweep) */}
          <div className="absolute inset-0 flex justify-center items-center" style={{ transform: `rotate(${angles.sec}deg)` }}>
            <svg width="10" height="150" viewBox="0 0 10 300">
              {/* Main Needle */}
              <line x1="5" y1="150" x2="5" y2="20" stroke="#063270" strokeWidth="1.5" />
              {/* Counter-weight circle */}
              <circle cx="5" cy="150" r="3" fill="#063270" />
              {/* Tail */}
              <line x1="5" y1="150" x2="5" y2="175" stroke="#063270" strokeWidth="2" />
            </svg>
          </div>

          {/* Center Cap (The bolt holding the hands) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-400 border-2 border-zinc-600 shadow-inner z-50"></div>
        </div>

      </div>
    </div>
  );
};

export default WatchModel;