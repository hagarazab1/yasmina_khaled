import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import './styles.css';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Attempt autoplay when component mounts after password unlock
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log('Autoplay prevented by browser user interaction policy:', error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const currentProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * audio.duration;

    audio.currentTime = newTime;
    setProgress((newTime / audio.duration) * 100);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[420px] music-player-pill rounded-full px-4 py-2.5 flex items-center justify-between gap-3 select-none font-arabic dir-rtl">
      <audio
        ref={audioRef}
        src="/10.Khalik_Maaaya.mp3"
        autoPlay
        loop
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Left: Circular Profile Thumbnail & Title/Status */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 flex-shrink-0 bg-slate-900">
          <img
            src="/img1.jpeg"
            alt="بحبك"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1 text-white font-bold text-xs sm:text-sm tracking-tight truncate">
            <span>بحبك</span>
            <span className="text-red-500 text-xs">❤️</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-purple-200/80 font-medium pt-0.5">
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'
              }`}
            />
            <span className="truncate">
              {isPlaying ? '...تشغيل الآن' : '...متوقفة الآن'}
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Interactive Audio Progress Line */}
      <div
        className="flex-1 h-1.5 bg-white/15 rounded-full overflow-hidden cursor-pointer relative mx-1"
        onClick={handleSeek}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleSeek(e);
        }}
      >
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-150 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Right: Round Play/Pause Toggle Button */}
      <button
        onClick={togglePlay}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-pink-500/30 border border-white/15 flex items-center justify-center text-white transition-all shadow-md flex-shrink-0 cursor-pointer"
        aria-label={isPlaying ? 'إيقاف الأغنية' : 'تشغيل الأغنية'}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
        ) : (
          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white ml-0.5" />
        )}
      </button>
    </div>
  );
}
