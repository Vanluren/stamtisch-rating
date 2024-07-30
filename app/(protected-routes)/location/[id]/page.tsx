import { GET as getLocation } from "@/app/api/locations/[id]/route";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RatingInput } from "@/components/ui/rating-input";
import { fetcher } from "@/lib/fetch";
import { API_ROUTES } from "@/lib/routes";
import { Rating, Review, ReviewLocation } from "@prisma/client";
import { Return } from "@prisma/client/runtime/library";
import { StarIcon } from "lucide-react";
import Image from "next/image";

export default async function LocationPage({
  params,
}: {
  params: { id: string };
}) {
  const { location, rating } = await fetcher<{
    location: ReviewLocation & { ratings: Rating[]; reviews: Review[] };
    rating: number;
  }>(API_ROUTES.locations.fetchById.replace(":id", params.id), {
    method: "GET",
  });

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold">{location.name}</h1>
          <div className="mt-4 flex items-center">
            <div className="flex items-center gap-1">
              <RatingInput rating={rating} interactive={false} />
            </div>
            <span className="ml-2 text-2xl font-bold">{rating}</span>
            <span className="ml-2 text-muted-foreground">
              ({location.reviews.length} reviews)
            </span>
          </div>
          <p className="mt-4 text-muted-foreground">
            The Cozy Pub is a charming neighborhood bar known for its cozy
            atmosphere, friendly staff, and delicious craft cocktails. With a
            focus on local ingredients and a rotating selection of beers on tap,
            it&apos;s a favorite among locals and visitors alike.
          </p>
        </div>
        <div>
          <Image
            src="/loremflickr.com/600/400/pub"
            alt="The Cozy Pub"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
