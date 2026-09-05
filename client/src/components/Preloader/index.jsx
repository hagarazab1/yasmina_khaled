import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import './styles.css';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('initial'); // 'initial' | 'secondary'
  const [burstHearts, setBurstHearts] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Transition loading text after 1.5 seconds
  useEffect(() => {
    const textTimer = setTimeout(() => {
      setLoadingText('secondary');
    }, 1500);

    return () => clearTimeout(textTimer);
  }, []);

  // Smooth progress increment up to 100% over ~3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        // Spawn a burst heart occasionally during progress
        if (Math.random() > 0.4) {
          const newHeart = {
            id: Date.now() + Math.random(),
            x: (Math.random() - 0.5) * 160,
            rotation: (Math.random() - 0.5) * 60,
            symbol: ['💖', '💕', '💗', '✨'][Math.floor(Math.random() * 4)]
          };
          setBurstHearts((current) => [...current.slice(-15), newHeart]);
        }

        const next = prev + Math.floor(Math.random() * 4) + 1;
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  // When progress reaches 100%, fade out then call onComplete
  useEffect(() => {
    let fadeTimer;
    let completeTimer;

    if (progress === 100) {
      fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
        completeTimer = setTimeout(() => {
          if (onComplete) onComplete();
        }, 600);
      }, 400);
    }

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [progress, onComplete]);

  // SVG Ring Calculations
  const radius = 64;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`relative z-10 flex flex-col items-center justify-center p-8 rounded-3xl glass-card max-w-sm w-full mx-4 preloader-card transition-all duration-700 transform ${
        isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Burst Hearts Overlay */}
      {burstHearts.map((h) => (
        <span
          key={h.id}
          className="burst-heart text-xl select-none"
          style={{
            '--tw-translate-x': `${h.x}px`,
            '--tw-rotate': `${h.rotation}deg`,
            left: '50%',
            top: '30%',
          }}
        >
          {h.symbol}
        </span>
      ))}

      {/* Glowing Neon Circular Progress Ring */}
      <div className="relative flex items-center justify-center mb-6">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          {/* Background Ring Track */}
          <circle
            stroke="rgba(255, 255, 255, 0.08)"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Glowing Pink Neon Progress Ring */}
          <circle
            stroke="#ff4b8b"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.15s ease' }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="ring-glow"
          />
        </svg>

        {/* Center Pulsating Pink Heart */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#ff4b8b]">
          <Heart className="w-10 h-10 fill-[#ff4b8b] heart-pulse" />
          <span className="text-xs font-bold mt-1 text-white/90">{progress}%</span>
        </div>
      </div>

      {/* Dynamic Arabic Loading Text */}
      <div className="text-center">
        {loadingText === 'initial' ? (
          <p className="text-lg font-semibold text-white/90 flex items-center justify-center gap-1">
            <span>جاري التحميل</span>
            <span className="inline-flex tracking-widest text-[#ff4b8b] mr-1">
              <span className="bouncing-dot">.</span>
              <span className="bouncing-dot">.</span>
              <span className="bouncing-dot">.</span>
            </span>
          </p>
        ) : (
          <p className="text-lg font-semibold text-[#ff4b8b] animate-fade-in flex items-center justify-center gap-2">
            <span>ثواني يا ياسمين معلش 😅💖</span>
          </p>
        )}
      </div>
    </div>
  );
}
