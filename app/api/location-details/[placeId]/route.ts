import { googlePlaceDetails } from "@/lib/google";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { placeId: string } },
) {
  try {
    const details = await googlePlaceDetails(params.placeId);

    console.log("details", details);

    return NextResponse.json({ details }, { status: 200 });
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
