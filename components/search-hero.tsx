"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import Link from "next/dist/client/link";

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
          <div className="flex flex-col sm:flex-col items-center gap-4 w-full max-w-xl mx-auto">
            <Input
              type="search"
              placeholder="Search for bars..."
              className="flex-1 w-full text-primary-background"
            />
            <div className="relative w-full items-center before:content-[''] before:bg-gray-400 before:w-[45%] before:h-[.5px] before:absolute before:left-0 before:top-[12px] after:content-[''] after:bg-gray-400 after:w-[45%] after:h-[.5px] after:absolute after:right-0 after:top-[12px]">
              <div className="mx-2 text-gray-400">OR</div>
            </div>

            <Button onClick={handleAddRating} asChild>
              <Link href={ROUTES.RATING_ACTIVITY.NEW}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Start a new rating
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
