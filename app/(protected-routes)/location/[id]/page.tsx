import LocationDetails from "@/components/LocationDetails";
import { RatingInput } from "@/components/ui/rating-input";
import { fetcher } from "@/lib/fetch";
import { API_ROUTES } from "@/lib/routes";
import { Rating, Review, ReviewLocation } from "@prisma/client";

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
      <LocationDetails
        placeId={location.placeId}
        name={location.name}
        rating={rating}
        address={location.address}
        numberOfReviews={location.reviews.length}
      />
    </div>
  );
}
