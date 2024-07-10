import prisma from "@/lib/prisma";
import { ReviewStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const ownerId = cookies().get("currentUser")?.value;
    const body = await request.json();

    if (!ownerId) {
      return NextResponse.json(
        { message: "You need to be logged in to create a review" },
        { status: 401 },
      );
    }

    const { locationId, rating, comment } = await body;

    const review = await prisma.review.create({
      data: {
        status: ReviewStatus.INACTIVE,
        ratings: {
          create: {
            userId: ownerId,
            rating: rating,
          },
        },
        description: comment,

        title: "",
        location: {
          connect: {
            id: locationId,
          },
        },
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    });

    return NextResponse.json({ review, ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
