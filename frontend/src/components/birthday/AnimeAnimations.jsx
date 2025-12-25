import React, { useEffect, useRef } from "react";
import anime from "animejs";

// Stagger animation for list items
export const StaggerReveal = ({ children, delay = 0, stagger = 100 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current?.children;
    if (!elements) return;

    anime({
      targets: elements,
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(stagger, { start: delay }),
      duration: 800,
      easing: "easeOutExpo",
    });
  }, [delay, stagger]);

  return (
    <div ref={containerRef} className="contents">
      {React.Children.map(children, (child) => (
        <div style={{ opacity: 0 }}>{child}</div>
      ))}
    </div>
  );
};

// Bounce animation for buttons
export const BounceButton = ({ children, onClick, className = "", ...props }) => {
  const buttonRef = useRef(null);

  const handleClick = (e) => {
    anime({
      targets: buttonRef.current,
      scale: [1, 1.2, 0.9, 1.1, 1],
      duration: 600,
      easing: "easeOutElastic(1, .5)",
    });
    onClick?.(e);
  };

  return (
    <div ref={buttonRef} className={className} onClick={handleClick} {...props}>
      {children}
    </div>
  );
};

// Pulse glow animation
export const PulseGlow = ({ children, color = "#4ade80", className = "" }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    anime({
      targets: elementRef.current,
      boxShadow: [
        `0 0 10px ${color}40, 0 0 20px ${color}20`,
        `0 0 30px ${color}60, 0 0 60px ${color}40`,
        `0 0 10px ${color}40, 0 0 20px ${color}20`,
      ],
      duration: 2000,
      easing: "easeInOutSine",
      loop: true,
    });
  }, [color]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Text reveal character by character
export const TextReveal = ({ text, className = "", delay = 0, onComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll(".anime-char");
    if (!chars) return;

    anime({
      targets: chars,
      opacity: [0, 1],
      translateY: [20, 0],
      rotateX: [-90, 0],
      delay: anime.stagger(50, { start: delay }),
      duration: 800,
      easing: "easeOutExpo",
      complete: onComplete,
    });
  }, [delay, onComplete]);

  return (
    <span ref={containerRef} className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="anime-char inline-block"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

// Floating animation
export const FloatingElement = ({ children, className = "", amplitude = 15, duration = 3000 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    anime({
      targets: elementRef.current,
      translateY: [-amplitude, amplitude],
      duration: duration,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });
  }, [amplitude, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Rotate animation
export const RotatingElement = ({ children, className = "", duration = 10000 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    anime({
      targets: elementRef.current,
      rotate: 360,
      duration: duration,
      easing: "linear",
      loop: true,
    });
  }, [duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Shake animation
export const useShakeAnimation = () => {
  const ref = useRef(null);

  const shake = () => {
    anime({
      targets: ref.current,
      translateX: [-10, 10, -10, 10, -5, 5, 0],
      duration: 500,
      easing: "easeInOutSine",
    });
  };

  return { ref, shake };
};

// Scale pop animation
export const useScalePopAnimation = () => {
  const ref = useRef(null);

  const pop = () => {
    anime({
      targets: ref.current,
      scale: [1, 1.3, 1],
      duration: 400,
      easing: "easeOutElastic(1, .5)",
    });
  };

  return { ref, pop };
};

// Ripple effect
export const RippleEffect = ({ children, className = "", color = "rgba(74, 222, 128, 0.4)" }) => {
  const containerRef = useRef(null);

  const createRipple = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.width = "0";
    ripple.style.height = "0";
    ripple.style.background = color;
    ripple.style.borderRadius = "50%";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.transform = "translate(-50%, -50%)";
    ripple.style.pointerEvents = "none";

    container.appendChild(ripple);

    anime({
      targets: ripple,
      width: [0, 300],
      height: [0, 300],
      opacity: [1, 0],
      duration: 600,
      easing: "easeOutExpo",
      complete: () => ripple.remove(),
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onClick={createRipple}
    >
      {children}
    </div>
  );
};

// Path drawing animation for SVG
export const AnimatedPath = ({ d, stroke = "#4ade80", strokeWidth = 2, duration = 1500, delay = 0 }) => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    anime({
      targets: path,
      strokeDashoffset: [length, 0],
      duration: duration,
      delay: delay,
      easing: "easeInOutQuart",
    });
  }, [duration, delay]);

  return (
    <path
      ref={pathRef}
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
    />
  );
};

// Morphing shape animation
export const MorphingShape = ({ paths, className = "", duration = 2000 }) => {
  const pathRef = useRef(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % paths.length;
      
      anime({
        targets: pathRef.current,
        d: [{ value: paths[nextIndex] }],
        duration: duration,
        easing: "easeInOutQuart",
        complete: () => setCurrentIndex(nextIndex),
      });
    }, duration + 500);

    return () => clearInterval(interval);
  }, [currentIndex, paths, duration]);

  return (
    <svg className={className} viewBox="0 0 100 100">
      <path ref={pathRef} d={paths[0]} fill="currentColor" />
    </svg>
  );
};

// Typewriter effect
export const Typewriter = ({ text, className = "", speed = 50, delay = 0, onComplete }) => {
  const [displayText, setDisplayText] = React.useState("");

  useEffect(() => {
    setDisplayText("");
    let currentIndex = 0;
    
    const startTyping = () => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(interval);
    };

    const timeout = setTimeout(startTyping, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Celebrate sequence animation
export const celebrateSequence = (onConfetti) => {
  // Create burst elements
  const colors = ["#4ade80", "#38bdf8", "#facc15", "#f87171", "#a78bfa"];
  const container = document.createElement("div");
  container.className = "fixed inset-0 pointer-events-none z-[200]";
  document.body.appendChild(container);

  // Create multiple bursts from different positions
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "10px";
    particle.style.height = "10px";
    particle.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = "50%";
    particle.style.top = "50%";
    container.appendChild(particle);

    anime({
      targets: particle,
      translateX: (Math.random() - 0.5) * window.innerWidth,
      translateY: (Math.random() - 0.5) * window.innerHeight,
      scale: [1, 0],
      opacity: [1, 0],
      rotate: Math.random() * 720,
      duration: 1500 + Math.random() * 1000,
      easing: "easeOutExpo",
      delay: Math.random() * 200,
    });
  }

  // Trigger confetti callback
  if (onConfetti) {
    setTimeout(onConfetti, 100);
    setTimeout(onConfetti, 400);
    setTimeout(onConfetti, 700);
  }

  // Clean up
  setTimeout(() => container.remove(), 3000);
};
