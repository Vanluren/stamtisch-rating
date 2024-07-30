import { Skeleton } from "@/components/ui/skeleton";

type LocationDetailsDescriptionProps = {
  isLoading: boolean;
  text: string;
};
export default function LocationDetailsDescription({
  isLoading,
  text,
}: LocationDetailsDescriptionProps) {
  if (!text) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  return <p className="mt-4 text-muted-foreground">{text}</p>;
}
