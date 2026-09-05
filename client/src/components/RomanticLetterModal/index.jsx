import { useState, useEffect } from 'react';
import { Mail, X, Heart } from 'lucide-react';
import './styles.css';

export default function RomanticLetterModal({ isOpen, onClose, userId = 'yasmina' }) {
  const [data, setData] = useState({
    recipient: 'ياسمين',
    message: 'ربنا يخليكي ليا يا ياسمين ومايحرمنيش منك ابدا يا أجمل حاجة في حياة خالد، ويارب العمر كله مع بعض في سعادة وحب ❤️',
  });
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Fetch dynamic message from backend API
  useEffect(() => {
    if (!isOpen) return;

    fetch(`/api/message/${userId}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.message) {
          setData({
            recipient: resData.recipient || 'ياسمين',
            message: resData.message,
          });
        }
      })
      .catch((err) => {
        console.warn('Using default romantic message fallback:', err);
      });
  }, [isOpen, userId]);

  // Typewriter Text Effect Logic
  useEffect(() => {
    if (!isOpen) {
      setDisplayedText('');
      setIsTypingComplete(false);
      return;
    }

    setDisplayedText('');
    setIsTypingComplete(false);

    let currentIndex = 0;
    const fullText = data.message;

    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
        setIsTypingComplete(true);
      }
    }, 55);

    return () => clearInterval(timer);
  }, [isOpen, data.message]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 letter-modal-backdrop select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
        className="relative max-w-lg w-full p-6 sm:p-10 rounded-3xl letter-modal-card text-center flex flex-col items-center justify-between space-y-6"
      >
        {/* Header Bar: Close (X) button */}
        <div className="w-full flex items-center justify-end">
          <button
            onClick={onClose}
            aria-label="إغلاق الرسالة"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-pink-300 transition-all cursor-pointer backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Centered Decorative Envelope Icon inside Glowing Neon Container */}
        <div className="envelope-hex-container w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-pink-400 my-2">
          <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-pink-300 stroke-[1.8]" />
        </div>

        {/* Recipient Name */}
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            ياسمين
          </h2>
          <div className="flex items-center justify-center gap-1 text-pink-400 text-xs font-semibold">
            <Heart className="w-4 h-4 fill-pink-500 text-pink-400" />
            <span>رسالة خاصة من خالد ❤️</span>
          </div>
        </div>

        {/* Typewriter Body Text Container with Blinking Cursor */}
        <div className="w-full min-h-[120px] p-5 sm:p-6 rounded-2xl bg-black/40 border border-pink-500/25 backdrop-blur-md flex items-center justify-center text-center">
          <p className="text-lg sm:text-2xl font-bold text-pink-100/95 leading-relaxed tracking-wide font-arabic">
            {displayedText}
            {!isTypingComplete && <span className="blinking-cursor" />}
          </p>
        </div>

        {/* Footer Close Pill Button */}
        <button
          onClick={onClose}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-base shadow-lg hover:shadow-pink-500/50 transition-all transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
        >
          إغلاق 💖
        </button>
      </div>
    </div>
  );
}
