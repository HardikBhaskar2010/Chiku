import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Gift, ChevronRight, X } from "lucide-react";

// Gift content - 3 boxes, each with 4 pages
const giftBoxes = [
  {
    id: 1,
    pages: [
      {
        type: "message",
        content: "Chirag, you're not just a year older, you're a year closer to becoming a legendary developer! 🚀",
        title: "Special Message",
        emoji: "💌"
      },
      {
        type: "meme",
        content: "https://i.imgflip.com/30b1gx.jpg",
        title: "Meme Alert",
        emoji: "😂",
        caption: "When Chirag says 'It works on my machine'"
      },
      {
        type: "photo",
        content: "https://customer-assets.emergentagent.com/job_e61789e4-c19e-469e-accd-026b391c9c8f/artifacts/v3m6i31v_593428450_1892932697926540_3628987519635097342_n.jpg",
        title: "Secret Photo",
        emoji: "📸",
        caption: "A moment captured in time"
      },
      {
        type: "roast",
        content: "Chirag's code is so clean, even his bugs are well-documented! 🔥",
        title: "Friendly Roast",
        emoji: "🔥"
      }
    ]
  },
  {
    id: 2,
    pages: [
      {
        type: "message",
        content: "Here's to another year of midnight coding sessions, coffee addiction, and 'just one more commit'! ☕💻",
        title: "Birthday Wisdom",
        emoji: "🎂"
      },
      {
        type: "meme",
        content: "https://i.imgflip.com/4/6d0pn7.jpg",
        title: "Code Life",
        emoji: "💻",
        caption: "Chirag debugging at 3 AM"
      },
      {
        type: "photo",
        content: "https://customer-assets.emergentagent.com/job_e61789e4-c19e-469e-accd-026b391c9c8f/artifacts/jmx9buis_591323210_866297539311088_1747599040356254903_n.png",
        title: "Hidden Treasure",
        emoji: "🎁",
        caption: "Another epic memory"
      },
      {
        type: "roast",
        content: "They say age is just a number, but in your case, it's a well-optimized integer! 😏",
        title: "Tech Roast",
        emoji: "😈"
      }
    ]
  },
  {
    id: 3,
    pages: [
      {
        type: "message",
        content: "Level 16 unlocked! New abilities: More wisdom, better code, and an even cooler personality! 🌟",
        title: "Achievement Unlocked",
        emoji: "🏆"
      },
      {
        type: "meme",
        content: "https://i.imgflip.com/4/1bij.jpg",
        title: "Birthday Mood",
        emoji: "🎉",
        caption: "Chirag entering his birthday like..."
      },
      {
        type: "photo",
        content: "https://customer-assets.emergentagent.com/job_e61789e4-c19e-469e-accd-026b391c9c8f/artifacts/3tzd7b2u_591202377_1426922422287674_7722017154453940407_n.png",
        title: "Memory Unlocked",
        emoji: "✨",
        caption: "The legend himself"
      },
      {
        type: "roast",
        content: "Chirag is so smart, he once fixed a bug before it even existed. Wait, that's called 'good code'... never mind! 🤓",
        title: "Ultimate Roast",
        emoji: "🎯"
      }
    ]
  }
];

export const GiftBoxSystem = ({ isVisible, onClose }) => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setSelectedBox(null);
      setCurrentPage(0);
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleBoxClick = (boxId) => {
    setSelectedBox(boxId);
    setCurrentPage(0);
  };

  const handleNext = () => {
    const currentBox = giftBoxes.find(box => box.id === selectedBox);
    if (currentPage < currentBox.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Move to next box or close
      if (selectedBox < giftBoxes.length) {
        setSelectedBox(selectedBox + 1);
        setCurrentPage(0);
      } else {
        // All boxes completed
        onClose?.();
      }
    }
  };

  const handleClose = () => {
    setSelectedBox(null);
    setCurrentPage(0);
    onClose?.();
  };

  const currentBox = selectedBox ? giftBoxes.find(box => box.id === selectedBox) : null;
  const currentContent = currentBox ? currentBox.pages[currentPage] : null;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={selectedBox ? null : handleClose}
      />

      {/* Gift Boxes Selection or Content */}
      <div className="fixed inset-0 z-[71] flex items-center justify-center p-4 pointer-events-none">
        {!selectedBox ? (
          // Show 3 gift boxes
          <div
            className={`pointer-events-auto transform transition-all duration-700 ${
              isAnimating ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                🎁 Pick Your Gift! 🎁
              </h2>
              <p className="text-muted-foreground">
                Chirag, you have 3 mystery gifts waiting...
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center items-center">
              {giftBoxes.map((box, index) => (
                <button
                  key={box.id}
                  onClick={() => handleBoxClick(box.id)}
                  data-testid={`gift-box-${box.id}`}
                  className="group relative transform transition-all duration-300 hover:scale-110 hover:-translate-y-2"
                  style={{
                    animation: `popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards ${index * 0.2}s`
                  }}
                >
                  {/* Gift Box SVG */}
                  <div className="relative">
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-2xl"
                    >
                      {/* Box Body */}
                      <rect x="20" y="40" width="80" height="60" rx="4" fill="#EF4444" className="group-hover:fill-[#DC2626] transition-colors" />
                      {/* Box Lid */}
                      <rect x="15" y="30" width="90" height="15" rx="3" fill="#F87171" className="group-hover:fill-[#EF4444] transition-colors" />
                      {/* Ribbon Vertical */}
                      <rect x="55" y="30" width="10" height="70" fill="#FEF3C7" />
                      {/* Ribbon Horizontal */}
                      <rect x="15" y="35" width="90" height="8" fill="#FEF3C7" />
                      {/* Bow */}
                      <circle cx="50" cy="35" r="8" fill="#FCD34D" />
                      <circle cx="70" cy="35" r="8" fill="#FCD34D" />
                      <circle cx="60" cy="32" r="6" fill="#FBBF24" />
                      {/* Sparkles */}
                      <circle cx="25" cy="50" r="2" fill="#FDE047" className="animate-pulse" />
                      <circle cx="95" cy="60" r="2" fill="#FDE047" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                      <circle cx="30" cy="80" r="2" fill="#FDE047" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                    </svg>
                    
                    {/* Box Number */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      {box.id}
                    </div>
                  </div>
                  
                  <div className="mt-3 text-center">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      Gift Box {box.id}
                    </p>
                    <p className="text-xs text-muted-foreground">Tap to open</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="ghostHacker"
                size="sm"
                onClick={handleClose}
                data-testid="close-gifts-btn"
              >
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
            </div>
          </div>
        ) : (
          // Show current page content (book style)
          <div
            className="pointer-events-auto w-full max-w-2xl transform transition-all duration-500"
            style={{
              animation: 'slideInRight 0.4s ease-out'
            }}
          >
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border-2 border-primary/40 shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                data-testid="close-gift-content-btn"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>

              {/* Book Page */}
              <div className="p-8 md:p-12 min-h-[500px] flex flex-col">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4 animate-bounce">{currentContent.emoji}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    {currentContent.title}
                  </h3>
                  <div className="h-1 w-24 bg-gradient-to-r from-primary via-secondary to-accent mx-auto rounded-full" />
                </div>

                {/* Content */}
                <div className="flex-1 flex items-center justify-center">
                  {currentContent.type === "message" || currentContent.type === "roast" ? (
                    <div className="text-center">
                      <p className="text-xl md:text-2xl text-foreground leading-relaxed font-medium px-4">
                        {currentContent.content}
                      </p>
                    </div>
                  ) : currentContent.type === "meme" ? (
                    <div className="text-center">
                      <div className="rounded-xl overflow-hidden border-4 border-primary/30 shadow-xl max-w-md mx-auto">
                        <img
                          src={currentContent.content}
                          alt={currentContent.title}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                      {currentContent.caption && (
                        <p className="mt-4 text-lg text-muted-foreground italic">
                          "{currentContent.caption}"
                        </p>
                      )}
                    </div>
                  ) : currentContent.type === "photo" ? (
                    <div className="text-center">
                      <div className="rounded-xl overflow-hidden border-4 border-secondary/30 shadow-xl max-w-md mx-auto">
                        <img
                          src={currentContent.content}
                          alt={currentContent.title}
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                      {currentContent.caption && (
                        <p className="mt-4 text-lg text-muted-foreground italic">
                          {currentContent.caption}
                        </p>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Footer with progress and next button */}
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex gap-2">
                    {currentBox.pages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentPage
                            ? 'w-8 bg-primary'
                            : idx < currentPage
                            ? 'w-2 bg-secondary'
                            : 'w-2 bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    onClick={handleNext}
                    variant="primaryHero"
                    size="lg"
                    data-testid="next-gift-page-btn"
                  >
                    {currentPage < currentBox.pages.length - 1 ? (
                      <>
                        Next
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </>
                    ) : selectedBox < giftBoxes.length ? (
                      <>
                        Next Box
                        <Gift className="ml-2 h-5 w-5" />
                      </>
                    ) : (
                      <>
                        Finish
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Box indicator */}
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Gift Box {selectedBox} of {giftBoxes.length} • Page {currentPage + 1} of {currentBox.pages.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes popIn {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes slideInRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
};
