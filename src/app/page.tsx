'use client';

import { useEffect } from 'react';
import { TimerDisplay } from '../components/TimerDisplay';
import { useTimerManager } from '../hooks/useTimerManager';

export default function Home() {
  const { timers, toggleTimer, resetAllTimers } = useTimerManager();

  useEffect(() => {
    // Detect Safari/iOS
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const lockOrientation = () => {
      // Standard browser method
      // if (screen.orientation && 'lock' in screen.orientation) {
      //   screen.orientation.lock('landscape')
      //     .catch(error => console.warn('Orientation lock failed:', error));
      // }

      // iOS/Safari specific workaround
      if (isSafari) {
        // Use meta tag to suggest landscape
        const metaTag = document.querySelector('meta[name="viewport"]');
        if (metaTag) {
          metaTag.setAttribute(
            'content',
            'width=device-width, initial-scale=1, orientation=landscape'
          );
        }
      }
    };

    // Initial lock attempt
    lockOrientation();

    // Retry on orientation change
    window.addEventListener('orientationchange', lockOrientation);

    return () => {
      window.removeEventListener('orientationchange', lockOrientation);
    };
  }, []);

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
