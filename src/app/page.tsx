'use client';

import { TimerDisplay } from '../components/TimerDisplay';
import { useTimerManager } from '../hooks/useTimerManager';

export default function Home() {
  const { timers, toggleTimer, resetAllTimers } = useTimerManager();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 space-y-8">
      <div className="flex space-x-8">
        <div className="space-y-2">
          {timers
            .filter((timer) => timer.side === 'left')
            .map((timer, index) => (
              <TimerDisplay
                key={timer.id}
                timer={timer}
                label={`Timer ${index + 1}`}
                onToggle={() => toggleTimer(timer.id)}
              />
            ))}
        </div>
        <div className="space-y-2">
          {timers
            .filter((timer) => timer.side === 'right')
            .map((timer, index) => (
              <TimerDisplay
                key={timer.id}
                timer={timer}
                label={`Timer ${index + 4}`}
                onToggle={() => toggleTimer(timer.id)}
              />
            ))}
        </div>
      </div>
      <button
        onClick={resetAllTimers}
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Reset All Timers
      </button>
    </main>
  );
}
