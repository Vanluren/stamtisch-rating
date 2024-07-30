import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

type LocationDetailImageProps = {
  isLoading: boolean;
  src?: string;
};

export default function LocationDetailImage({
  isLoading,
  src,
}: LocationDetailImageProps) {
  if (!src) {
    return null;
  }

  if (isLoading) {
    return <Skeleton className="h-[200px] w-full rounded-xl" />;
  }

  return (
    <div>
      <Image
        src="https://loremflickr.com/600/400/pub"
        alt="The Cozy Pub"
        width={600}
        height={400}
        className="rounded-lg object-cover"
      />
    </div>
  );
}
