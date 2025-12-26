/**
 * Device Capability Detection Utility
 * Detects device performance tier and returns appropriate settings
 */

export const DevicePerformanceTier = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
};

/**
 * Detect device performance tier based on multiple factors
 */
export const detectDevicePerformance = () => {
  // Check for reduced motion preference first
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return DevicePerformanceTier.LOW;
  }

  let score = 0;

  // Factor 1: Hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 2;
  if (cores >= 8) score += 3;
  else if (cores >= 4) score += 2;
  else score += 1;

  // Factor 2: Device memory (if available)
  const memory = navigator.deviceMemory;
  if (memory) {
    if (memory >= 8) score += 3;
    else if (memory >= 4) score += 2;
    else score += 1;
  } else {
    score += 2; // default assumption
  }

  // Factor 3: Connection type (if available)
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === '4g') score += 2;
    else if (effectiveType === '3g') score += 1;
  } else {
    score += 1;
  }

  // Factor 4: Screen size (mobile vs desktop)
  const isMobile = window.innerWidth < 768;
  if (!isMobile) score += 2;

  // Factor 5: GPU detection via WebGL
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // Check for dedicated GPU indicators
        if (/nvidia|amd|radeon|geforce|intel iris|intel uhd 6/i.test(renderer)) {
          score += 2;
        } else {
          score += 1;
        }
      } else {
        score += 1;
      }
    }
  } catch (e) {
    score += 1;
  }

  // Determine tier based on score
  if (score >= 10) return DevicePerformanceTier.HIGH;
  if (score >= 6) return DevicePerformanceTier.MEDIUM;
  return DevicePerformanceTier.LOW;
};

/**
 * Get adaptive settings based on device performance
 */
export const getAdaptiveSettings = (tier) => {
  const settings = {
    [DevicePerformanceTier.HIGH]: {
      particleCount: 80,
      particleEmitRate: 3,
      matrixSpeed: 1,
      matrixColumns: 50,
      animationDuration: 1000,
      enableShadows: true,
      enableBlur: true,
      enableGlow: true,
      targetFPS: 60,
      useRequestAnimationFrame: true
    },
    [DevicePerformanceTier.MEDIUM]: {
      particleCount: 50,
      particleEmitRate: 2,
      matrixSpeed: 0.7,
      matrixColumns: 35,
      animationDuration: 800,
      enableShadows: true,
      enableBlur: false,
      enableGlow: true,
      targetFPS: 45,
      useRequestAnimationFrame: true
    },
    [DevicePerformanceTier.LOW]: {
      particleCount: 30,
      particleEmitRate: 1,
      matrixSpeed: 0.5,
      matrixColumns: 25,
      animationDuration: 600,
      enableShadows: false,
      enableBlur: false,
      enableGlow: false,
      targetFPS: 30,
      useRequestAnimationFrame: false
    }
  };

  return settings[tier] || settings[DevicePerformanceTier.MEDIUM];
};

/**
 * Performance monitor for FPS tracking
 */
export class PerformanceMonitor {
  constructor(targetFPS = 60) {
    this.targetFPS = targetFPS;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.fps = 60;
    this.isMonitoring = false;
  }

  start() {
    this.isMonitoring = true;
    this.monitor();
  }

  stop() {
    this.isMonitoring = false;
  }

  monitor() {
    if (!this.isMonitoring) return;

    this.frameCount++;
    const currentTime = performance.now();
    const elapsed = currentTime - this.lastTime;

    if (elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / elapsed);
      this.frameCount = 0;
      this.lastTime = currentTime;
    }

    requestAnimationFrame(() => this.monitor());
  }

  getCurrentFPS() {
    return this.fps;
  }

  isPerformanceGood() {
    return this.fps >= this.targetFPS * 0.8; // 80% of target
  }
}

/**
 * Check if browser supports GPU acceleration
 */
export const supportsGPUAcceleration = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
};

/**
 * Apply GPU acceleration CSS properties
 */
export const applyGPUAcceleration = (element) => {
  if (!element) return;
  
  element.style.transform = 'translateZ(0)';
  element.style.willChange = 'transform, opacity';
  element.style.backfaceVisibility = 'hidden';
};

/**
 * Remove GPU acceleration CSS properties
 */
export const removeGPUAcceleration = (element) => {
  if (!element) return;
  
  element.style.transform = '';
  element.style.willChange = '';
  element.style.backfaceVisibility = '';
};
