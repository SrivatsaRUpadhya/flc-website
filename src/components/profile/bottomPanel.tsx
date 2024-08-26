import Image from "next/image";
import React, { forwardRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

import { RadialCard } from "~/components/utils/radialCard";
import { cn } from "~/lib/utils";
import { type User, useUser } from "~/store";

const BottomPanel = forwardRef<
  HTMLDivElement,
  { className?: string; notMine: boolean }
>(({ className, notMine }, ref) => {
  const { user } = useUser();
  if (!user) return null;
  return (
    <InnerBottomPanel
      ref={ref}
      className={className}
      user={user}
      notMine={notMine}
    />
  );
});
BottomPanel.displayName = "BottomPanel";

const InnerBottomPanel = forwardRef<
  HTMLDivElement,
  { className?: string; user: User; notMine: boolean }
>(({ className, user }, ref) => {
  const images = user.Team.reduce(
    (acc, team) => (team.Event.imgSrc ? [...acc, team.Event.imgSrc] : acc),
    [] as string[],
  );
  return (
    <RadialCard
      ref={ref}
      className={cn(
        className,
        "flex flex-col items-center gap-5 overflow-hidden rounded-lg border-opacity-50 bg-card p-10 backdrop-blur-[32px] backdrop-filter",
      )}
    >
      <p className="text-lg font-bold">My Events</p>
      {images.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {images.map((image, idx) => (
              <CarouselItem key={idx} className="relative size-40">
                <Image src={image} alt={image} fill />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p className="my-auto opacity-60">No Events registered</p>
      )}
    </RadialCard>
  );
});
InnerBottomPanel.displayName = "InnerBottomPanel";

export default BottomPanel;
