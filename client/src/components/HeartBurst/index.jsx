import { useState, useEffect } from 'react';
import './styles.css';

export default function HeartBurst() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleTap = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;

      if (!x || !y) return;

      const symbols = ['💖', '💕', '✨', '🌸', '❤️', '💘', '💗'];
      const newParticles = Array.from({ length: 6 }).map((_, i) => ({
        id: `${Date.now()}-${i}-${Math.random()}`,
        x,
        y,
        vx: (Math.random() - 0.5) * 120,
        vy: -Math.random() * 100 - 40,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        size: Math.random() * 1.2 + 0.9,
      }));

      setParticles((prev) => [...prev.slice(-30), ...newParticles]);
    };

    window.addEventListener('click', handleTap);
    window.addEventListener('touchstart', handleTap, { passive: true });

    return () => {
      window.removeEventListener('click', handleTap);
      window.removeEventListener('touchstart', handleTap);
    };
  }, []);

  // Auto clean particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - parseInt(p.id.split('-')[0], 10) < 1200));
    }, 1200);

    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="tap-heart-particle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            '--vx': `${p.vx}px`,
            '--vy': `${p.vy}px`,
            fontSize: `${p.size}rem`,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}
