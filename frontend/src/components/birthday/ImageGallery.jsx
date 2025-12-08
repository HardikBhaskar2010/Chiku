import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Image as ImageIcon } from "lucide-react";

// Image URLs - YOU CAN EDIT THESE MANUALLY
export const galleryImages = [
  {
    id: 1,
    url: "https://scontent.fdel52-1.fna.fbcdn.net/v/t1.15752-9/591323210_866297539311088_1747599040356254903_n.png?_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_ohc=_6dmrqIuDnUQ7kNvwE1D0jd&_nc_oc=Adl1Yggo8hk43BQn0_UlLG_oD24wwQVSLSrKw9DEavQ4BYr9afw5OScGtJ-mEZouq_Q&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fdel52-1.fna&oh=03_Q7cD4AHlH9zPqQa4s10DurH6Hsm5sShx7x9EuVI8JIWCkUHn9w&oe=695B4DFB",
    label: "Birthday Party 1",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800",
    label: "Celebration Moment",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
    label: "Party Time",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800",
    label: "Friends Together",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800",
    label: "Happy Memories",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800",
    label: "Special Day",
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
        <p className="text-[11px] text-muted-foreground">
          All image URLs can be edited in{" "}
          <code className="rounded bg-muted/60 px-1 py-0.5 text-[11px]">
            /src/components/birthday/ImageGallery.jsx
          </code>
        </p>
      </CardContent>
    </Card>
  );
};