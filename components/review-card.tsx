import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";
import { Review } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ReviewCardProps = {
  id: Review["id"];
  title: Review["title"];
  description: Review["description"];
  images?: Review["imagePaths"];
};

const ImageBlocks = ({ images }: { images?: string[] }) => {
  if (images?.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-4">
      {images?.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt="The Speakeasy"
          width={300}
          height={200}
          className="rounded-md object-cover"
        />
      ))}
    </div>
  );
};

export default function ReviewCard({
  id,
  title,
  description,
  images,
}: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold capitalize">{title}</h3>

          <div className="flex items-center gap-1 text-primary">
            <StarIcon className="w-4 h-4" />
            <span className="font-medium">4.7</span>
          </div>
        </div>
        <ImageBlocks images={images} />
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
        <Link
          href={ROUTES.REVIEW_DETAILS(id)}
          className="text-sm font-medium hover:underline mt-2"
          prefetch={false}
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  );
}
