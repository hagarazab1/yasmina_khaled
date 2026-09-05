import { useState } from 'react';
import { Heart, Sparkles, Award, RotateCcw } from 'lucide-react';
import './styles.css';

export default function LoveQuiz() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dodgedCount, setDodgedCount] = useState(0);
  const [dodgePosition, setDodgePosition] = useState({ x: 0, y: 0 });

  const handleOptionClick = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleDodgeAction = (e) => {
    if (dodgedCount < 3) {
      if (e?.type === 'click' || e?.type === 'touchstart') {
        e?.preventDefault();
        e?.stopPropagation();
      }
      const nextCount = dodgedCount + 1;
      setDodgedCount(nextCount);

      // Random dodge offset to make button playfully run away on mobile & desktop
      const x = Math.floor((Math.random() - 0.5) * 140);
      const y = Math.floor((Math.random() - 0.5) * 60);
      setDodgePosition({ x, y });
    } else if (e?.type === 'click' || (e?.type === 'touchstart' && dodgedCount >= 3)) {
      handleOptionClick(3);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setDodgedCount(0);
    setDodgePosition({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-card border border-pink-500/30 backdrop-blur-xl shadow-2xl space-y-6 text-center select-none font-arabic">
      {/* Cute Back Arrow Button at Top Right corner when an option is selected */}
      {selectedOption && (
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-pink-500/30 text-pink-300 hover:text-white border border-pink-500/30 backdrop-blur-md transition-all hover:scale-110 shadow-md group"
          title="الرجوع للأسئلة"
        >
          <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-45" />
        </button>
      )}

      <div className="flex items-center justify-center gap-2 text-pink-400 font-extrabold text-xl sm:text-2xl">
        <Sparkles className="w-6 h-6 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
        <span>سؤال مهم جداً جدا</span>
        <Sparkles className="w-6 h-6 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
      </div>

      <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
        قد إيه بتحبي خالد؟
      </h3>

      {!selectedOption ? (
        <div className="flex flex-col space-y-4 pt-2">
          <button
            onClick={() => handleOptionClick(1)}
            className="love-quiz-btn py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500/80 via-rose-500/80 to-purple-600/80 text-white font-bold text-lg sm:text-xl border border-pink-400/40 shadow-lg hover:scale-105 transition-transform"
          >
            أكتر من الدنيا كلها 🌍💖
          </button>

          <button
            onClick={() => handleOptionClick(2)}
            className="love-quiz-btn py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-500/80 via-pink-500/80 to-rose-600/80 text-white font-bold text-lg sm:text-xl border border-pink-400/40 shadow-lg hover:scale-105 transition-transform"
          >
            1000000% وأكتر كمان 🚀✨
          </button>

          {/* Playful Dodge Button matching colors with above options */}
          <button
            onMouseEnter={handleDodgeAction}
            onTouchStart={handleDodgeAction}
            onClick={handleDodgeAction}
            style={{
              transform: `translate(${dodgePosition.x}px, ${dodgePosition.y}px)`,
            }}
            className={`love-quiz-btn py-3.5 px-6 rounded-2xl text-white font-bold text-lg sm:text-xl border border-pink-400/40 shadow-lg transition-all duration-300 ${
              dodgedCount < 3
                ? 'bg-gradient-to-r from-rose-500/80 via-purple-500/80 to-pink-600/80 hover:scale-105'
                : 'bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 font-extrabold scale-105 shadow-pink-500/40 animate-pulse'
            }`}
          >
            {dodgedCount < 3 ? 'نص نص 😜' : 'بحبه جداً جداً خلاص 😂💖'}
          </button>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-black/40 border border-pink-500/40 backdrop-blur-md space-y-4 animate-fade-in">
          <div className="flex justify-center text-pink-400">
            <Award className="w-12 h-12 animate-bounce" />
          </div>
          <p className="text-xl sm:text-2xl font-black text-pink-200 leading-relaxed">
            {selectedOption === 1 && 'وأنا بجد بموت فيكي وبحبك أكتر يا روح قلبي يا أجمل ياسمين في الدنيا ❤️'}
            {selectedOption === 2 && 'خالد بيعشقك يا ياسمين ومستحيل يستغنى عنك أبداً يا كل حياتي 💖'}
            {selectedOption === 3 && 'حتى لما حاولتي تظرفي وتقولي نص نص، مفيش مفر.. خالد بيعشقك وبيموت فيكي يا أجمل ياسمين 😂💖'}
          </p>
          <div className="flex items-center justify-center gap-2 text-pink-400 pt-1 font-bold">
            <Heart className="w-6 h-6 fill-pink-500 text-pink-500 animate-pulse" />
            <span>خالد ❤️ ياسمين</span>
          </div>
        </div>
      )}
    </div>
  );
}
