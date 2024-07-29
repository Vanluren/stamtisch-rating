"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

const ratingVariants = {
  default: {
    star: "fill-primary stroke-primary",
    emptyStar: "text-muted-foreground",
  },
};

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement;
  variant?: keyof typeof ratingVariants;
  onRatingChange?: (rating: number) => void;
  name?: string;
}

export const RatingInput = ({
  rating: initialRating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = "default",
  name = "rating",
  onRatingChange,
  ...props
}: RatingsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(initialRating);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0",
    );
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoverRating(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0",
    );
    setCurrentRating(starIndex);
    setHoverRating(null);
    onRatingChange?.(starIndex);
  };

  const displayRating = hoverRating ?? currentRating;
  const fullStars = Math.floor(displayRating);

  return (
    <div
      className={cn("flex w-fit items-center gap-4 cursor-pointer")}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="flex items-center" onMouseEnter={handleMouseEnter}>
        {[...Array(fullStars)].map((_, i) =>
          React.cloneElement(Icon, {
            key: i,
            size,
            className: cn(
              fill
                ? "fill-current stroke-current stroke-1"
                : "fill-transparent",
              ratingVariants[variant].star,
              "cursor-pointer",
            ),
            onClick: handleClick,
            onMouseEnter: handleMouseEnter,
            onTouchEnd: handleClick,
            "data-star-index": i + 1,
          }),
        )}
        {[...Array(Math.max(0, totalStars - fullStars))].map((_, i) =>
          React.cloneElement(Icon, {
            key: i + fullStars + 1,
            size,
            className: cn("stroke-1", ratingVariants[variant].emptyStar),
            onClick: handleClick,
            onMouseEnter: handleMouseEnter,
            onTouchEnd: handleClick,
            "data-star-index": i + fullStars + 1,
          }),
        )}
      </div>
    </div>
  );
};
