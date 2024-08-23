"use client";
import { ReviewLocation } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RatingInput } from "../ui/rating-input";
import LocationDetailImage from "./image";
import LocationDetailsDescription from "./description";
import { fetcher } from "@/lib/fetch";
import { API_ROUTES } from "@/lib/routes";
import { toast } from "sonner";
import { PlaceDetails } from "@/app/api/location-details/[placeId]/route";
import { createGooglePhotoUrl } from "@/lib/google";

type LocationDetailsProps = {
  name: ReviewLocation["name"];
  address: ReviewLocation["address"];
  rating: number;
  numberOfReviews: number;
  placeId: ReviewLocation["placeId"];
};

export default function LocationDetails({
  placeId,
  name,
  rating,
  address,
  numberOfReviews,
}: LocationDetailsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState<PlaceDetails | null>(null);

  const fetchLocationDetails = useCallback(async () => {
    try {
      const response = await fetcher<{ ok: boolean; details: PlaceDetails }>(
        API_ROUTES["location-details"].fetchByPlaceId.replace(":id", placeId),
        {
          method: "GET",
        },
      );
      setDetails(response.details);
      toast.error("Failed to fetch location details");
    } finally {
      setTimeout(() => setIsLoading(false), 250);
    }
  }, [placeId]);

  const locationPhotoSrc = useMemo(
    () =>
      createGooglePhotoUrl(placeId, details?.mainPhoto.photo_reference ?? ""),
    [details, placeId],
  );

  useEffect(() => {
    fetchLocationDetails();
  }, [fetchLocationDetails]);

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:grid-col-reverse">
      <div className="sm:order-last">
        <LocationDetailImage
          isLoading={isLoading || !details?.mainPhoto.photo_reference}
          src={locationPhotoSrc}
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <h2 className="text-lg text-muted-foreground mt-1">{address}</h2>
        <div className="mt-4 flex items-center">
          <div className="flex items-center gap-1">
            <RatingInput interactive={false} rating={rating} />
          </div>
          <span className="ml-2 text-2xl font-bold">{rating}</span>
          <span className="ml-2 text-muted-foreground">
            ({numberOfReviews} reviews)
          </span>
        </div>
        <div className="mt-4">
          <LocationDetailsDescription
            isLoading={isLoading}
            text={"æaljskdflaksdjfæljk"}
          />
        </div>
      </div>
    </div>
  );
}
