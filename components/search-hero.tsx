"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function SearchHero() {
  const handleAddRating = () => {
    // Add rating logic here
  };
  return (
    <header className="bg-secondary  py-12 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Discover the Best Stamtisch in Town
          </h1>
          <p className="text-lg md:text-xl">
            Find the perfect stamtisch for any occasion with our comprehensive
            ratings and reviews.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl mx-auto">
            <Input
              type="search"
              placeholder="Search for bars..."
              className="flex-1 w-full text-primary-background"
            />
            <Button onClick={handleAddRating} disabled>
              <PlusIcon className="w-4 h-4 mr-2" />
              Add a Rating
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
