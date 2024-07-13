import prisma from "@/lib/prisma";
import { genSalt, hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  return hash(password, salt);
};

export async function POST(request: NextRequest, _: NextResponse) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 },
      );
    }

    if (await prisma.user.findUnique({ where: { email } })) {
      return NextResponse.json(
        {
          error: "User with this email already exists",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.$transaction(async () => {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      if (!user) {
        throw new Error("Error creating user");
      }

      const profile = await prisma.profile.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          firstName,
          lastName,
        },
      });

      if (!profile) {
        throw new Error("Error creating user profile");
      }

      return user;
    });

    return NextResponse.json(
      {
        user,
        ok: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error creating user",
      },
      { status: 500 },
    );
  }
}
