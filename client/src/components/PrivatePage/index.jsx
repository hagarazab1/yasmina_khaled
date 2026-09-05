import { useState, useEffect } from 'react';
import { Heart, Calendar, Clock, Sparkles, Lock } from 'lucide-react';
import RomanticLetterModal from '../RomanticLetterModal';
import MusicPlayer from '../MusicPlayer';
import HeartBurst from '../HeartBurst';
import LoveQuiz from '../LoveQuiz';
import './styles.css';

// Function to calculate exact calendar elapsed time since 05/09/2023 00:00:00
function calculateTimeElapsed() {
  const start = new Date(2023, 8, 5, 0, 0, 0); // September 5, 2023
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds };
}

export default function PrivatePage() {
  const [timeElapsed, setTimeElapsed] = useState(calculateTimeElapsed());
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  // Update timer live every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(calculateTimeElapsed());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleFlip = (cardId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const photos = [
    { id: 1, src: '/img2.jpeg', alt: 'photo 1', heightClass: 'h-[380px] sm:h-[450px]' },
    { id: 2, src: '/img3.jpeg', alt: 'photo 2', heightClass: 'h-[380px] sm:h-[450px]' },
    { id: 3, src: '/img4.jpeg', alt: 'photo 3', heightClass: 'h-[380px] sm:h-[450px]' },
    { id: 4, src: '/img5.jpeg', alt: 'photo 4', heightClass: 'h-[380px] sm:h-[450px]' },
    { id: 5, src: '/img6.jpeg', alt: 'photo 5', heightClass: 'h-[380px] sm:h-[450px]' },
    { id: 6, src: '/img7.jpeg', alt: 'photo 6', heightClass: 'h-[380px] sm:h-[450px]' },
    { id: 7, src: '/img8.jpeg', alt: 'photo 7', heightClass: 'h-[380px] sm:h-[450px]' },
    { id: 8, src: '/img9.jpeg', alt: 'photo 8', heightClass: 'h-[380px] sm:h-[450px]' },
    { id: 9, src: '/img10.jpeg', alt: 'photo 9', heightClass: 'h-[380px] sm:h-[450px]' },
    { id: 10, src: '/img11.jpeg', alt: 'photo 10', heightClass: 'h-[380px] sm:h-[450px]' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-transparent private-page-wrapper font-arabic text-white select-none">
      {/* Interactive Tap Heart Burst Particles */}
      <HeartBurst />

      {/* SECTION 1: Main Love Greeting (First Page with img3.jpeg) */}
      <section className="relative z-10 scroll-section min-h-screen min-h-[100dvh] h-screen h-[100dvh] p-6 sm:p-10 overflow-hidden">
        {/* Background Image img3.jpeg for First Page Only */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
          {/* Blurred filler image for widescreen side gaps on Desktop */}
          <img
            src="/img3.jpeg"
            alt="bg blur"
            className="absolute inset-0 w-full h-full object-cover filter blur-2xl brightness-40 opacity-40 hidden md:block"
          />
          {/* Main Photo: Cover on mobile, Contain on desktop so it doesn't over-zoom */}
          <img
            src="/img3.jpeg"
            alt="image"
            className="relative z-10 w-full h-full object-cover md:object-contain filter brightness-50 md:brightness-70 contrast-105 opacity-60 md:opacity-80"
          />
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        </div>
        <div className="w-full h-12" />

        {/* Center Section: 'بحبك' and 'Yasmina' */}
        <main className="my-auto flex flex-col items-center justify-center text-center px-4">
          {/* Animated Heart Icon */}
          <div className="mb-4 text-pink-500 animate-bounce">
            <Heart className="w-16 h-16 sm:w-24 sm:h-24 fill-[#ff4b8b] filter drop-shadow-[0_0_25px_rgba(255,75,139,0.9)]" />
          </div>

          {/* Word: بحبك */}
          <h1 className="text-6xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-400 to-purple-300 text-glow-pink mb-2 tracking-tight">
            بحبك
          </h1>

          {/* Name: Yasmina */}
          <h2 className="text-4xl sm:text-6xl font-extrabold text-pink-200 text-glow-mariam tracking-widest font-serif">
            Yasmina
          </h2>
        </main>

        {/* Bottom Section: 'يوم ما عرفنا بعض كان يوم ولادتي ❤️' */}
        <footer className="w-full flex flex-col items-center gap-3 pb-6">
          <div className="floating-bottom-text">
            <div className="inline-flex items-center justify-center gap-2 py-3 px-6 sm:px-8 rounded-full bg-black/50 border border-pink-500/40 backdrop-blur-md shadow-2xl">
              <p className="text-base sm:text-xl font-bold text-white tracking-wide">
                يوم ما عرفنا بعض كان يوم ولادتي ❤️
              </p>
            </div>
          </div>
        </footer>
      </section>

      {/* SECTION 2: Anniversary Date & Live Counter */}
      <section className="relative z-10 scroll-section p-6 sm:p-10 justify-between">
        <div className="w-full h-8" />
        <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-6 sm:space-y-8 my-auto">

          {/* Top Title Glass Card & Date Badge with Vertical Connecting Line (Matching Screenshot) */}
          <div className="relative flex flex-col items-center max-w-md w-full px-4">
            
            {/* Top Rounded Translucent Glass Container */}
            <div className="relative z-10 w-full py-4 px-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
                <span>اول مرة اتقابلنا</span>
                <span className="text-red-500 text-2xl sm:text-3xl animate-pulse">❤️</span>
              </h2>
            </div>

            {/* Connecting Vertical Line linking Top Card to Date Badge */}
            <div className="w-[1.5px] h-10 sm:h-12 bg-gradient-to-b from-pink-400/50 via-pink-400/80 to-purple-400/40 z-0 -my-0.5" />

            {/* Glowing Dark Date Badge Pill */}
            <div className="relative z-10 inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#120a1f] border border-pink-500/50 text-white text-base sm:text-lg font-bold backdrop-blur-md shadow-[0_0_25px_rgba(255,75,139,0.7)]">
              <Calendar className="w-5 h-5 text-pink-400" />
              <span className="tracking-wider dir-ltr">05 / 09 / 2023</span>
            </div>

          </div>

          {/* Subtitle */}
          <h3 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 tracking-tight">
            بدايه عمري معاكي
          </h3>

          {/* Translucent Glass Card containing Live Counter */}
          <div className="w-full p-6 sm:p-8 rounded-3xl glass-card border border-pink-500/30 backdrop-blur-xl shadow-2xl space-y-6">
            
            {/* Header inside Card: Clock Icon + Label */}
            <div className="flex items-center justify-center gap-2 text-pink-300 font-bold text-sm sm:text-base border-b border-white/10 pb-4">
              <Clock className="w-5 h-5 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>هيفضل شغال طول ما احنا مع بعض 💖</span>
            </div>

            {/* 6 Counter Cards / Squares Grid (Top: Year, Month, Day | Bottom: Hour, Minute, Second) */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
              {/* Year */}
              <div className="counter-box p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-4xl font-black text-pink-300 tracking-tight">
                  {timeElapsed.years}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-purple-200/80 mt-1">
                  سنة
                </span>
              </div>

              {/* Month */}
              <div className="counter-box p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-4xl font-black text-pink-300 tracking-tight">
                  {timeElapsed.months}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-purple-200/80 mt-1">
                  شهر
                </span>
              </div>

              {/* Day */}
              <div className="counter-box p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-4xl font-black text-pink-300 tracking-tight">
                  {timeElapsed.days}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-purple-200/80 mt-1">
                  يوم
                </span>
              </div>

              {/* Hour */}
              <div className="counter-box p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-4xl font-black text-pink-300 tracking-tight">
                  {String(timeElapsed.hours).padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-purple-200/80 mt-1">
                  ساعة
                </span>
              </div>

              {/* Minute */}
              <div className="counter-box p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-4xl font-black text-pink-300 tracking-tight">
                  {String(timeElapsed.minutes).padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-purple-200/80 mt-1">
                  دقيقة
                </span>
              </div>

              {/* Second */}
              <div className="counter-box p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-4xl font-black text-pink-400 animate-pulse tracking-tight">
                  {String(timeElapsed.seconds).padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-purple-200/80 mt-1">
                  ثانية
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Stop Here ("اقفي هنا شوية متجريش 😂") & 3 Vertical Pill Cards */}
      <section className="relative z-10 scroll-section p-6 sm:p-10 justify-between">
        <div className="hidden sm:block w-full h-8" />
        <div className="max-w-md w-full flex flex-col items-center text-center space-y-8 my-auto">
          
          {/* Section 3 Header matching screenshot */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
              <span>اقفي هنا شوية متجريش 😂</span>
            </h2>
          </div>

          {/* 3 Translucent Vertical Pill Cards matching reference image */}
          <div className="flex flex-col space-y-4 w-full pt-2">
            
            {/* Card 1: ♡ بحبك ♡ */}
            <div className="love-card-pill py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-pink-400 cursor-pointer">
              <Heart className="w-6 h-6 stroke-pink-400 stroke-[2] fill-none" />
              <span className="text-2xl font-bold text-white px-2">بحبك</span>
              <Heart className="w-6 h-6 stroke-pink-400 stroke-[2] fill-none" />
            </div>

            {/* Card 2: ✨ بموت فيكي ✨ */}
            <div className="love-card-pill py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-pink-400 cursor-pointer">
              <Sparkles className="w-6 h-6 text-pink-400" />
              <span className="text-2xl font-bold text-white px-2">بموت فيكي</span>
              <Sparkles className="w-6 h-6 text-pink-400" />
            </div>

            {/* Card 3: 🔒 بعشقك 🔒 */}
            <div className="love-card-pill py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-pink-400 cursor-pointer">
              <Lock className="w-6 h-6 text-pink-400 stroke-[2]" />
              <span className="text-2xl font-bold text-white px-2">بعشقك</span>
              <Lock className="w-6 h-6 text-pink-400 stroke-[2]" />
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: 3D Flip Cards ("دوسي على الكروت 😉❤️") */}
      <section className="relative z-10 scroll-section p-6 sm:p-10 justify-between">
        <div className="hidden sm:block w-full h-8" />
        <div className="max-w-md w-full flex flex-col items-center text-center space-y-6 sm:space-y-8 my-auto">
          
          {/* Section 4 Header */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
            <span>دوسي على الكروت 😉❤️</span>
          </h2>

          {/* 2x2 Grid of 3D Flip Cards */}
          <div className="grid grid-cols-2 gap-4 w-full">
            
            {/* Card 1: "محبتش" */}
            <div
              onClick={() => toggleFlip(1)}
              className="flip-card-perspective aspect-[4/5] cursor-pointer"
            >
              <div className={`flip-card-inner ${flippedCards[1] ? 'is-flipped' : ''}`}>
                {/* Front Side */}
                <div className="flip-card-front">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full circle-heart-btn flex items-center justify-center mb-4 text-pink-400">
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 stroke-pink-400 stroke-[2] fill-none" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-purple-100/90 leading-tight">
                    اول كارت اهوووو 🙋‍♀️😂
                  </span>
                </div>

                {/* Back Side (Flipped in-place) */}
                <div className="flip-card-back">
                  <Heart className="w-10 h-10 fill-[#ff4b8b] text-pink-500 mb-3 animate-pulse" />
                  <span className="text-xl sm:text-2xl font-extrabold text-pink-200 tracking-wide text-glow-pink">
                    محبتش
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: "ولا بحب" */}
            <div
              onClick={() => toggleFlip(2)}
              className="flip-card-perspective aspect-[4/5] cursor-pointer"
            >
              <div className={`flip-card-inner ${flippedCards[2] ? 'is-flipped' : ''}`}>
                {/* Front Side */}
                <div className="flip-card-front">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full circle-heart-btn flex items-center justify-center mb-4 text-pink-400">
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 stroke-pink-400 stroke-[2] fill-none" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-purple-100/90 leading-tight">
                    التاني
                  </span>
                </div>

                {/* Back Side (Flipped in-place) */}
                <div className="flip-card-back">
                  <Heart className="w-10 h-10 fill-[#ff4b8b] text-pink-500 mb-3 animate-pulse" />
                  <span className="text-xl sm:text-2xl font-extrabold text-pink-200 tracking-wide text-glow-pink">
                    ولا بحب
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: "ولا هحب حد" */}
            <div
              onClick={() => toggleFlip(3)}
              className="flip-card-perspective aspect-[4/5] cursor-pointer"
            >
              <div className={`flip-card-inner ${flippedCards[3] ? 'is-flipped' : ''}`}>
                {/* Front Side */}
                <div className="flip-card-front">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full circle-heart-btn flex items-center justify-center mb-4 text-pink-400">
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 stroke-pink-400 stroke-[2] fill-none" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-purple-100/90 leading-tight">
                    التالت
                  </span>
                </div>

                {/* Back Side (Flipped in-place) */}
                <div className="flip-card-back">
                  <Heart className="w-10 h-10 fill-[#ff4b8b] text-pink-500 mb-3 animate-pulse" />
                  <span className="text-xl sm:text-2xl font-extrabold text-pink-200 tracking-wide text-glow-pink">
                    ولا هحب حد
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: "زي ما حبيتك يا اجمل حاجة ف حياتي" */}
            <div
              onClick={() => toggleFlip(4)}
              className="flip-card-perspective aspect-[4/5] cursor-pointer"
            >
              <div className={`flip-card-inner ${flippedCards[4] ? 'is-flipped' : ''}`}>
                {/* Front Side */}
                <div className="flip-card-front">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full circle-heart-btn flex items-center justify-center mb-4 text-pink-400">
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 stroke-pink-400 stroke-[2] fill-none" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-purple-100/90 leading-tight">
                    الرابع
                  </span>
                </div>

                {/* Back Side (Flipped in-place) */}
                <div className="flip-card-back p-4">
                  <Heart className="w-10 h-10 fill-[#ff4b8b] text-pink-500 mb-3 animate-pulse" />
                  <span className="text-base sm:text-lg font-extrabold text-pink-200 leading-snug text-glow-pink">
                    زي ما حبيتك يا اجمل حاجة ف حياتي ❤️
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: Stacked Photos List ("حياتي بختصار هنا 💖") */}
      <section className="relative z-10 p-6 sm:p-10 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full flex flex-col items-center text-center space-y-8 my-10">
          
          {/* Header */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 tracking-tight flex items-center justify-center gap-2 mb-2">
            <span>حياتي بختصار هنا 💖</span>
          </h2>

          {/* Stack of Photo Cards with Consistent Balanced Spacing */}
          <div className="flex flex-col space-y-6 sm:space-y-8 w-full">
            {photos.map((item) => (
              <div
                key={item.id}
                className="photo-love-card p-5 sm:p-6 rounded-3xl flex flex-col items-center justify-center space-y-5 cursor-pointer w-full"
              >
                <div className={`w-full rounded-2xl overflow-hidden border border-pink-500/30 shadow-2xl ${item.heightClass || 'h-[380px] sm:h-[480px]'}`}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-2 text-pink-300 font-extrabold text-2xl sm:text-3xl pt-1">
                  <Heart className="w-7 h-7 fill-[#ff4b8b] text-pink-400 animate-pulse" />
                  <span>بحبك</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: Interactive Love Quiz */}
      <section className="relative z-10 scroll-section p-6 sm:p-10 justify-center">
        <div className="max-w-md w-full my-auto flex flex-col items-center justify-center text-center px-2">
          <LoveQuiz />
        </div>
      </section>

      {/* SECTION 9: Final Page - Full Width Transparent Pill Button matching previous sections */}
      <section className="relative z-10 scroll-section p-6 sm:p-10 justify-center">
        <div className="max-w-md w-full my-auto flex flex-col items-center justify-center text-center px-2">
          <button
            onClick={() => setIsLetterOpen(true)}
            className="love-card-pill w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-pink-400 cursor-pointer font-bold text-lg sm:text-xl transition-all"
          >
            <Heart className="w-6 h-6 stroke-pink-400 stroke-[2] fill-none" />
            <span className="text-white px-2">لسه مخلصتش دوسي هنا</span>
            <Heart className="w-6 h-6 stroke-pink-400 stroke-[2] fill-none" />
          </button>
        </div>
      </section>

      {/* Romantic Letter Modal */}
      <RomanticLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
        userId="Yasmina"
      />

      {/* Fixed Floating Music Player Pill matching reference screenshot */}
      <MusicPlayer />
    </div>
  );
}
