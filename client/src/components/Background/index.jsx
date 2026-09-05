import { useEffect, useState } from 'react';
import './styles.css';

const HEART_SYMBOLS = ['💖', '💕', '💗', '💓', '✨', '🌸', '❤️'];

export default function Background() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate initial set of ambient floating hearts
    const initialHearts = Array.from({ length: 24 }).map((_, index) => ({
      id: index,
      symbol: HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)],
      left: `${Math.random() * 95}%`,
      size: `${Math.random() * 1.5 + 0.8}rem`,
      duration: `${Math.random() * 6 + 6}s`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.6 + 0.2
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-br from-[#0d0415] via-[#150622] to-[#1a0826]">
      {/* Semi-transparent Animated Background Layer */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {/* Glowing Ambient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full ambient-orb-1 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full ambient-orb-2 blur-3xl pointer-events-none" />
        <div className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-purple-900/20 blur-3xl pointer-events-none" />

        {/* Floating Hearts Particles */}
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute bottom-[-50px] animate-float-up pointer-events-none select-none filter drop-shadow-[0_0_8px_rgba(255,75,139,0.7)]"
            style={{
              left: heart.left,
              fontSize: heart.size,
              animationDuration: heart.duration,
              animationDelay: heart.delay,
              opacity: heart.opacity,
            }}
          >
            {heart.symbol}
          </span>
        ))}
      </div>
    </div>
  );
}
