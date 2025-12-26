import React, { useState, useEffect, useRef } from "react";

// Enhanced realistic 3D-style birthday cake with 16 candles
export const EnhancedCakeComponent = ({ onCakeTap, isVisible, onAnimationComplete }) => {
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showTapMe, setShowTapMe] = useState(false);
  const cakeRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      // Show "Tap Me" label after cake animation completes
      const timer = setTimeout(() => {
        setShowTapMe(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsBlownOut(false);
      setShowMessage(false);
      setShowTapMe(false);
    }
  }, [isVisible]);

  useEffect(() => {
    // Apply GPU acceleration
    if (cakeRef.current && isVisible) {
      cakeRef.current.style.transform = 'translateZ(0)';
      cakeRef.current.style.willChange = 'transform, opacity';
    }
  }, [isVisible]);

  const handleCakeTap = () => {
    if (isBlownOut) return;
    
    setIsBlownOut(true);
    setShowTapMe(false);
    
    // Show birthday message after blow animation
    setTimeout(() => {
      setShowMessage(true);
      if (onCakeTap) onCakeTap();
    }, 600);

    // Hide everything after celebration
    setTimeout(() => {
      setShowMessage(false);
      if (onAnimationComplete) onAnimationComplete();
    }, 4000);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Cake Container */}
      <div
        ref={cakeRef}
        className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ perspective: '1000px' }}
      >
        {/* Tap Me Label */}
        {showTapMe && !isBlownOut && (
          <div
            className="absolute top-[25%] left-1/2 -translate-x-1/2 pointer-events-none animate-bounce z-10"
            style={{
              animation: 'bounce 1s infinite'
            }}
          >
            <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-bold shadow-glow-primary border-2 border-primary/50">
              👆 Tap the Cake!
            </div>
          </div>
        )}

        {/* Enhanced 3D Cake */}
        <button
          onClick={handleCakeTap}
          disabled={isBlownOut}
          data-testid="birthday-cake"
          className={`pointer-events-auto transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 scale-100' : 'translate-y-full scale-90'
          } ${isBlownOut ? 'cursor-default' : 'cursor-pointer hover:scale-105 active:scale-95'}`}
          style={{
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="relative" style={{ filter: 'drop-shadow(0 40px 80px rgba(0, 0, 0, 0.6))' }}>
            {/* Enhanced Cake SVG with 3D effects */}
            <svg
              width="320"
              height="380"
              viewBox="0 0 320 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform-gpu"
            >
              {/* Glow effect for candles */}
              <defs>
                <filter id="candle-glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="soft-shadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                  <feOffset dx="0" dy="6" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="cake-gradient-bottom" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FCA5A5" />
                  <stop offset="50%" stopColor="#F87171" />
                  <stop offset="100%" stopColor="#DC2626" />
                </linearGradient>
                <linearGradient id="cake-gradient-middle" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FBBF24" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="cake-gradient-top" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C084FC" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
                <radialGradient id="flame-gradient">
                  <stop offset="0%" stopColor="#FFF" stopOpacity="1"/>
                  <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.9"/>
                  <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0"/>
                </radialGradient>
              </defs>

              {/* Plate with shadow */}
              <ellipse cx="160" cy="350" rx="150" ry="22" fill="#E5E7EB" opacity="0.9" filter="url(#soft-shadow)" />
              <ellipse cx="160" cy="348" rx="145" ry="18" fill="#D1D5DB" opacity="0.7" />
              
              {/* Bottom Tier - Enhanced 3D look */}
              <g filter="url(#soft-shadow)">
                {/* Dark side for depth */}
                <path d="M 250 270 L 250 330 Q 250 335 245 335 L 75 335 Q 70 335 70 330 L 70 270 Z" fill="#DC2626" opacity="0.7" />
                {/* Main tier */}
                <rect x="70" y="270" width="180" height="65" rx="8" fill="url(#cake-gradient-bottom)" />
                {/* Frosting top */}
                <rect x="70" y="270" width="180" height="12" rx="8" fill="#FEE2E2" opacity="0.9" />
                {/* Frosting drips */}
                <path d="M 80 280 Q 85 290 90 280" fill="#FEE2E2" opacity="0.8" />
                <path d="M 120 280 Q 125 292 130 280" fill="#FEE2E2" opacity="0.8" />
                <path d="M 160 280 Q 165 295 170 280" fill="#FEE2E2" opacity="0.8" />
                <path d="M 200 280 Q 205 290 210 280" fill="#FEE2E2" opacity="0.8" />
                <path d="M 230 280 Q 235 293 240 280" fill="#FEE2E2" opacity="0.8" />
                {/* Decorative swirls */}
                <path d="M 80 295 Q 120 305 160 295 Q 200 285 240 295" stroke="#F87171" strokeWidth="2.5" fill="none" opacity="0.8" />
                <path d="M 80 315 Q 120 325 160 315 Q 200 305 240 315" stroke="#F87171" strokeWidth="2.5" fill="none" opacity="0.8" />
              </g>
              
              {/* Middle Tier - Enhanced 3D look */}
              <g filter="url(#soft-shadow)">
                {/* Dark side for depth */}
                <path d="M 215 210 L 215 260 Q 215 265 210 265 L 110 265 Q 105 265 105 260 L 105 210 Z" fill="#D97706" opacity="0.7" />
                {/* Main tier */}
                <rect x="105" y="210" width="110" height="55" rx="8" fill="url(#cake-gradient-middle)" />
                {/* Frosting top */}
                <rect x="105" y="210" width="110" height="10" rx="8" fill="#FEF3C7" opacity="0.9" />
                {/* Frosting drips */}
                <path d="M 115 218 Q 118 226 122 218" fill="#FEF3C7" opacity="0.8" />
                <path d="M 145 218 Q 148 228 152 218" fill="#FEF3C7" opacity="0.8" />
                <path d="M 175 218 Q 178 226 182 218" fill="#FEF3C7" opacity="0.8" />
                <path d="M 200 218 Q 203 227 207 218" fill="#FEF3C7" opacity="0.8" />
                {/* Decorative swirls */}
                <path d="M 115 230 Q 145 238 175 230 Q 190 225 205 230" stroke="#F59E0B" strokeWidth="2" fill="none" opacity="0.8" />
                <path d="M 115 245 Q 145 253 175 245 Q 190 240 205 245" stroke="#F59E0B" strokeWidth="2" fill="none" opacity="0.8" />
              </g>
              
              {/* Top Tier - Enhanced 3D look */}
              <g filter="url(#soft-shadow)">
                {/* Dark side for depth */}
                <path d="M 190 160 L 190 200 Q 190 205 185 205 L 135 205 Q 130 205 130 200 L 130 160 Z" fill="#9333EA" opacity="0.7" />
                {/* Main tier */}
                <rect x="130" y="160" width="60" height="45" rx="8" fill="url(#cake-gradient-top)" />
                {/* Frosting top */}
                <rect x="130" y="160" width="60" height="9" rx="8" fill="#F3E8FF" opacity="0.9" />
                {/* Frosting drips */}
                <path d="M 140 167 Q 142 173 145 167" fill="#F3E8FF" opacity="0.8" />
                <path d="M 160 167 Q 162 175 165 167" fill="#F3E8FF" opacity="0.8" />
                <path d="M 175 167 Q 177 173 180 167" fill="#F3E8FF" opacity="0.8" />
                {/* Decorative swirls */}
                <path d="M 140 180 Q 160 186 180 180" stroke="#A855F7" strokeWidth="1.8" fill="none" opacity="0.8" />
              </g>

              {/* Decorative sugar pearls */}
              <circle cx="85" cy="305" r="6" fill="#FEF3C7" opacity="0.9" />
              <circle cx="235" cy="305" r="6" fill="#FEF3C7" opacity="0.9" />
              <circle cx="115" cy="235" r="5" fill="#FEF3C7" opacity="0.9" />
              <circle cx="205" cy="235" r="5" fill="#FEF3C7" opacity="0.9" />
              <circle cx="145" cy="180" r="4" fill="#F3E8FF" opacity="0.9" />
              <circle cx="175" cy="180" r="4" fill="#F3E8FF" opacity="0.9" />

              {/* 16 Candles - arranged in groups on each tier */}
              {/* Bottom tier: 8 candles */}
              {[80, 100, 120, 140, 180, 200, 220, 240].map((x, i) => (
                <g key={`candle-bottom-${i}`} filter={!isBlownOut ? "url(#candle-glow)" : ""}>
                  {/* Candle body with gradient */}
                  <defs>
                    <linearGradient id={`candle-grad-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFBEB" />
                      <stop offset="100%" stopColor="#FEF3C7" />
                    </linearGradient>
                  </defs>
                  <rect x={x - 3} y="250" width="6" height="20" rx="2" fill={`url(#candle-grad-${i})`} stroke="#FCD34D" strokeWidth="0.5" />
                  {/* Wax drip */}
                  {!isBlownOut && (
                    <ellipse cx={x} cy="270" rx="2" ry="3" fill="#FFFBEB" opacity="0.8" />
                  )}
                  {/* Wick */}
                  <line x1={x} y1="250" x2={x} y2="245" stroke="#374151" strokeWidth="1.2" />
                  {/* Enhanced Flame with glow */}
                  {!isBlownOut && (
                    <g className="animate-flicker-smooth">
                      {/* Outer glow */}
                      <ellipse
                        cx={x}
                        cy="240"
                        rx="8"
                        ry="12"
                        fill="url(#flame-gradient)"
                        opacity="0.6"
                      />
                      {/* Main flame */}
                      <ellipse
                        cx={x}
                        cy="242"
                        rx="5"
                        ry="8"
                        fill="#FBBF24"
                        opacity="0.95"
                        className="animate-flicker"
                      />
                      {/* Inner white core */}
                      <ellipse
                        cx={x}
                        cy="243"
                        rx="2.5"
                        ry="5"
                        fill="#FEF3C7"
                        className="animate-flicker-fast"
                      />
                    </g>
                  )}
                  {/* Smoke effect when blown out */}
                  {isBlownOut && (
                    <g className="animate-smoke-rise" opacity="0.7">
                      <circle cx={x} cy="240" r="2.5" fill="#9CA3AF" />
                      <circle cx={x - 1} cy="235" r="2" fill="#9CA3AF" opacity="0.8" />
                      <circle cx={x + 1} cy="230" r="1.5" fill="#9CA3AF" opacity="0.6" />
                      <circle cx={x} cy="225" r="1" fill="#9CA3AF" opacity="0.4" />
                    </g>
                  )}
                </g>
              ))}

              {/* Middle tier: 6 candles */}
              {[115, 135, 155, 165, 185, 205].map((x, i) => (
                <g key={`candle-middle-${i}`} filter={!isBlownOut ? "url(#candle-glow)" : ""}>
                  <rect x={x - 3} y="192" width="6" height="18" rx="2" fill="url(#candle-grad-0)" stroke="#FCD34D" strokeWidth="0.5" />
                  {!isBlownOut && (
                    <ellipse cx={x} cy="210" rx="2" ry="3" fill="#FFFBEB" opacity="0.8" />
                  )}
                  <line x1={x} y1="192" x2={x} y2="187" stroke="#374151" strokeWidth="1.2" />
                  {!isBlownOut && (
                    <g className="animate-flicker-smooth">
                      <ellipse cx={x} cy="182" rx="7" ry="11" fill="url(#flame-gradient)" opacity="0.6" />
                      <ellipse cx={x} cy="184" rx="4.5" ry="7.5" fill="#FBBF24" opacity="0.95" className="animate-flicker" />
                      <ellipse cx={x} cy="185" rx="2.5" ry="5" fill="#FEF3C7" className="animate-flicker-fast" />
                    </g>
                  )}
                  {isBlownOut && (
                    <g className="animate-smoke-rise" opacity="0.7">
                      <circle cx={x} cy="182" r="2.5" fill="#9CA3AF" />
                      <circle cx={x - 1} cy="177" r="2" fill="#9CA3AF" opacity="0.8" />
                      <circle cx={x + 1} cy="172" r="1.5" fill="#9CA3AF" opacity="0.6" />
                    </g>
                  )}
                </g>
              ))}

              {/* Top tier: 2 candles */}
              {[145, 175].map((x, i) => (
                <g key={`candle-top-${i}`} filter={!isBlownOut ? "url(#candle-glow)" : ""}>
                  <rect x={x - 3} y="144" width="6" height="16" rx="2" fill="url(#candle-grad-0)" stroke="#FCD34D" strokeWidth="0.5" />
                  {!isBlownOut && (
                    <ellipse cx={x} cy="160" rx="2" ry="3" fill="#FFFBEB" opacity="0.8" />
                  )}
                  <line x1={x} y1="144" x2={x} y2="139" stroke="#374151" strokeWidth="1.2" />
                  {!isBlownOut && (
                    <g className="animate-flicker-smooth">
                      <ellipse cx={x} cy="134" rx="7" ry="11" fill="url(#flame-gradient)" opacity="0.6" />
                      <ellipse cx={x} cy="136" rx="4.5" ry="7.5" fill="#FBBF24" opacity="0.95" className="animate-flicker" />
                      <ellipse cx={x} cy="137" rx="2.5" ry="5" fill="#FEF3C7" className="animate-flicker-fast" />
                    </g>
                  )}
                  {isBlownOut && (
                    <g className="animate-smoke-rise" opacity="0.7">
                      <circle cx={x} cy="134" r="2.5" fill="#9CA3AF" />
                      <circle cx={x - 1} cy="129" r="2" fill="#9CA3AF" opacity="0.8" />
                      <circle cx={x + 1} cy="124" r="1.5" fill="#9CA3AF" opacity="0.6" />
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </button>
      </div>

      {/* Happy Birthday Message */}
      {showMessage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none"
          style={{
            animation: 'fadeInScale 0.5s ease-out forwards'
          }}
        >
          <div
            className="text-center transform"
            style={{
              animation: 'popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
            }}
          >
            <h1
              className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent drop-shadow-2xl"
              style={{
                textShadow: '0 0 40px rgba(74, 222, 128, 0.5), 0 0 80px rgba(56, 189, 248, 0.3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Happy Birthday! 🎉
            </h1>
            <p className="text-2xl md:text-4xl mt-6 text-foreground font-semibold drop-shadow-lg">
              Make a wish, Chirag! ✨
            </p>
          </div>
        </div>
      )}

      {/* Enhanced CSS for animations */}
      <style jsx>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1) translateY(0); }
          25% { opacity: 0.9; transform: scale(1.03) translateY(-1px); }
          50% { opacity: 0.85; transform: scale(1.05) translateY(-2px); }
          75% { opacity: 0.9; transform: scale(1.02) translateY(-1px); }
        }
        @keyframes flicker-fast {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
        @keyframes flicker-smooth {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.8; }
        }
        @keyframes smoke-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 0.4; }
          100% { transform: translateY(-40px) scale(1.5); opacity: 0; }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-flicker {
          animation: flicker 1.8s ease-in-out infinite;
        }
        .animate-flicker-fast {
          animation: flicker-fast 1s ease-in-out infinite;
        }
        .animate-flicker-smooth {
          animation: flicker-smooth 2.5s ease-in-out infinite;
        }
        .animate-smoke-rise {
          animation: smoke-rise 2.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};
