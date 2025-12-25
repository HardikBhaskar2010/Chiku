import { useEffect, useRef, useCallback } from "react";
import anime from "animejs";

// Custom hook for anime.js animations
export const useAnimeAnimation = (options, deps = []) => {
  const elementRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    animationRef.current = anime({
      targets: elementRef.current,
      ...options,
    });

    return () => {
      animationRef.current?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const play = useCallback(() => animationRef.current?.play(), []);
  const pause = useCallback(() => animationRef.current?.pause(), []);
  const restart = useCallback(() => animationRef.current?.restart(), []);
  const reverse = useCallback(() => animationRef.current?.reverse(), []);

  return { ref: elementRef, play, pause, restart, reverse, animation: animationRef };
};

// Hook for entrance animation
export const useEntranceAnimation = (type = "fadeUp", delay = 0) => {
  const animations = {
    fadeUp: {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 800,
      easing: "easeOutExpo",
    },
    fadeDown: {
      opacity: [0, 1],
      translateY: [-40, 0],
      duration: 800,
      easing: "easeOutExpo",
    },
    fadeLeft: {
      opacity: [0, 1],
      translateX: [40, 0],
      duration: 800,
      easing: "easeOutExpo",
    },
    fadeRight: {
      opacity: [0, 1],
      translateX: [-40, 0],
      duration: 800,
      easing: "easeOutExpo",
    },
    scaleUp: {
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 600,
      easing: "easeOutBack",
    },
    rotateIn: {
      opacity: [0, 1],
      rotate: [180, 0],
      scale: [0, 1],
      duration: 800,
      easing: "easeOutExpo",
    },
    bounceIn: {
      opacity: [0, 1],
      scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
      duration: 1000,
      easing: "easeOutElastic(1, .5)",
    },
  };

  return useAnimeAnimation(
    {
      ...animations[type],
      delay,
    },
    [type, delay]
  );
};

// Hook for hover animation
export const useHoverAnimation = () => {
  const elementRef = useRef(null);

  const onMouseEnter = useCallback(() => {
    anime({
      targets: elementRef.current,
      scale: 1.05,
      duration: 300,
      easing: "easeOutQuad",
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    anime({
      targets: elementRef.current,
      scale: 1,
      duration: 300,
      easing: "easeOutQuad",
    });
  }, []);

  return { ref: elementRef, onMouseEnter, onMouseLeave };
};

// Hook for scroll-triggered animation
export const useScrollAnimation = (options, threshold = 0.2) => {
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            anime({
              targets: element,
              ...options,
            });
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options, threshold]);

  return elementRef;
};

// Hook for continuous animation
export const useContinuousAnimation = (type = "pulse") => {
  const animations = {
    pulse: {
      scale: [1, 1.05, 1],
      duration: 2000,
      easing: "easeInOutSine",
      loop: true,
    },
    float: {
      translateY: [-10, 10],
      duration: 2000,
      direction: "alternate",
      easing: "easeInOutSine",
      loop: true,
    },
    glow: {
      boxShadow: [
        "0 0 10px rgba(74, 222, 128, 0.3)",
        "0 0 30px rgba(74, 222, 128, 0.6)",
        "0 0 10px rgba(74, 222, 128, 0.3)",
      ],
      duration: 2000,
      easing: "easeInOutSine",
      loop: true,
    },
    spin: {
      rotate: 360,
      duration: 4000,
      easing: "linear",
      loop: true,
    },
    bounce: {
      translateY: [0, -15, 0],
      duration: 1000,
      easing: "easeOutBounce",
      loop: true,
    },
  };

  return useAnimeAnimation(animations[type], [type]);
};

export default useAnimeAnimation;
