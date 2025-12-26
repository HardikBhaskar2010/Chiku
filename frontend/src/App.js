import React, { useEffect, useState } from "react";
import "@/App.css";
import "./index.css";
import { Toaster, toast } from "@/components/ui/sonner";
import { createMatrixBackground } from "@/components/birthday/MatrixBackground";
import { LayoutShell } from "@/components/birthday/LayoutShell";
import { HomePage, GalleryPage, LogsPage, AboutPage } from "@/components/birthday/Pages";
import { EnhancedCakeComponent } from "@/components/birthday/EnhancedCakeComponent";
import { GiftBoxSystem } from "@/components/birthday/GiftBoxSystem";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

const STORAGE_KEY = "chirag-birthday-settings-v1";

const defaultSettings = {
  fallingLetters: true,
  musicEnabled: true,
  confettiEnabled: true,
  imagesEnabled: true,
};

function loadSettings() {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw);
    return { ...defaultSettings, ...parsed };
  } catch (e) {
    return defaultSettings;
  }
}

function saveSettings(settings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    // ignore
  }
}

function triggerNativeConfetti() {
  const container = document.createElement("div");
  container.className = "pointer-events-none fixed inset-0 z-[60] overflow-hidden";
  for (let i = 0; i < 80; i += 1) {
    const piece = document.createElement("div");
    piece.style.position = "absolute";
    piece.style.width = "6px";
    piece.style.height = "14px";
    piece.style.borderRadius = "999px";
    const colors = [
      "hsl(142,82%,55%)",
      "hsl(196,82%,52%)",
      "hsl(46,97%,63%)",
      "hsl(9,87%,64%)",
    ];
    piece.style.background = colors[i % colors.length];
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = "-20px";
    const delay = Math.random() * 0.2;
    const duration = 1.2 + Math.random() * 0.8;
    const translateX = (Math.random() - 0.5) * 160;
    piece.style.transition = `transform ${duration}s cubic-bezier(0.22,1,0.36,1), opacity ${duration}s linear`;
    piece.style.transform = `translate(${translateX}px, ${window.innerHeight + 60}px) rotate(${Math.random() * 360}deg)`;
    piece.style.opacity = "0";
    piece.style.transitionDelay = `${delay}s`;
    container.appendChild(piece);
  }
  document.body.appendChild(container);
  void container.offsetHeight;
  Array.from(container.children).forEach((child) => {
    const el = child;
    el.style.opacity = "1";
  });
  setTimeout(() => {
    container.remove();
  }, 2400);
}

function registerKeyboardShortcuts(onConfetti, onEasterEgg) {
  const handler = (event) => {
    if (event.key === "c" || event.key === "C") {
      event.preventDefault();
      onConfetti();
    }
    if (event.ctrlKey && (event.key === "k" || event.key === "K")) {
      event.preventDefault();
      onEasterEgg();
    }
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}

function App() {
  const [settings, setSettings] = useState(defaultSettings);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [showCake, setShowCake] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  
  // Device performance detection
  const { performanceTier, settings: performanceSettings, isLoading: perfLoading } = useDevicePerformance();

  useEffect(() => {
    setSettings(loadSettings());
    if (window.matchMedia) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mq.matches);
      const handler = (e) => setPrefersReducedMotion(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    return undefined;
  }, []);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    const canvas = document.getElementById("matrix-canvas");
    if (!canvas || !settings.fallingLetters || prefersReducedMotion) return undefined;
    const controller = createMatrixBackground(canvas, { prefersReducedMotion });
    return () => {
      controller?.destroy();
    };
  }, [settings.fallingLetters, prefersReducedMotion]);

  useEffect(() => {
    const cleanup = registerKeyboardShortcuts(
      () => {
        if (!settings.confettiEnabled) return;
        triggerNativeConfetti();
      },
      () => {
        toast("Secret log uploaded", {
          description:
            "Chirag, there may or may not be a hidden audio clip waiting to be wired in.",
        });
      },
    );
    return cleanup;
  }, [settings.confettiEnabled]);

  useEffect(() => {
    const handleLongPress = () => {
      toast("Candles blown out", {
        description: "Soft particle puff imagined. Make a wish, Chirag.",
      });
    };
    window.addEventListener("hero-long-press", handleLongPress);
    return () => window.removeEventListener("hero-long-press", handleLongPress);
  }, []);

  const handleConfetti = () => {
    if (!settings.confettiEnabled) return;
    triggerNativeConfetti();
  };

  const handleShowCake = () => {
    setShowCake(true);
  };

  const handleCakeTap = () => {
    // Trigger confetti when cake is tapped
    if (settings.confettiEnabled) {
      triggerNativeConfetti();
      // Trigger more confetti for extra celebration
      setTimeout(() => triggerNativeConfetti(), 300);
      setTimeout(() => triggerNativeConfetti(), 600);
    }
  };

  const handleCakeAnimationComplete = () => {
    // Hide cake after animation completes
    setTimeout(() => {
      setShowCake(false);
      // Show gift boxes after cake animation
      setTimeout(() => {
        setShowGifts(true);
      }, 500);
    }, 1000);
  };

  const handleGenerateAndShareCard = async () => {
    try {
      // Gallery images for cycling
      const images = [
        "https://customer-assets.emergentagent.com/job_e61789e4-c19e-469e-accd-026b391c9c8f/artifacts/v3m6i31v_593428450_1892932697926540_3628987519635097342_n.jpg",
        "https://customer-assets.emergentagent.com/job_e61789e4-c19e-469e-accd-026b391c9c8f/artifacts/jmx9buis_591323210_866297539311088_1747599040356254903_n.png",
        "https://customer-assets.emergentagent.com/job_e61789e4-c19e-469e-accd-026b391c9c8f/artifacts/3tzd7b2u_591202377_1426922422287674_7722017154453940407_n.png",
        "https://customer-assets.emergentagent.com/job_e61789e4-c19e-469e-accd-026b391c9c8f/artifacts/h7yh1cfn_591618856_1404028341303406_6672948542034263451_n.png"
      ];

      // Get cycling image index from localStorage
      const currentIndex = parseInt(localStorage.getItem('chirag-card-image-index') || '0', 10);
      const selectedImage = images[currentIndex % images.length];
      
      // Update index for next time
      localStorage.setItem('chirag-card-image-index', ((currentIndex + 1) % images.length).toString());

      // Create a temporary card element
      const cardContainer = document.createElement('div');
      cardContainer.style.position = 'fixed';
      cardContainer.style.left = '-9999px';
      cardContainer.style.width = '800px';
      cardContainer.style.height = '1000px';
      cardContainer.style.background = 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
      cardContainer.style.padding = '40px';
      cardContainer.style.display = 'flex';
      cardContainer.style.flexDirection = 'column';
      cardContainer.style.justifyContent = 'space-between';
      cardContainer.style.fontFamily = 'system-ui, -apple-system, sans-serif';

      cardContainer.innerHTML = `
        <div style="text-align: center;">
          <h1 style="font-size: 48px; font-weight: bold; background: linear-gradient(135deg, #4ade80 0%, #38bdf8 50%, #facc15 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 20px;">
            🎉 Happy Birthday 🎉
          </h1>
          <h2 style="font-size: 64px; font-weight: bold; color: #fff; text-shadow: 0 0 20px rgba(74, 222, 128, 0.5); margin-bottom: 30px;">
            CHIRAG
          </h2>
        </div>
        
        <div style="flex: 1; display: flex; align-items: center; justify-center; margin: 30px 0;">
          <img 
            src="${selectedImage}" 
            alt="Birthday" 
            crossorigin="anonymous"
            style="max-width: 100%; max-height: 500px; border-radius: 20px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); border: 4px solid rgba(74, 222, 128, 0.3);"
          />
        </div>
        
        <div style="text-align: center; padding: 20px; background: rgba(0, 0, 0, 0.3); border-radius: 15px; border: 1px solid rgba(74, 222, 128, 0.2);">
          <p style="font-size: 24px; color: #94a3b8; line-height: 1.6; margin: 0;">
            🚀 Level 16 Unlocked! May your code compile on first try, your bugs be minimal, and your coffee be strong! 💻✨
          </p>
        </div>
      `;

      document.body.appendChild(cardContainer);

      // Wait for image to load
      const img = cardContainer.querySelector('img');
      await new Promise((resolve, reject) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = reject;
        }
      });

      // Generate canvas
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardContainer, {
        backgroundColor: "#0f172a",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });

      // Clean up
      document.body.removeChild(cardContainer);

      // Convert to blob
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `happy-birthday-chirag-${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      // Show sharing options
      const shareMessage = "🎉 Happy Birthday Chirag! Check out this special celebration! 🎂";
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
      
      toast("Birthday card downloaded!", {
        description: "Card saved successfully. Share it with Chirag!",
        action: {
          label: "WhatsApp",
          onClick: () => window.open(whatsappUrl, '_blank')
        }
      });

      // Copy share message to clipboard
      try {
        await navigator.clipboard.writeText(shareMessage);
        setTimeout(() => {
          toast("Share message copied!", {
            description: "Paste it along with the card image anywhere!"
          });
        }, 1000);
      } catch (e) {
        // Clipboard not available
      }

    } catch (error) {
      console.error('Card generation error:', error);
      toast("Card generation failed", {
        description: "Unable to create the birthday card. Please try again."
      });
    }
  };

  const handleShare = async () => {
    // Generate custom birthday card and share
    await handleGenerateAndShareCard();
  };

  const handleDownloadCard = async () => {
    // Use the same custom card generation
    await handleGenerateAndShareCard();
  };

  const handleRevealEasterEgg = () => {
    toast("Easter egg", {
      description: "Wire a hidden voice note or message from friends here.",
    });
  };

  const pageProps = {
    onTriggerConfetti: handleConfetti,
    onDownloadCard: handleDownloadCard,
    onShare: handleShare,
    settings,
    onSettingsChange: setSettings,
    prefersReducedMotion,
    onRevealEasterEgg: handleRevealEasterEgg,
    onNavigate: setActivePage,
    showCake,
    onShowCake: handleShowCake,
  };

  let pageElement = null;
  if (activePage === "home") {
    pageElement = <HomePage {...pageProps} />;
  } else if (activePage === "gallery") {
    pageElement = <GalleryPage settings={settings} />;
  } else if (activePage === "logs") {
    pageElement = <LogsPage />;
  } else if (activePage === "about") {
    pageElement = <AboutPage />;
  }

  return (
    <div className="App-root min-h-screen bg-background text-foreground">
      <noscript>
        <div className="no-js-fallback flex min-h-screen items-center justify-center bg-black text-center text-foreground">
          <div className="max-w-md space-y-4 px-6">
            <h1 className="text-3xl font-semibold">Happy Birthday, Chirag!</h1>
            <p className="text-sm text-muted-foreground">
              JavaScript is disabled, so youre seeing the static version. Enable it to view the full hacker birthday experience.
            </p>
          </div>
        </div>
      </noscript>

      <LayoutShell active={activePage} onNavigate={setActivePage}>
        {pageElement}
      </LayoutShell>

      {/* Enhanced Cake Component */}
      <EnhancedCakeComponent
        isVisible={showCake}
        onCakeTap={handleCakeTap}
        onAnimationComplete={handleCakeAnimationComplete}
      />

      {/* Gift Box System */}
      <GiftBoxSystem
        isVisible={showGifts}
        onClose={() => setShowGifts(false)}
      />

      <Toaster richColors theme="dark" />
    </div>
  );
}

export default App;
