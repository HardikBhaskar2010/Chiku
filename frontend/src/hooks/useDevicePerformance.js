import { useState, useEffect } from 'react';
import { 
  detectDevicePerformance, 
  getAdaptiveSettings,
  PerformanceMonitor 
} from '@/utils/deviceCapability';

/**
 * Hook to detect device performance and provide adaptive settings
 */
export const useDevicePerformance = () => {
  const [performanceTier, setPerformanceTier] = useState(null);
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect performance on mount
    const tier = detectDevicePerformance();
    const adaptiveSettings = getAdaptiveSettings(tier);
    
    setPerformanceTier(tier);
    setSettings(adaptiveSettings);
    setIsLoading(false);

    // Log for debugging
    console.log('Device Performance Tier:', tier);
    console.log('Adaptive Settings:', adaptiveSettings);
  }, []);

  return {
    performanceTier,
    settings,
    isLoading
  };
};

/**
 * Hook for FPS monitoring
 */
export const useFPSMonitor = (targetFPS = 60, enabled = true) => {
  const [fps, setFps] = useState(60);
  const [monitor] = useState(() => new PerformanceMonitor(targetFPS));

  useEffect(() => {
    if (!enabled) return;

    monitor.start();

    const interval = setInterval(() => {
      setFps(monitor.getCurrentFPS());
    }, 1000);

    return () => {
      monitor.stop();
      clearInterval(interval);
    };
  }, [monitor, enabled]);

  return {
    fps,
    isPerformanceGood: monitor.isPerformanceGood()
  };
};
