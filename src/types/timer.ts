export type TimerState = {
  id: string;
  elapsedTime: number;
  startTime?: number;
  largerTime: number;
  intervalTime: number;
  isRunning: boolean;
  side: 'left' | 'right';
};
