import React, { useEffect, useState } from "react";
import "@/App.css";
import "./index.css";
import { Toaster, toast } from "@/components/ui/sonner";
import { createMatrixBackground } from "@/components/birthday/MatrixBackground";
import { LayoutShell } from "@/components/birthday/LayoutShell";
import { HomePage, GalleryPage, LogsPage, AboutPage } from "@/components/birthday/Pages";
import { CakeComponent } from "@/components/birthday/CakeComponent";

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
    }, 1000);
  };

  const handleShare = async () => {
    const message = "Happy Birthday, Chirag! 🎉 — open at: https://example.com/chirag";
    try {
      await navigator.clipboard.writeText(message);
      toast("Share message copied", {
        description: "Paste it anywhere to summon Chirags birthday portal.",
      });
    } catch (e) {
      toast("Could not access clipboard", {
        description: message,
      });
    }
  };

  const handleDownloadCard = async () => {
    try {
      const hero = document.querySelector("section[aria-labelledby='hero-heading']");
      if (!hero) throw new Error("Hero not found");
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(hero, {
        backgroundColor: "#020817",
        scale: window.devicePixelRatio || 2,
      });
      const link = document.createElement("a");
      link.download = "happy-birthday-chirag.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast("E-card downloaded", {
        description: "Saved a snapshot of Chirags hacker birthday view.",
      });
    } catch (e) {
      toast("Download failed", {
        description: "Couldnt capture the card. Try again or check permissions.",
      });
    }
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

      {/* Cake Component */}
      <CakeComponent
        isVisible={showCake}
        onCakeTap={handleCakeTap}
        onAnimationComplete={handleCakeAnimationComplete}
      />

      <Toaster richColors theme="dark" />
    </div>
  );
}

export default App;
