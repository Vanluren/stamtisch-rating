import prisma from "@/lib/prisma";
import { Profile, User } from "@prisma/client";
import { NextRequest } from "next/server";

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
      return Response.json({
        status: 404,
        message: "Profile not found",
      });
    }

    return Response.json({
      status: 200,
      profile,
    });
  } catch (error) {
    console.error(error);
  }
}
