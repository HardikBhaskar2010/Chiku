import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "home", label: "Home", description: "Main hacker view" },
  { id: "gallery", label: "Gallery", description: "Party memory slots" },
  { id: "logs", label: "Logs", description: "Chaos & inside jokes" },
  { id: "about", label: "About", description: "Release notes for Level 16" },
];

export const LayoutShell = ({ active, onNavigate, children }) => {
  return (
    <main className="relative flex min-h-screen flex-col bg-background text-foreground">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-4 pb-3 pt-3 sm:px-6 lg:px-10">
        <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-primary/40 bg-black/40 px-3 py-1 text-xs text-primary shadow-soft backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow-primary" aria-hidden="true" />
          <span className="font-medium">Birthday console · Chirag</span>
        </div>
        <nav className="pointer-events-auto hidden items-center gap-1 text-[11px] text-muted-foreground sm:flex" aria-label="Primary">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              className={cn(
                buttonVariants({
                  variant: active === tab.id ? "ghostHacker" : "ghost",
                  size: "sm",
                }),
                "h-7 px-3 text-[11px]",
              )}
              aria-current={active === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="pt-16 sm:pt-20 lg:pt-24">{children}</div>

      <footer className="mt-auto border-t border-border/60 bg-[hsl(var(--bg-soft))] px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p>
            Crafted as a one-off birthday portal for <span className="font-medium text-primary">Chirag</span>.
          </p>
          <p className="text-[11px] text-muted-foreground/80">
            Use the HUD cards as navigation to roam between screens.
          </p>
        </div>
      </footer>
    </main>
  );
};
