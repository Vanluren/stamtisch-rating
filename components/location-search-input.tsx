"use client";
import { fetcher } from "@/lib/fetch";
import { API_ROUTES } from "@/lib/routes";
import { ReviewLocation } from "@prisma/client";
import { debounce, isEmpty } from "lodash-es";
import { ReactElement, useRef, useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { PopoverAnchor } from "@radix-ui/react-popover";

type LocationSearchInputProps = {
  onSelect?: (location: ReviewLocation) => void;
  selectedLocation?: ReviewLocation;
};

export default function LocationSearchInput({
  onSelect,
  selectedLocation,
}: LocationSearchInputProps) {
  const [foundLocations, setFoundLocations] = useState<
    ReviewLocation[] | null
  >();
  const [loading, setLoading] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  const onSearchChange = async (query: string) => {
    try {
      if (isEmpty(query)) {
        setIsListOpen(false);
        setFoundLocations(null);
        return;
      }

      setLoading(true);
      const { locations } = await fetcher<{ locations: ReviewLocation[] }>(
        API_ROUTES.locations.search,
        {
          query: {
            query,
          },
        },
      );

      setFoundLocations(locations ?? []);
      setIsListOpen(true);
      setLoading(false);
      return;
    } catch (error) {
      toast.error("Something went wrong with the search. Please try again.");
      setLoading(false);
      return;
    }
  };

  const onSelectLocation = (location: ReviewLocation) => {
    onSelect?.(location);
    setIsListOpen(false);
  };

  const debouncedSearch = debounce(
    (event) => onSearchChange(event.target.value),
    500,
  );

  return (
    <div className="w-full max-w-full overflow-hidden">
      <Popover open={isListOpen} onOpenChange={setIsListOpen}>
        <PopoverAnchor className="w-full min-w-38">
          <Input
            placeholder="Find your next stamtisch..."
            onChange={debouncedSearch}
            className="w-full relative"
            value={`${selectedLocation?.name}, ${selectedLocation?.address}`}
            type="text"
          />
        </PopoverAnchor>

        <PopoverContent
          className={cn(
            "animate-in fade-in-0 zoom-in-95  w-[var(--radix-popover-trigger-width)] max-w-full min-h-16 rounded-md bg-white outline-none shadow-sm overflow-hidden p-0 relative flex h-full flex-col  bg-popover text-popover-foreground",
            isListOpen ? "block" : "hidden",
          )}
          align="center"
        >
          {loading && (
            <div className="flex flex-col py-4 px-4">
              <span>Loading...</span>
            </div>
          )}
          {foundLocations?.length === 0 && (
            <div className="flex flex-col py-4 px-4 justify-center items-center text-gray-400">
              <span>No locations found</span>
            </div>
          )}
          {foundLocations?.map((location) => (
            <div
              key={location.id}
              className="hover:bg-gray-50 flex flex-col py-4 px-4 cursor-pointer"
              onSelect={() => onSelectLocation(location)}
              onClick={() => onSelectLocation(location)}
            >
              <span>{location.name}</span>
              <span className="text-gray-400">{location.address}</span>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
