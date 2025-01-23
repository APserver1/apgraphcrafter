import { useState, useEffect, useCallback } from 'react';
import { ChartSettings } from '../types/SettingsTypes';

export const useAnimationState = (
  dataLength: number,
  timelineSettings: ChartSettings['timeline']
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaitingLoop, setIsWaitingLoop] = useState(false);

  const handleTimelineChange = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setIsWaitingLoop(false);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying) {
      const totalSteps = (dataLength - 1) * 150; // 150 steps between each main state
      const stepDuration = (timelineSettings.duration * 1000) / totalSteps;
      const currentStep = Math.floor(currentIndex * 150);

      if (currentStep >= totalSteps) {
        if (timelineSettings.loop) {
          if (!isWaitingLoop) {
            setIsWaitingLoop(true);
            timer = setTimeout(() => {
              setCurrentIndex(0);
              setIsWaitingLoop(false);
            }, timelineSettings.loopDelayAfter * 1000);
          }
        } else {
          setIsPlaying(false);
        }
      } else if (currentIndex === 0 && isWaitingLoop) {
        timer = setTimeout(() => {
          setIsWaitingLoop(false);
        }, timelineSettings.loopDelayBefore * 1000);
      } else if (!isWaitingLoop) {
        timer = setTimeout(() => {
          setCurrentIndex(prev => prev + 1/150); // Increment by smaller steps for smoother animation
        }, stepDuration);
      }
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, dataLength, timelineSettings, isWaitingLoop]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return {
    currentIndex,
    isPlaying,
    togglePlay,
    handleTimelineChange,
  };
};