import { useCallback, useEffect, useState } from 'react';
import { TimerState } from '../types/timer';

export const useTimerManager = (initialTimerCount: number = 6) => {
  const [timers, setTimers] = useState<TimerState[]>(
    Array.from({ length: initialTimerCount }, (_, index) => ({
      id: `timer-${index + 1}`,
      elapsedTime: 0,
      largerTime: 0,
      isRunning: false,
      side: index < 3 ? 'left' : 'right',
      startTime: undefined,
      intervalTime: 0,
    }))
  );

  const toggleTimer = useCallback((id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === id) {
          if (!timer.isRunning) {
            // Start timer
            return {
              ...timer,
              isRunning: true,
              startTime: Date.now(),
              intervalTime: 0,
            };
          } else {
            // Stop timer
            const currentTime = Date.now();
            const intervalTime = (currentTime - (timer.startTime || currentTime)) / 1000;

            return {
              ...timer,
              isRunning: false,
              elapsedTime: intervalTime < 4 ? timer.elapsedTime + intervalTime : timer.elapsedTime,
              largerTime: intervalTime > 4 ? timer.largerTime + intervalTime : timer.largerTime,
              startTime: undefined,
              intervalTime: 0,
            };
          }
        }
        return timer;
      })
    );
  }, []);

  const resetAllTimers = useCallback(() => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => ({
        ...timer,
        elapsedTime: 0,
        largerTime: 0,
        isRunning: false,
        startTime: undefined,
        intervalTime: 0,
      }))
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isRunning && timer.startTime) {
            const currentIntervalTime = (Date.now() - timer.startTime) / 1000;
            return {
              ...timer,
              intervalTime: currentIntervalTime,
            };
          }
          return timer;
        })
      );
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return { timers, toggleTimer, resetAllTimers };
};
