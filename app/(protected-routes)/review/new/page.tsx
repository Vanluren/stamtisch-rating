"use client";
import LocationSearchInput from "@/components/location-search-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RatingInput } from "@/components/ui/rating-input";
import { Textarea } from "@/components/ui/textarea";
import { ReviewLocation } from "@prisma/client";
import { BeerIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type RatingInput = {
  overall: number;
  atmosphere: number;
  price: number;
};

export default function NewReviewPage() {
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<ReviewLocation>();
  const [ratings, setRating] = useState<RatingInput>({
    overall: 0,
    atmosphere: 0,
    price: 0,
  });

  const updateRatingState = (ratingKey: keyof RatingInput, rating: number) => {
    console.log(ratingKey, rating, ratings);

    return setRating({ ...ratings, [ratingKey]: rating });
  };
  const handleSubmit = (formData: FormData) => {
    try {
      setLoading(true);
      const comment = formData.get("comment");

      console.log(ratings);

      setLoading(false);
      toast.success("Review submitted successfully");
      return;
    } catch (error) {
      toast.error("Failed to submit review");
      return;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col">
          <h1
            className={`text-3xl font-bold ${selectedLocation ? "text-primary" : "text-gray-400"}`}
          >
            {selectedLocation ? selectedLocation.name : "New Review"}
          </h1>
          <p className="text-muted-foreground">
            {selectedLocation
              ? selectedLocation.address
              : "Search for a location to review"}
          </p>
        </div>
        <form className="mt-8 space-y-6 relative" action={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Label htmlFor="location">Location</Label>
              <LocationSearchInput
                onSelect={(location) => setSelectedLocation(location)}
                selectedLocation={selectedLocation}
              />
            </div>

            {Object.entries(ratings).map(([key, value]) => (
              <div key={key} className="w-full">
                <Label htmlFor="rating" className="capitalize">
                  {key}
                </Label>
                <RatingInput
                  size={40}
                  onRatingChange={(val) =>
                    updateRatingState(key as keyof RatingInput, val)
                  }
                  rating={value}
                />
              </div>
            ))}

            <div>
              <Label htmlFor="comment">Comment</Label>
              <Textarea id="comment" name="comment" />
            </div>

            <Button type="submit">
              {loading ? "Loading..." : "Submit review"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
