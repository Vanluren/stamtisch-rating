import prisma from "@/lib/prisma";
import { Profile } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  try {
    const body = (await request.json()) as Partial<Profile>;

    const profile = await prisma.profile.update({
      where: {
        id,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        bio: body.bio,
        avatar: body.avatar,
      },
      include: {
        user: true,
      },
    });

    if (!profile) {
      return NextResponse.json(
        {
          message: "Profile not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        profile,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
