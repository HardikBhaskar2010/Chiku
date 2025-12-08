// Vanilla JS helper that powers the Matrix-style falling letters background
// This module is imported dynamically in App to keep concerns separate.

export function createMatrixBackground(canvas, { prefersReducedMotion = false } = {}) {
  if (!canvas) return null;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const dpr = window.devicePixelRatio || 1;
  let width = canvas.clientWidth * dpr;
  let height = canvas.clientHeight * dpr;
  canvas.width = width;
  canvas.height = height;
  ctx.scale(dpr, dpr);

  const glyphs = "01{}[]<>/\\+=-*#@$&".split("");

  let columnWidth = 18;
  let columns = Math.floor(canvas.clientWidth / columnWidth);
  let drops = Array.from({ length: columns }, () => ({
    y: Math.random() * -100,
    speed: 2 + Math.random() * 3,
    intensity: 0.3 + Math.random() * 0.7,
  }));

  const backgroundColor = "rgba(1, 11, 19, 0.8)";
  let animationFrameId;
  let lastTimestamp = 0;

  const maxFps = prefersReducedMotion ? 20 : 40;
  const frameInterval = 1000 / maxFps;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width * dpr;
    height = rect.height * dpr;
    canvas.width = width;
    canvas.height = height;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    columns = Math.floor(rect.width / columnWidth);
    drops = Array.from({ length: columns }, () => ({
      y: Math.random() * -100,
      speed: 2 + Math.random() * 3,
      intensity: 0.3 + Math.random() * 0.7,
    }));
  }

  function drawFrame(timestamp) {
    if (timestamp - lastTimestamp < frameInterval) {
      animationFrameId = requestAnimationFrame(drawFrame);
      return;
    }
    lastTimestamp = timestamp;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const visibleHeight = height / dpr;

    ctx.font = "14px Fira Code, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
    ctx.textAlign = "center";

    for (let i = 0; i < drops.length; i += 1) {
      const drop = drops[i];
      const x = i * columnWidth + columnWidth / 2;
      const char = glyphs[Math.floor(Math.random() * glyphs.length)];

      const gradient = ctx.createLinearGradient(x, drop.y - 20, x, drop.y + 10);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.3, `hsla(142, 82%, 55%, ${0.15 * drop.intensity})`);
      gradient.addColorStop(1, `hsla(142, 82%, 65%, ${0.9 * drop.intensity})`);

      ctx.fillStyle = gradient;
      ctx.fillRect(x - columnWidth / 2, drop.y - 22, columnWidth, 32);

      ctx.fillStyle = `hsla(142, 82%, 75%, ${0.8 * drop.intensity})`;
      ctx.fillText(char, x, drop.y);

      drop.y += drop.speed * (prefersReducedMotion ? 0.5 : 1.1);

      if (drop.y > visibleHeight + 40) {
        drop.y = -40 - Math.random() * 120;
        drop.speed = 2 + Math.random() * 3;
        drop.intensity = 0.3 + Math.random() * 0.7;
      }
    }

    animationFrameId = requestAnimationFrame(drawFrame);
  }

  let isPaused = false;

  function handleVisibilityChange() {
    if (document.hidden) {
      if (!isPaused) {
        isPaused = true;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      }
    } else if (isPaused) {
      isPaused = false;
      lastTimestamp = performance.now();
      animationFrameId = requestAnimationFrame(drawFrame);
    }
  }

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  lastTimestamp = performance.now();
  animationFrameId = requestAnimationFrame(drawFrame);

  return {
    destroy() {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    },
  };
}
