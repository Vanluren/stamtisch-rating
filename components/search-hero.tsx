"use client";

import { debounce, isEmpty } from "lodash-es";
import { Input } from "@/components/ui/input";
import { API_ROUTES, ROUTES } from "@/lib/routes";
import { fetcher } from "@/lib/fetch";
import { useState } from "react";
import { ReviewLocation } from "@prisma/client";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

export default function SearchHero() {
  const [locations, setLocations] = useState<ReviewLocation[] | null>();
  const [loading, setLoading] = useState(false);

  const onSearchChange = async (query: string) => {
    try {
      if (isEmpty(query)) return;

      const { locations } = await fetcher<{ locations: ReviewLocation[] }>(
        API_ROUTES.locations.search,
        {
          query: {
            query,
          },
        },
      );
      setLocations(locations);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedSearch = debounce((input) => onSearchChange(input), 500);

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
            <Command>
              <CommandInput
                placeholder="Search for bars..."
                onValueChange={debouncedSearch}
              />

              <CommandList>
                {locations?.length === 0 && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
              </CommandList>
            </Command>

            <div className="hidden relative w-full items-center before:content-[''] before:bg-gray-400 before:w-[45%] before:h-[.5px] before:absolute before:left-0 before:top-[12px] after:content-[''] after:bg-gray-400 after:w-[45%] after:h-[.5px] after:absolute after:right-0 after:top-[12px]">
              <div className="mx-2 text-gray-400">OR</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
