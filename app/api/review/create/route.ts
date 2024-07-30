import prisma from "@/lib/prisma";
import { Rating } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const authorId = cookies().get("currentUser")?.value;
    const body = await request.json();

    if (!authorId) {
      return NextResponse.json(
        { message: "You need to be logged in to create a review" },
        { status: 403 },
      );
    }

    const { locationId, ratings, comment } = await body;

    const review = await prisma.review.create({
      data: {
        location: {
          connect: {
            id: locationId,
          },
        },
        author: {
          connect: {
            id: authorId,
          },
        },
        ratings: {
          createMany: {
            data: ratings.map((rating: Partial<Rating>) => ({
              userId: authorId,
              locationId,
              ...rating,
            })),
          },
        },
        description: comment,
      },
    });

    return NextResponse.json({ review, ok: true }, { status: 201 });
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
