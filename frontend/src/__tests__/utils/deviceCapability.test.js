import {
  detectDevicePerformance,
  getAdaptiveSettings,
  DevicePerformanceTier,
  PerformanceMonitor,
  supportsGPUAcceleration,
  applyGPUAcceleration,
  removeGPUAcceleration
} from '@/utils/deviceCapability';

describe('Device Capability Utils', () => {
  describe('detectDevicePerformance', () => {
    beforeEach(() => {
      // Mock matchMedia
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
    });

    it('should return LOW tier for reduced motion preference', () => {
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
      }));

      const tier = detectDevicePerformance();
      expect(tier).toBe(DevicePerformanceTier.LOW);
    });

    it('should detect performance tier based on hardware', () => {
      // Mock high-end device
      Object.defineProperty(navigator, 'hardwareConcurrency', {
        writable: true,
        value: 8
      });
      Object.defineProperty(navigator, 'deviceMemory', {
        writable: true,
        value: 8
      });

      const tier = detectDevicePerformance();
      expect([DevicePerformanceTier.HIGH, DevicePerformanceTier.MEDIUM]).toContain(tier);
    });

    it('should handle missing navigator properties', () => {
      const tier = detectDevicePerformance();
      expect(Object.values(DevicePerformanceTier)).toContain(tier);
    });
  });

  describe('getAdaptiveSettings', () => {
    it('should return HIGH settings for HIGH tier', () => {
      const settings = getAdaptiveSettings(DevicePerformanceTier.HIGH);
      
      expect(settings.particleCount).toBe(80);
      expect(settings.targetFPS).toBe(60);
      expect(settings.enableShadows).toBe(true);
      expect(settings.enableGlow).toBe(true);
    });

    it('should return MEDIUM settings for MEDIUM tier', () => {
      const settings = getAdaptiveSettings(DevicePerformanceTier.MEDIUM);
      
      expect(settings.particleCount).toBe(50);
      expect(settings.targetFPS).toBe(45);
      expect(settings.enableShadows).toBe(true);
      expect(settings.enableBlur).toBe(false);
    });

    it('should return LOW settings for LOW tier', () => {
      const settings = getAdaptiveSettings(DevicePerformanceTier.LOW);
      
      expect(settings.particleCount).toBe(30);
      expect(settings.targetFPS).toBe(30);
      expect(settings.enableShadows).toBe(false);
      expect(settings.enableGlow).toBe(false);
    });

    it('should return MEDIUM settings for unknown tier', () => {
      const settings = getAdaptiveSettings('unknown');
      
      expect(settings.particleCount).toBe(50);
      expect(settings.targetFPS).toBe(45);
    });
  });

  describe('PerformanceMonitor', () => {
    it('should initialize with target FPS', () => {
      const monitor = new PerformanceMonitor(60);
      
      expect(monitor.targetFPS).toBe(60);
      expect(monitor.fps).toBe(60);
      expect(monitor.isMonitoring).toBe(false);
    });

    it('should start and stop monitoring', () => {
      const monitor = new PerformanceMonitor(60);
      
      monitor.start();
      expect(monitor.isMonitoring).toBe(true);
      
      monitor.stop();
      expect(monitor.isMonitoring).toBe(false);
    });

    it('should return current FPS', () => {
      const monitor = new PerformanceMonitor(60);
      
      const fps = monitor.getCurrentFPS();
      expect(typeof fps).toBe('number');
      expect(fps).toBeGreaterThanOrEqual(0);
    });

    it('should check if performance is good', () => {
      const monitor = new PerformanceMonitor(60);
      monitor.fps = 55;
      
      expect(monitor.isPerformanceGood()).toBe(true);
      
      monitor.fps = 40;
      expect(monitor.isPerformanceGood()).toBe(false);
    });
  });

  describe('supportsGPUAcceleration', () => {
    it('should return boolean', () => {
      const result = supportsGPUAcceleration();
      expect(typeof result).toBe('boolean');
    });

    it('should return true if WebGL is available', () => {
      // Mock canvas context
      HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({});
      
      const result = supportsGPUAcceleration();
      expect(result).toBe(true);
    });

    it('should return false if WebGL is not available', () => {
      HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(null);
      
      const result = supportsGPUAcceleration();
      expect(result).toBe(false);
    });
  });

  describe('applyGPUAcceleration', () => {
    it('should apply GPU acceleration styles', () => {
      const element = document.createElement('div');
      
      applyGPUAcceleration(element);
      
      expect(element.style.transform).toBe('translateZ(0)');
      expect(element.style.willChange).toBe('transform, opacity');
      expect(element.style.backfaceVisibility).toBe('hidden');
    });

    it('should handle null element', () => {
      expect(() => applyGPUAcceleration(null)).not.toThrow();
    });
  });

  describe('removeGPUAcceleration', () => {
    it('should remove GPU acceleration styles', () => {
      const element = document.createElement('div');
      element.style.transform = 'translateZ(0)';
      element.style.willChange = 'transform, opacity';
      element.style.backfaceVisibility = 'hidden';
      
      removeGPUAcceleration(element);
      
      expect(element.style.transform).toBe('');
      expect(element.style.willChange).toBe('');
      expect(element.style.backfaceVisibility).toBe('');
    });

    it('should handle null element', () => {
      expect(() => removeGPUAcceleration(null)).not.toThrow();
    });
  });
});
