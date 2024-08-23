import { googlePlaceDetails } from "@/lib/google";
import { NextRequest, NextResponse } from "next/server";

export type PlaceDetails = {
  rating: number;
  websiteUri: string;
  googleMapsUri: string;
  mainPhoto: { height: number; width: number; photo_reference: string };
  photos: { height: number; width: number; photo_reference: string }[];
};

export async function GET(
  _: NextRequest,
  { params }: { params: { placeId: string } },
) {
  try {
    const details = await googlePlaceDetails(params.placeId);

    console.log({
      rating: details?.rating,
      websiteUri: details?.websiteUri,
      googleMapsUri: details?.url,
      mainPhoto: details?.photos[0],
      photos: details?.photos.slice(1),
    });

    return NextResponse.json(
      {
        ok: true,
        details: {
          rating: details?.rating,
          websiteUri: details?.websiteUri,
          googleMapsUri: details?.url,
          mainPhoto: details?.photos[0],
          photos: details?.photos.slice(1),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message, { stack: error.stack });
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
