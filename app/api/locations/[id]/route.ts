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


    await fetcher()}
    return NextResponse.json({ location }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", },
      { status: 500 },
    );
  }
}
