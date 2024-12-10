import { TimerState } from '@/types/timer';
import React from 'react';

interface TimerDisplayProps {
  timer: TimerState;
  label: string;
  onToggle: () => void;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timer, label, onToggle }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const milliseconds = Math.floor((seconds % 1) * 1000);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <div
      className={`flex items-center justify-center  ${timer.side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <button
        onClick={onToggle}
        className={`px-14 py-8 ${timer.side === 'left' ? 'mr-2' : 'ml-2'} w-full rounded ${timer.isRunning ? 'bg-green-500' : 'bg-blue-500'} text-white`}
      >
        {label}
      </button>
      <div className="w-24 text-center font-mono">{formatTime(timer.elapsedTime)}</div>
    </div>
  );
};
