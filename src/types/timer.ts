export type TimerState = {
  id: string;
  elapsedTime: number;
  isRunning: boolean;
  side: 'left' | 'right';
};
