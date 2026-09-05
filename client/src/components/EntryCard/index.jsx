import { useState } from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import PrivatePage from '../PrivatePage';
import './styles.css';

export default function EntryCard({ onUnlock }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || email.trim().toLowerCase() !== 'love') {
      setErrorMessage('الباسورد love ');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/verify-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        if (onUnlock) onUnlock();
      } else {
        setErrorMessage(data.message || 'الباسورد love ');
      }
    } catch (err) {
      console.error('API call error:', err);
      // Even on offline/fetch fallback, grant access if password is love
      if (email.trim().toLowerCase() === 'love') {
        setIsSuccess(true);
        if (onUnlock) onUnlock();
      } else {
        setErrorMessage('Unable to connect to the server, please try again later💖');
      }
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return <PrivatePage />;
  }

  return (
    <div className="relative z-10 flex flex-col items-center justify-center p-8 sm:p-10 rounded-3xl glass-card max-w-md w-full mx-4 entry-card-enter">
      {/* Profile Avatar Image inside circular border with soft glow */}
      <div className="mb-6 relative">
        {/* Floating Animated Emojis & Badges around the ring */}
        <div className="absolute -top-2 -left-2 z-20 text-lg avatar-badge-float avatar-badge-delay-1 select-none pointer-events-none filter drop-shadow-lg">
          ✨
        </div>
        <div className="absolute -top-3 -right-2 z-20 text-lg avatar-badge-float avatar-badge-delay-2 select-none pointer-events-none filter drop-shadow-lg">
          🌸
        </div>
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 text-lg avatar-badge-float avatar-badge-delay-3 select-none pointer-events-none filter drop-shadow-lg">
          💕
        </div>
        <div className="absolute -bottom-2 -left-2 z-20 text-lg avatar-badge-float avatar-badge-delay-4 select-none pointer-events-none filter drop-shadow-lg">
          🙈
        </div>

        <div className="avatar-ring-wrapper">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/20 bg-slate-900 flex items-center justify-center">
            <img
              src="/img1.jpeg"
              alt="profile picture"
              className="w-full h-full object-cover avatar-img-animated"
              onError={(e) => {
                // Fallback avatar icon if image fails to load
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Floating Animated Heart Badge */}
        <div className="absolute -bottom-1 -right-1 z-20 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-1.5 rounded-full shadow-lg avatar-badge-float border-2 border-white/40">
          <Heart className="w-3.5 h-3.5 fill-current" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-6 tracking-tight flex items-center justify-center gap-2">
        <span>جاهزة ياروحي؟🧐</span>
      </h1>

      {/* Email / Password Submission Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-purple-300/60">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" اكتبي الباسورد LOVE"
              required
              className="w-full py-3.5 pr-11 pl-4 bg-black/40 border border-white/10 rounded-full text-white placeholder-purple-300/50 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all text-sm font-medium text-right"
              dir="rtl"
            />
          </div>

          {/* Validation Error Message */}
          {errorMessage && (
            <p className="text-xs font-semibold text-pink-400 text-center animate-fade-in bg-pink-500/10 py-2 px-3 rounded-xl border border-pink-500/20">
              {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#ff4b8b] to-[#9333ea] text-white font-bold text-base shadow-lg glow-button flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span>جاري التحقق...</span>
                <Sparkles className="w-4 h-4 animate-spin" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>يلا افتحي 🙈💖</span>
              </span>
            )}
          </button>
        </form>
    </div>
  );
}
