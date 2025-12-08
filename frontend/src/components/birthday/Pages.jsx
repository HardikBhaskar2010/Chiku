import React from "react";
import { HeroSection } from "@/components/birthday/HeroSection";
import { InsideJokeAndGallery, placeholderImages } from "@/components/birthday/InsideJokeAndGallery";
import { SettingsPanel } from "@/components/birthday/SettingsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, PartyPopper, Info, Image as ImageIcon, TerminalSquare, ListChecks } from "lucide-react";

export const HomePage = (props) => {
  return (
    <>
      <HeroSection {...props} />
      <InsideJokeAndGallery settings={props.settings} />
      <SettingsPanel
        settings={props.settings}
        onChange={props.onSettingsChange}
        onRevealEasterEgg={props.onRevealEasterEgg}
      />
    </>
  );
};

export const GalleryPage = ({ settings }) => {
  const { galleryImages } = require("@/components/birthday/ImageGallery");
  
  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-20 pt-10 sm:px-6 lg:px-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-secondary">Gallery · Party memory slots</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Visual logbook for Chirags Level 16
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Edit image URLs in <code className="rounded bg-muted/60 px-1 py-0.5 text-xs">/components/birthday/ImageGallery.jsx</code> to add your own photos.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {galleryImages.map((img, idx) => (
          <Card key={img.id} className="card-elevated flex min-h-[240px] flex-col border-secondary/50 bg-black/30 overflow-hidden">
            <div className="h-48 w-full overflow-hidden">
              <img
                src={img.url}
                alt={img.label}
                className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                loading="lazy"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-secondary">
                <ImageIcon className="h-4 w-4" />
                <p className="text-[11px] uppercase tracking-[0.18em]">Photo {idx + 1}</p>
              </div>
              <CardTitle className="mt-1 text-sm font-semibold text-foreground">
                {img.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between pb-4 text-xs text-muted-foreground">
              <p className="mt-1 text-[11px] text-muted-foreground/80">
                Memory captured for <span className="font-medium text-secondary">Chirag</span>&apos;s special day.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export const LogsPage = () => {
  const logs = [
    {
      icon: <TerminalSquare className="h-4 w-4" />,
      title: "Accidental prod deploy",
      body: "Still cant believe that time you accidentally deployed to prod and it worked??",
    },
    {
      icon: <Sparkles className="h-4 w-4" />,
      title: "Break it, then fix it",
      body: "Chirag, the only man who can break AND fix the app in the same minute ",
    },
    {
      icon: <PartyPopper className="h-4 w-4" />,
      title: "Midnight deploy pact broken",
      body: "We said no more midnight deploys and you still hit that button",
    },
  ];

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-20 pt-10 sm:px-6 lg:px-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Chaos logs · Insider jokes</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Internal release notes for Chirags chaos engine
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          A dedicated feed for the moments that turned into lore. All jokes are baked-in, no user input or generic forms
          anywhere.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {logs.map((log) => (
          <Card key={log.title} className="card-elevated flex min-h-[180px] flex-col border-primary/40 bg-black/30">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                {log.icon}
                <p className="text-[11px] uppercase tracking-[0.18em]">Chaos log</p>
              </div>
              <CardTitle className="mt-1 text-sm font-semibold text-foreground">{log.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between pb-4 text-xs text-muted-foreground">
              <p>{log.body}</p>
              <p className="mt-3 text-[11px] text-muted-foreground/80">
                Hard-coded just for <span className="font-medium text-primary">Chirag</span>.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export const AboutPage = () => {
  const bullets = [
    "Level 16 unlocked: more XP, more side quests, more midnight pizza.",
    "Confetti mapped to the C key for instant party mode.",
    "Matrix-style letter rain throttled when the tab is hidden to save your GPU.",
    "Settings persist locally so every visit remembers how chaotic you like it.",
  ];

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-20 pt-10 sm:px-6 lg:px-10">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">About this build</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Release notes for &quot;Happy Birthday, Chirag!&quot; v16.0
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          A single-user web app wired entirely around you &mdash; no name fields, no generic flows, just a dedicated birthday
          console.
        </p>
      </header>
      <Card className="card-elevated border-muted bg-black/30">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <Info className="h-4 w-4" />
            <p className="text-[11px] uppercase tracking-[0.18em]">Changelog highlights</p>
          </div>
          <CardTitle className="mt-1 text-lg font-semibold text-foreground">What this page does</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <ul className="list-inside list-disc space-y-1">
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground/80">
            <div className="inline-flex items-center gap-1 rounded-full border border-muted bg-black/40 px-3 py-1">
              <ListChecks className="h-3.5 w-3.5" />
              <span>Confetti, gallery, jokes, and HUD are all single-user presets.</span>
            </div>
            <p>
              Share link remains <span className="font-mono text-primary">https://example.com/chirag</span> &mdash; no params
              needed.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};