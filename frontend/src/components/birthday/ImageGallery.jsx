import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Image as ImageIcon } from "lucide-react";

// Image URLs - Personal Photos for Chirag
export const galleryImages = [
  {
    id: 1,
    url: "https://customer-assets.emergentagent.com/job_e61789e4-c19e-469e-accd-026b391c9c8f/artifacts/v3m6i31v_593428450_1892932697926540_3628987519635097342_n.jpg",
    label: "Epic Moment 1",
  },
  {
    id: 2,
    url: "https://customer-assets.emergentagent.com/job_e61789e4-c19e-469e-accd-026b391c9c8f/artifacts/jmx9buis_591323210_866297539311088_1747599040356254903_n.png",
    label: "Good Times",
  },
  {
    id: 3,
    url: "https://customer-assets.emergentagent.com/job_e61789e4-c19e-469e-accd-026b391c9c8f/artifacts/3tzd7b2u_591202377_1426922422287674_7722017154453940407_n.png",
    label: "Memory Lane",
  },
  {
    id: 4,
    url: "https://customer-assets.emergentagent.com/job_e61789e4-c19e-469e-accd-026b391c9c8f/artifacts/h7yh1cfn_591618856_1404028341303406_6672948542034263451_n.png",
    label: "Level Up",
  },
];

export const ImageGallery = ({ settings }) => {
  return (
    <Card className="card-elevated flex h-full flex-col border-secondary/40 bg-black/30">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-secondary">
          <ImageIcon className="h-4 w-4" />
          <p className="text-xs uppercase tracking-[0.18em]">Memory slots</p>
        </div>
        <CardTitle className="mt-1 text-lg font-semibold tracking-tight text-foreground">
          Party Gallery
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {settings.imagesEnabled ? (
          <div className="relative w-full flex-1">
            <Carousel className="h-full" opts={{ loop: true }}>
              <CarouselContent className="h-full">
                {galleryImages.map((img) => (
                  <CarouselItem key={img.id} className="h-full basis-full">
                    <div className="flex h-60 items-center justify-center rounded-2xl border border-secondary/50 bg-black/40 overflow-hidden sm:h-64">
                      <img
                        src={img.url}
                        alt={img.label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="mt-2 text-center text-sm font-medium text-foreground">{img.label}</p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ) : (
          <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-muted bg-black/30 px-6 text-center text-sm text-muted-foreground">
            Image gallery is toggled off in settings. Flip it back on when you drop the real photos.
          </div>
        )}
        
      </CardContent>
    </Card>
  );
};