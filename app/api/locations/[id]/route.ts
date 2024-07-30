import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const locationId = params.id;

    if (!locationId) {
      return NextResponse.json(
        {
          message: "locationId parameter is required",
        },
        { status: 400 },
      );
    }

    const location = await prisma.reviewLocation.findUnique({
      where: {
        id: locationId,
      },
      include: {
        reviews: true,
        ratings: true,
      },
    });

    if (!location) {
      return NextResponse.json(
        {
          message: "Location not found",
        },
        { status: 404 },
      );
    }
    const ratingsAggregated = await prisma.rating.aggregate({
      where: {
        location: {
          id: locationId,
        },
      },
      _avg: {
        rating: true,
      },
    });

    console.log("rating", Math.round(ratingsAggregated._avg.rating ?? 0));

    return NextResponse.json(
      { location, rating: Math.round(ratingsAggregated._avg.rating ?? 0) },

      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message, { stack: error.stack });
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
