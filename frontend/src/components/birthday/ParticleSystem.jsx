import React, { useEffect, useCallback, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

let engineInitialized = false;

export const ParticleSystem = ({ type = "confetti", isActive = true, adaptiveCount }) => {
  const [init, setInit] = React.useState(false);
  const { performanceTier, settings: perfSettings } = useDevicePerformance();
  
  // Adaptive particle count based on device performance
  const particleMultiplier = useMemo(() => {
    if (adaptiveCount && perfSettings) {
      return perfSettings.particleCount / 80; // 80 is the default high-end count
    }
    return 1;
  }, [adaptiveCount, perfSettings]);

  useEffect(() => {
    if (!engineInitialized) {
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        engineInitialized = true;
        setInit(true);
      });
    } else {
      setInit(true);
    }
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // Optimize rendering
    if (container && perfSettings?.useRequestAnimationFrame) {
      console.log("Particles loaded with GPU acceleration");
    }
  }, [perfSettings]);

  const confettiOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 100 },
      fpsLimit: perfSettings?.targetFPS || 60,
      particles: {
        number: { value: 0 },
        color: {
          value: ["#4ade80", "#38bdf8", "#facc15", "#f87171", "#a78bfa"],
        },
        shape: {
          type: ["circle", "square"],
        },
        opacity: {
          value: { min: 0.6, max: 1 },
          animation: {
            enable: true,
            speed: 0.5,
            startValue: "max",
            destroy: "min",
          },
        },
        size: {
          value: { min: 4, max: 10 },
        },
        move: {
          enable: true,
          gravity: {
            enable: true,
            acceleration: 5,
          },
          speed: { min: 15, max: 25 },
          decay: 0.05,
          direction: "none",
          outModes: {
            default: "destroy",
            top: "none",
          },
        },
        rotate: {
          value: { min: 0, max: 360 },
          direction: "random",
          animation: {
            enable: true,
            speed: 60,
          },
        },
        tilt: {
          direction: "random",
          enable: true,
          value: { min: 0, max: 360 },
          animation: {
            enable: true,
            speed: 60,
          },
        },
        roll: {
          darken: { enable: true, value: 25 },
          enable: true,
          speed: { min: 15, max: 25 },
        },
        wobble: {
          distance: 30,
          enable: true,
          speed: { min: -15, max: 15 },
        },
      },
      emitters: [
        {
          direction: "top-right",
          position: { x: 0, y: 100 },
          rate: { delay: 0.1, quantity: Math.ceil(3 * particleMultiplier) },
          life: { duration: 0.1, count: 1 },
        },
        {
          direction: "top-left",
          position: { x: 100, y: 100 },
          rate: { delay: 0.1, quantity: Math.ceil(3 * particleMultiplier) },
          life: { duration: 0.1, count: 1 },
        },
      ],
    }),
    [particleMultiplier, perfSettings]
  );

  const sparklesOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: perfSettings?.targetFPS || 60,
      particles: {
        number: { value: Math.ceil(50 * particleMultiplier), density: { enable: true, area: 800 } },
        color: { value: ["#4ade80", "#38bdf8", "#facc15", "#ffffff"] },
        shape: { type: "star" },
        opacity: {
          value: { min: 0.3, max: 1 },
          animation: {
            enable: true,
            speed: 1,
            startValue: "random",
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: 3,
            startValue: "random",
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: true,
          outModes: { default: "out" },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 1,
          },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "bubble" },
        },
        modes: {
          bubble: { distance: 100, size: 6, opacity: 1 },
        },
      },
    }),
    [particleMultiplier, perfSettings]
  );

  const fireworksOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 100 },
      fpsLimit: perfSettings?.targetFPS || 60,
      particles: {
        number: { value: 0 },
        color: {
          value: ["#4ade80", "#38bdf8", "#facc15", "#f87171", "#a78bfa", "#fb923c"],
        },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.1, max: 1 },
          animation: {
            enable: true,
            speed: 0.7,
            startValue: "max",
            destroy: "min",
          },
        },
        size: {
          value: { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: 5,
            startValue: "max",
            destroy: "min",
          },
        },
        move: {
          enable: true,
          gravity: { enable: true, acceleration: 15, inverse: false },
          speed: { min: 10, max: 25 },
          decay: 0.1,
          outModes: "destroy",
        },
        life: { count: 1, duration: { value: { min: 1, max: 2 } } },
      },
      emitters: {
        direction: "top",
        life: { count: 0, duration: 0.1, delay: 0.1 },
        rate: { delay: 0.15, quantity: Math.ceil(1 * particleMultiplier) },
        size: { width: 100, height: 0 },
        position: { y: 100, x: 50 },
      },
    }),
    [particleMultiplier, perfSettings]
  );

  const options = type === "confetti" ? confettiOptions : type === "fireworks" ? fireworksOptions : sparklesOptions;

  if (!init || !isActive) return null;

  return (
    <Particles
      id={`tsparticles-${type}`}
      particlesLoaded={particlesLoaded}
      options={options}
      className={type === "sparkles" ? "absolute inset-0 pointer-events-none" : ""}
    />
  );
};

export const ConfettiBurst = ({ trigger }) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return show ? <ParticleSystem type="confetti" isActive={show} /> : null;
};

export const FireworksBurst = ({ trigger }) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return show ? <ParticleSystem type="fireworks" isActive={show} /> : null;
};
