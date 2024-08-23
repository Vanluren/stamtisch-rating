"use client";
import { createGooglePhotoUrl } from "@/lib/google";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { useState } from "react";
import PlaceholderImage from "@/public/images/placehoder-image.svg";

type LocationDetailImageProps = {
  isLoading: boolean;
  src?: string;
};

export default function LocationDetailImage({
  isLoading,
  src,
}: LocationDetailImageProps) {
  const [internalSrc, setInternalSrc] = useState<string>(src ?? "");

  if (!src) {
    return null;
  }

  if (isLoading) {
    return <Skeleton className="h-[250px] w-full rounded-xl" />;
  }

  return (
    <div>
      <Image
        src={internalSrc}
        alt="The Cozy Pub"
        width={600}
        height={400}
        className="rounded-lg object-cover"
        onError={() => setInternalSrc(PlaceholderImage)}
      />
    </div>
  );
}
