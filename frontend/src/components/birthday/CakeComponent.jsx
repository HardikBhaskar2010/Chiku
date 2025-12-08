import React, { useState, useEffect } from "react";
import { Cake } from "lucide-react";

// Realistic birthday cake with 16 candles
export const CakeComponent = ({ onCakeTap, isVisible, onAnimationComplete }) => {
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showTapMe, setShowTapMe] = useState(false);

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
        className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
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
              👆 Tap Me!
            </div>
          </div>
        )}

        {/* Cake */}
        <button
          onClick={handleCakeTap}
          disabled={isBlownOut}
          data-testid="birthday-cake"
          className={`pointer-events-auto transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 scale-100' : 'translate-y-full scale-90'
          } ${isBlownOut ? 'cursor-default' : 'cursor-pointer hover:scale-105'}`}
          style={{
            transformOrigin: 'bottom center'
          }}
        >
          <div className="relative">
            {/* Cake SVG */}
            <svg
              width="300"
              height="350"
              viewBox="0 0 300 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              {/* Plate */}
              <ellipse cx="150" cy="320" rx="140" ry="20" fill="#E5E7EB" opacity="0.9" />
              
              {/* Bottom Tier - Larger */}
              <rect x="50" y="240" width="200" height="80" rx="8" fill="#FCA5A5" />
              <rect x="50" y="240" width="200" height="15" rx="8" fill="#FEE2E2" />
              <path d="M 60 260 Q 150 270 240 260" stroke="#F87171" strokeWidth="2" fill="none" />
              <path d="M 60 280 Q 150 290 240 280" stroke="#F87171" strokeWidth="2" fill="none" />
              
              {/* Middle Tier */}
              <rect x="75" y="180" width="150" height="60" rx="8" fill="#FBBF24" />
              <rect x="75" y="180" width="150" height="12" rx="8" fill="#FEF3C7" />
              <path d="M 85 195 Q 150 202 215 195" stroke="#F59E0B" strokeWidth="2" fill="none" />
              <path d="M 85 210 Q 150 217 215 210" stroke="#F59E0B" strokeWidth="2" fill="none" />
              
              {/* Top Tier - Smallest */}
              <rect x="100" y="130" width="100" height="50" rx="8" fill="#A78BFA" />
              <rect x="100" y="130" width="100" height="10" rx="8" fill="#EDE9FE" />
              <path d="M 110 145 Q 150 150 190 145" stroke="#8B5CF6" strokeWidth="2" fill="none" />
              
              {/* Decorative Elements */}
              <circle cx="70" cy="280" r="8" fill="#FEF3C7" />
              <circle cx="230" cy="280" r="8" fill="#FEF3C7" />
              <circle cx="100" cy="210" r="6" fill="#FEF3C7" />
              <circle cx="200" cy="210" r="6" fill="#FEF3C7" />
              <circle cx="120" cy="155" r="5" fill="#FEF3C7" />
              <circle cx="180" cy="155" r="5" fill="#FEF3C7" />

              {/* 16 Candles - arranged in groups on each tier */}
              {/* Bottom tier: 8 candles */}
              {[60, 85, 110, 135, 165, 190, 215, 240].map((x, i) => (
                <g key={`candle-bottom-${i}`}>
                  {/* Candle body */}
                  <rect x={x - 3} y="220" width="6" height="20" rx="2" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="0.5" />
                  {/* Wick */}
                  <line x1={x} y1="220" x2={x} y2="215" stroke="#374151" strokeWidth="1" />
                  {/* Flame */}
                  {!isBlownOut && (
                    <>
                      <ellipse
                        cx={x}
                        cy="212"
                        rx="4"
                        ry="6"
                        fill="#FCD34D"
                        opacity="0.9"
                        className="animate-flicker"
                      />
                      <ellipse
                        cx={x}
                        cy="213"
                        rx="2.5"
                        ry="4"
                        fill="#FEF3C7"
                        className="animate-flicker-fast"
                      />
                    </>
                  )}
                  {/* Smoke effect when blown out */}
                  {isBlownOut && (
                    <g className="animate-smoke-rise" opacity="0.6">
                      <circle cx={x} cy="210" r="2" fill="#9CA3AF" />
                      <circle cx={x - 1} cy="205" r="1.5" fill="#9CA3AF" />
                      <circle cx={x + 1} cy="203" r="1" fill="#9CA3AF" />
                    </g>
                  )}
                </g>
              ))}

              {/* Middle tier: 6 candles */}
              {[90, 115, 140, 160, 185, 210].map((x, i) => (
                <g key={`candle-middle-${i}`}>
                  <rect x={x - 3} y="162" width="6" height="18" rx="2" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="0.5" />
                  <line x1={x} y1="162" x2={x} y2="157" stroke="#374151" strokeWidth="1" />
                  {!isBlownOut && (
                    <>
                      <ellipse cx={x} cy="154" rx="4" ry="6" fill="#FCD34D" opacity="0.9" className="animate-flicker" />
                      <ellipse cx={x} cy="155" rx="2.5" ry="4" fill="#FEF3C7" className="animate-flicker-fast" />
                    </>
                  )}
                  {isBlownOut && (
                    <g className="animate-smoke-rise" opacity="0.6">
                      <circle cx={x} cy="152" r="2" fill="#9CA3AF" />
                      <circle cx={x - 1} cy="147" r="1.5" fill="#9CA3AF" />
                    </g>
                  )}
                </g>
              ))}

              {/* Top tier: 2 candles */}
              {[130, 170].map((x, i) => (
                <g key={`candle-top-${i}`}>
                  <rect x={x - 3} y="114" width="6" height="16" rx="2" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="0.5" />
                  <line x1={x} y1="114" x2={x} y2="109" stroke="#374151" strokeWidth="1" />
                  {!isBlownOut && (
                    <>
                      <ellipse cx={x} cy="106" rx="4" ry="6" fill="#FCD34D" opacity="0.9" className="animate-flicker" />
                      <ellipse cx={x} cy="107" rx="2.5" ry="4" fill="#FEF3C7" className="animate-flicker-fast" />
                    </>
                  )}
                  {isBlownOut && (
                    <g className="animate-smoke-rise" opacity="0.6">
                      <circle cx={x} cy="104" r="2" fill="#9CA3AF" />
                      <circle cx={x - 1} cy="99" r="1.5" fill="#9CA3AF" />
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
                textShadow: '0 0 40px rgba(74, 222, 128, 0.5), 0 0 80px rgba(56, 189, 248, 0.3)'
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

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes flicker-fast {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes smoke-rise {
          0% { transform: translateY(0); opacity: 0.6; }
          100% { transform: translateY(-30px); opacity: 0; }
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
          animation: flicker 1.5s ease-in-out infinite;
        }
        .animate-flicker-fast {
          animation: flicker-fast 0.8s ease-in-out infinite;
        }
        .animate-smoke-rise {
          animation: smoke-rise 2s ease-out forwards;
        }
      `}</style>
    </>
  );
};