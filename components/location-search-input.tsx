"use client";
import { CommandEmpty } from "@/components/ui/command";
import { fetcher } from "@/lib/fetch";
import { API_ROUTES } from "@/lib/routes";
import { ReviewLocation } from "@prisma/client";
import { CommandLoading } from "cmdk";
import { debounce, isEmpty } from "lodash-es";
import { useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

type LocationSearchInputProps = {
  onSelect?: (location: ReviewLocation) => void;
};

export default function LocationSearchInput({
  onSelect,
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
      setFoundLocations(locations);
      setIsListOpen(true);
      setLoading(false);
      return;
    } catch (error) {
      toast.error("Something went wrong with the search. Please try again.");
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
    <div className="relative w-full">
      <Popover open={isListOpen} onOpenChange={setIsListOpen}>
        <PopoverTrigger asChild>
          <Input
            placeholder="Find your next stamtisch..."
            type="search"
            onChange={debouncedSearch}
            className="w-full relative"
          />
        </PopoverTrigger>

        <PopoverContent
          className={cn(
            "animate-in fade-in-0 zoom-in-95  max-w-full w-full rounded-md bg-white outline-none shadow-sm overflow-hidden p-0",
            isListOpen ? "block" : "hidden",
          )}
          align="start"
        >
          {loading && <CommandLoading />}
          {foundLocations?.length === 0 && <CommandEmpty />}
          {foundLocations?.map((location) => (
            <div
              key={location.id}
              className="hover:bg-gray-50 flex flex-col py-4 px-4"
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
