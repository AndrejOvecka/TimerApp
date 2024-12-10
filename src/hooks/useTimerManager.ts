import { useCallback, useEffect, useState } from 'react';
import { TimerState } from '../types/timer';

export const useTimerManager = (initialTimerCount: number = 6) => {
  const [timers, setTimers] = useState<TimerState[]>(
    Array.from({ length: initialTimerCount }, (_, index) => ({
      id: `timer-${index + 1}`,
      elapsedTime: 0,
      isRunning: false,
      side: index < 3 ? 'left' : 'right',
    }))
  );

  const toggleTimer = useCallback((id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
      )
    );
  }, []);

  const resetAllTimers = useCallback(() => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => ({
        ...timer,
        elapsedTime: 0,
        isRunning: false,
      }))
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) =>
          timer.isRunning ? { ...timer, elapsedTime: timer.elapsedTime + 0.01 } : timer
        )
      );
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return { timers, toggleTimer, resetAllTimers };
};
