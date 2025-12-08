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
    label: "Legendary midnight deploy",
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
              More chaotic energy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Still cant believe that time you accidentally deployed to prod and it worked??
            </p>
            <p>
              Chirag, the only man who can break AND fix the app in the same minute 
            </p>
            <p>
              We said no more midnight deploys and you still hit that button
            </p>
            <p className="pt-1 text-xs text-muted-foreground/80">
              This card is hard-coded lore. Swap the copy in <code className="rounded bg-muted/60 px-1 py-0.5 text-[11px]">meta.json</code> later if you want new stories.
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