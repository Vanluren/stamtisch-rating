import prisma from "@/lib/prisma";
import { genSalt, hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  return hash(password, salt);
};

export async function GET() {
  return NextResponse.json({
    status: 405,
    message: "Method not allowed",
  });
}

export async function PUT() {
  return NextResponse.json({
    status: 405,
    message: "Method not allowed",
  });
}

export async function PATCH() {
  return NextResponse.json({
    status: 405,
    message: "Method not allowed",
  });
}

export async function POST(request: NextRequest, _: NextResponse) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({
        status: 400,
        error: "Missing required fields",
      });
    }

    if (await prisma.user.findUnique({ where: { email } })) {
      return NextResponse.json({
        status: 400,
        error: "User with this email already exists",
      });
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

    return NextResponse.json({
      status: 200,
      user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      error: "Error creating user",
    });
  }
}
