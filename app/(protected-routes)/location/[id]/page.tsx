import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetcher } from "@/lib/fetch";
import { API_ROUTES } from "@/lib/routes";
import { ReviewLocation } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";

export default async function LocationPage({
  params,
}: {
  params: { id: string };
}) {
  const { location } = await fetcher<{ location: ReviewLocation, placeInfo:  }>(
    API_ROUTES.locations.fetchById.replace(":id", params.id),
    {
      method: "GET",
    },
  );

  if (!location) {
    return;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold">{location.name}</h1>
          <div className="mt-4 flex items-center">
            <div className="flex items-center gap-1">
              <StarIcon className="h-6 w-6 fill-primary" />
              <StarIcon className="h-6 w-6 fill-primary" />
              <StarIcon className="h-6 w-6 fill-primary" />
              <StarIcon className="h-6 w-6 fill-primary" />
              <StarIcon className="h-6 w-6 fill-muted stroke-muted-foreground" />
            </div>
            <span className="ml-2 text-2xl font-bold">4.5</span>
            <span className="ml-2 text-muted-foreground">(120 reviews)</span>
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
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="mt-4 grid gap-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                </div>
                <span className="text-sm font-medium">4.0</span>
              </div>
              <p className="mt-2">
                I had a great time at The Cozy Pub! The atmosphere was
                incredibly cozy and inviting, and the staff was so friendly and
                attentive. The cocktails were delicious and the food was
                fantastic. I&apos;ll definitely be back!
              </p>
              <div className="mt-2 text-sm text-muted-foreground">
                John Doe - June 1, 2023
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-primary" />
                </div>
                <span className="text-sm font-medium">5.0</span>
              </div>
              <p className="mt-2">
                The Cozy Pub is my new favorite spot in town! The drinks are
                amazing, the food is delicious, and the atmosphere is just
                perfect. The staff is always so friendly and welcoming. I highly
                recommend this place to anyone looking for a great night out.
              </p>
              <div className="mt-2 text-sm text-muted-foreground">
                Alice Smith - May 15, 2023
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-primary" />
                  <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                </div>
                <span className="text-sm font-medium">3.0</span>
              </div>
              <p className="mt-2">
                I had a mixed experience at The Cozy Pub. The atmosphere was
                nice, but the service was a bit slow and the food was just okay.
                I might give it another try, but I wasn&apos;t overly impressed.
              </p>
              <div className="mt-2 text-sm text-muted-foreground">
                Michael Johnson - April 20, 2023
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
