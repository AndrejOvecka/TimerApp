'use client';

import { TimerDisplay } from '../components/TimerDisplay';
import { useTimerManager } from '../hooks/useTimerManager';

export default function Home() {
  const { timers, toggleTimer, resetAllTimers } = useTimerManager();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 space-y-8 touch-manipulation">
      <div className="w-full flex flex-col items-center space-y-2">
        <div className="flex w-full justify-between space-x-2">
          <div className="space-y-4">
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
          <div className="space-y-4">
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
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-lg active:bg-red-700 w-60"
        >
          Reset Timers
        </button>
      </div>
    </main>
  );
}
