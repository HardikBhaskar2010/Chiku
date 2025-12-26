import React, { useEffect, useRef, useState, useCallback } from "react";
import anime from "animejs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, PlayCircle, PauseCircle, Share2, Download, Sparkles } from "lucide-react";
import { TextReveal, FloatingElement, PulseGlow, RippleEffect, celebrateSequence } from "./AnimeAnimations";
import { ConfettiBurst, FireworksBurst } from "./ParticleSystem";

const subtitles = [
  "To the legend who does nothing… flawlessly",
  "Nap schedule: prioritized",
  "Party mode: low effort, max vibes 🎂",
];

const audioSrc = "https://customer-assets.emergentagent.com/job_birthday-surprise-205/artifacts/jg47gc1p_happy-birthday-song.mp3";

export const HeroSection = ({
  onTriggerConfetti,
  onDownloadCard,
  onShare,
  settings,
  onSettingsChange,
  prefersReducedMotion,
  onNavigate,
  showCake,
  onShowCake,
}) => {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);
  const [isLongPress, setIsLongPress] = useState(false);
  const longPressTimeout = useRef(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const hudRef = useRef(null);

  // Entrance animations
  useEffect(() => {
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.9, 1],
        duration: 1200,
        easing: "easeOutExpo",
        delay: 300,
      });
    }

    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 1000,
        easing: "easeOutExpo",
        delay: 600,
      });
    }

    if (hudRef.current) {
      anime({
        targets: hudRef.current,
        opacity: [0, 1],
        translateX: [50, 0],
        duration: 1000,
        easing: "easeOutExpo",
        delay: 800,
      });
    }
  }, []);

  // subtitle rotator (respects reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 2600);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  // keep audio element volume in sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // try autoplay on mount if allowed
  useEffect(() => {
    if (!settings.musicEnabled) return;

    const attemptAutoPlay = async () => {
      const audio = audioRef.current;
      if (!audio) return;

      try {
        await audio.play();
        setIsAudioPlaying(true);
        setHasUserInteracted(true);
      } catch (error) {
        // blocked by browser: prompt user interaction
        console.log("Auto-play blocked by browser. User interaction needed.");
      }
    };

    const timer = setTimeout(attemptAutoPlay, 500);
    return () => clearTimeout(timer);
  }, [settings.musicEnabled]);

  // Pause audio if music is toggled off
  useEffect(() => {
    if (!settings.musicEnabled && audioRef.current) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    }
  }, [settings.musicEnabled]);

  // cleanup long-press timer and pause audio on unmount
  useEffect(() => {
    return () => {
      if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // detach source if you want
      }
    };
  }, []);

  const toggleAudio = useCallback(() => {
    if (!settings.musicEnabled) return;
    const audio = audioRef.current;
    if (!audio) return;
    setHasUserInteracted(true);
    if (audio.paused) {
      audio
        .play()
        .then(() => setIsAudioPlaying(true))
        .catch(() => setIsAudioPlaying(false));
    } else {
      audio.pause();
      setIsAudioPlaying(false);
    }
  }, [settings.musicEnabled]);

  const handleVolumeChange = useCallback((value) => {
    const v = Array.isArray(value) ? value[0] : value;
    setVolume(v / 100);
  }, []);

  const handleMouseDown = useCallback(() => {
    if (prefersReducedMotion) return;
    setIsLongPress(false);
    if (longPressTimeout.current) clearTimeout(longPressTimeout.current);
    longPressTimeout.current = setTimeout(() => {
      setIsLongPress(true);
      const event = new CustomEvent("hero-long-press");
      window.dispatchEvent(event);
    }, 900);
  }, [prefersReducedMotion]);

  const clearLongPress = useCallback(() => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  }, []);

  return (
    <section
      className="relative isolate flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center overflow-hidden bg-gradient-hero px-4 pb-16 text-center sm:px-6 lg:px-10"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <canvas id="matrix-canvas" aria-hidden="true" className="block h-full w-full" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.25),_transparent_60%),_radial-gradient(circle_at_bottom,_hsl(var(--secondary)/0.24),_transparent_55%)] opacity-80" />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 lg:flex-row lg:items-stretch">
        <div ref={cardRef} className="flex flex-1 flex-col items-center justify-center gap-6 text-center lg:items-start lg:text-left" style={{ opacity: 0 }}>
          <FloatingElement amplitude={5} duration={4000}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-black/20 px-4 py-1 text-xs font-medium text-primary shadow-glow-primary backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-primary shadow-glow-primary animate-pulse" aria-hidden="true" />
              <span>Level 16 Unlocked.</span>
            </div>
          </FloatingElement>

          <PulseGlow color="#4ade80" className="w-full">
            <div
              ref={titleRef}
              className="noise-overlay relative max-w-2xl rounded-3xl border border-primary/40 bg-black/10 px-6 py-8 shadow-glow-primary backdrop-blur-lg sm:px-10 sm:py-10"
              style={{ opacity: 0 }}
            >
              <div className="absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.18),_transparent_60%)]" />

              {/* accessible heading + clickable area */}
              <button
                id="hero-heading"
                role="heading"
                aria-level={1}
                className="group relative w-full cursor-pointer select-none text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                onClick={onTriggerConfetti}
                onMouseDown={handleMouseDown}
                onMouseUp={clearLongPress}
                onMouseLeave={clearLongPress}
                onTouchStart={handleMouseDown}
                onTouchEnd={clearLongPress}
              >
                <span className="relative inline-block align-middle text-foreground neon-text-primary">Happy Birthday, Chirag!</span>
                <span className="mt-4 block text-base font-normal text-muted-foreground sm:text-lg">{subtitles[subtitleIndex]}</span>
              </button>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs sm:justify-start sm:text-sm">
                <span className="chip-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  Panda view engaged
                </span>
                <span className="chip-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
                  Press <kbd className="rounded bg-muted/80 px-1.5 py-0.5 text-[11px]">C</kbd> for confetti
                </span>
                <span className="chip-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Hold greeting to blow out candles
                </span>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                <RippleEffect>
                  <Button
                    type="button"
                    variant="primaryHero"
                    size="lg"
                    onClick={() => {
                      setHasUserInteracted(true);

                      if (settings.musicEnabled && audioRef.current) {
                        audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(console.log);
                      }

                      setShowConfetti(true);
                      setTimeout(() => setShowFireworks(true), 500);
                      setTimeout(() => {
                        setShowConfetti(false);
                        setShowFireworks(false);
                      }, 4000);

                      // celebration sequence
                      celebrateSequence(onTriggerConfetti);

                      if (onShowCake) onShowCake();
                    }}
                    data-testid="celebrate-sequence-btn"
                    className="animate-pulse-glow"
                  >
                    <span className="relative flex items-center gap-2">
                      <Sparkles className="h-4 w-4 animate-spin-slow" />
                      <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-glow-secondary" aria-hidden="true" />
                      Celebrate sequence
                    </span>
                  </Button>
                </RippleEffect>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="ghostHacker"
                    size="icon"
                    aria-label={isAudioPlaying ? "Pause birthday track" : "Play birthday track"}
                    onClick={toggleAudio}
                    disabled={!settings.musicEnabled}
                  >
                    {isAudioPlaying ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                  </Button>
                  <div className="flex w-28 items-center gap-2">
                    {volume === 0 ? (
                      <VolumeX className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    )}
                    <Slider value={[volume * 100]} max={100} step={5} onValueChange={handleVolumeChange} aria-label="Music volume" />
                  </div>
                </div>

                <audio ref={audioRef} src={audioSrc} preload="auto" loop aria-label="Birthday soundtrack for Chirag" />

                {!hasUserInteracted && settings.musicEnabled && (
                  <div className="mt-4 text-xs text-muted-foreground animate-pulse">🎵 Click anywhere to enable music</div>
                )}
              </div>
            </div>
          </PulseGlow>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground sm:justify-start">
            <span>
              Easter egg: press <kbd className="rounded bg-muted/80 px-1.5 py-0.5 text-[11px]">Ctrl</kbd> + <kbd className="ml-0.5 rounded bg-muted/80 px-1.5 py-0.5 text-[11px]">K</kbd>
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>Settings panel keeps your choices saved on this device.</span>
          </div>
        </div>

        <div ref={hudRef} className="mt-8 flex w-full max-w-md flex-1 flex-col gap-4 lg:mt-0" style={{ opacity: 0 }}>
          <Card className="card-elevated w-full flex-1 border-primary/30 bg-black/20 hover:shadow-glow-primary transition-shadow duration-500">
            <CardContent className="flex h-full flex-col gap-4 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-primary/80">Birthday HUD</p>
                  <p className="mt-1 text-sm text-muted-foreground">System flags for Chirag&apos;s party instance.</p>
                </div>
                <div className="rounded-full border border-primary/40 bg-black/40 px-3 py-1 text-[11px] font-medium text-primary">v16.0 · Stable build</div>
              </div>

              <div className="mt-1 grid flex-1 grid-cols-2 gap-3 text-left text-xs sm:text-sm">
                <button type="button" onClick={() => onNavigate?.("home")} className="flex flex-col rounded-xl border border-muted bg-black/20 px-3 py-2.5 text-left transition-colors hover:border-primary/60 hover:bg-primary/5">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Home</span>
                  <span className="mt-1 text-sm font-medium text-foreground">Panda view</span>
                  <span className="mt-0.5 text-[11px] text-muted-foreground">Main birthday console</span>
                </button>

                <button type="button" onClick={() => onNavigate?.("gallery")} className="flex flex-col rounded-xl border border-muted bg-black/20 px-3 py-2.5 text-left transition-colors hover:border-secondary/60 hover:bg-secondary/5">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Gallery</span>
                  <span className="mt-1 text-sm font-medium text-foreground">Memory slots</span>
                  <span className="mt-0.5 text-[11px] text-muted-foreground">Party photos, future you</span>
                </button>

                <button type="button" onClick={() => onNavigate?.("logs")} className="flex flex-col rounded-xl border border-muted bg-black/20 px-3 py-2.5 text-left transition-colors hover:border-primary/60 hover:bg-primary/5">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Logs</span>
                  <span className="mt-1 text-sm font-medium text-foreground">Chaos feed</span>
                  <span className="mt-0.5 text-[11px] text-muted-foreground">All the inside jokes</span>
                </button>

                <button type="button" onClick={() => onNavigate?.("about")} className="flex flex-col rounded-xl border border-muted bg-black/20 px-3 py-2.5 text-left transition-colors hover:border-muted/80 hover:bg-muted/10">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">About</span>
                  <span className="mt-1 text-sm font-medium text-foreground">Release notes</span>
                  <span className="mt-0.5 text-[11px] text-muted-foreground">How this portal works</span>
                </button>
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-2">
                  <Button type="button" variant="ghostHacker" size="sm" onClick={onShare}>
                    <Share2 className="mr-1.5 h-4 w-4" /> Share
                  </Button>
                  <Button type="button" variant="ghostHacker" size="sm" onClick={onDownloadCard}>
                    <Download className="mr-1.5 h-4 w-4" /> Download E-card
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  This app is hard-wired for <span className="font-medium text-primary">Chirag</span> — no name input needed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">Happy Birthday, Chirag! Level 16 unlocked.</div>

      <ConfettiBurst trigger={showConfetti} />
      <FireworksBurst trigger={showFireworks} />
    </section>
  );
};
