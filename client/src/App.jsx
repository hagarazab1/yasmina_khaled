import { useState } from 'react';
import Background from './components/Background';
import Preloader from './components/Preloader';
import EntryCard from './components/EntryCard';

export default function App() {
  const [phase, setPhase] = useState('preloader'); // 'preloader' | 'main'

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center select-none">
      {/* Dynamic Background with Glowing Orbs & Floating Hearts */}
      <Background />

      {/* Main Content View Switcher */}
      {phase === 'preloader' ? (
        <Preloader onComplete={() => setPhase('main')} />
      ) : (
        <EntryCard />
      )}
    </main>
  );
}
