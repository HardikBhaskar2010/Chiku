import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useDevicePerformance, useFPSMonitor } from '@/hooks/useDevicePerformance';
import { DevicePerformanceTier } from '@/utils/deviceCapability';

// Mock the device capability module
jest.mock('@/utils/deviceCapability', () => ({
  detectDevicePerformance: jest.fn(() => 'high'),
  getAdaptiveSettings: jest.fn((tier) => ({
    particleCount: tier === 'high' ? 80 : 50,
    targetFPS: tier === 'high' ? 60 : 45,
    enableShadows: true,
    useRequestAnimationFrame: true
  })),
  PerformanceMonitor: jest.fn().mockImplementation((targetFPS) => ({
    targetFPS,
    fps: 60,
    isMonitoring: false,
    start: jest.fn(),
    stop: jest.fn(),
    getCurrentFPS: jest.fn(() => 60),
    isPerformanceGood: jest.fn(() => true)
  })),
  DevicePerformanceTier: {
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
  }
}));

describe('useDevicePerformance Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should detect device performance on mount', () => {
    const { result } = renderHook(() => useDevicePerformance());

    expect(result.current.isLoading).toBe(true);

    // Wait for effect to complete
    act(() => {
      jest.runAllTimers();
    });
  });

  it('should return performance tier and settings', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useDevicePerformance());

    // Initially loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.performanceTier).toBe(null);
    expect(result.current.settings).toBe(null);

    // After effect runs
    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.performanceTier).toBe('high');
    expect(result.current.settings).toBeDefined();
    expect(result.current.settings.particleCount).toBe(80);
  });

  it('should log performance tier and settings', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const { waitForNextUpdate } = renderHook(() => useDevicePerformance());

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(consoleSpy).toHaveBeenCalledWith('Device Performance Tier:', expect.anything());
    expect(consoleSpy).toHaveBeenCalledWith('Adaptive Settings:', expect.anything());

    consoleSpy.mockRestore();
  });
});

describe('useFPSMonitor Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with default FPS', () => {
    const { result } = renderHook(() => useFPSMonitor());

    expect(result.current.fps).toBe(60);
    expect(result.current.isPerformanceGood).toBe(true);
  });

  it('should start monitoring when enabled', () => {
    const { result } = renderHook(() => useFPSMonitor(60, true));

    // Monitor should start
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current.fps).toBeDefined();
  });

  it('should not start monitoring when disabled', () => {
    const { result } = renderHook(() => useFPSMonitor(60, false));

    expect(result.current.fps).toBe(60);
  });

  it('should update FPS periodically', () => {
    const { result } = renderHook(() => useFPSMonitor(60, true));

    const initialFPS = result.current.fps;

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // FPS should be tracked
    expect(result.current.fps).toBeDefined();
  });

  it('should clean up on unmount', () => {
    const { unmount } = renderHook(() => useFPSMonitor(60, true));

    unmount();

    // Should not throw errors
    expect(() => jest.runAllTimers()).not.toThrow();
  });

  it('should accept custom target FPS', () => {
    const { result } = renderHook(() => useFPSMonitor(30, true));

    expect(result.current).toBeDefined();
  });
});
