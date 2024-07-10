import { googlePlacesTextSearch } from "@/lib/google";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ url }: NextRequest) {
  try {
    const query = new URL(url).searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        {
          message: "query parameter is required",
        },
        { status: 400 },
      );
    }

    const response = await googlePlacesTextSearch(query);

    if (!response) {
      return NextResponse.json(
        {
          message: "No locations found",
        },
        { status: 404 },
      );
    }

    const locations = await Promise.all(
      response?.map(async (place) => {
        const existingLocation = await prisma.reviewLocation.findFirst({
          where: {
            placeId: place.id,
          },
        });

        if (existingLocation) {
          return existingLocation;
        }

        return prisma.reviewLocation.create({
          data: {
            placeId: place.id,
            name: place.displayName.text,
            address: place.formattedAddress,
            latitude: place.location.latitude,
            longitude: place.location.longitude,
          },
        });
      }),
    );

    return NextResponse.json({ locations }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
