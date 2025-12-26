import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { ImageGallery } from "@/components/birthday/ImageGallery";

export const placeholderImages = [
  {
    id: 1,
    label: "Future party photo slot",
  },
  {
    id: 2,
    label: "Chirag & chaos squad",
  },
  {
    id: 3,
    label: "Rare moment: awake",
  },
];

export const InsideJokeAndGallery = ({ settings }) => {
  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-16 pt-4 sm:px-6 lg:flex-row lg:px-10">
      
      <div className="flex-1">
        <Card className="card-elevated border-primary/40 bg-black/30">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.18em]">Insider logs</p>
            </div>
            <CardTitle className="mt-1 text-lg font-semibold tracking-tight text-foreground">
              Panda mode: always on
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Chirag lives life on energy-saving mode. Minimal movement. Maximum chill.
            </p>
            <p>
              Eats. Sleeps. Disappears. Reappears. No one knows the schedule.
            </p>
            <p>
              If doing nothing was a sport, Chirag would still come first… effortlessly.
            </p>
            <p>
              Plans? Maybe. Execution? Tomorrow. Or next week. Or never.
            </p>
            <p>
              The only guy who can look busy while doing absolutely nothing.
            </p>

            <p className="pt-1 text-xs text-muted-foreground/80">
              This lore is permanent. Panda updates are rare.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1">
        <ImageGallery settings={settings} />
      </div>

    </section>
  );
};
