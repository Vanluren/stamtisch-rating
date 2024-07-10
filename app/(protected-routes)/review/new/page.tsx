"use client";
import LocationSearchInput from "@/components/location-search-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReviewLocation } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";

export default function NewReviewPage() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<ReviewLocation | null>(null);

  const handleSubmit = (formData: FormData) => {
    try {
      setLoading(true);
      const locationId = formData.get("location");
      const rating = formData.get("rating");
      const comment = formData.get("comment");

      alert(
        `Submitting review for location ${locationId} with rating ${rating} and comment ${comment}`,
      );

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
            className={`text-3xl font-bold ${location ? "text-primary" : "text-gray-400"}`}
          >
            {location ? location.name : "Select a location"}
          </h1>
        </div>

        <form className="mt-8 space-y-6" action={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <LocationSearchInput
                onSelect={(location) => setLocation(location)}
              />
            </div>

            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input type="number" id="rating" min={1} max={10} />
            </div>

            <div>
              <Label htmlFor="comment">Comment</Label>
              <Textarea id="comment" />
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
