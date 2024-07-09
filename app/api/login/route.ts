import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, _: NextResponse) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 400 },
      );
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          error: "Bad Request",
        },
        { status: 400 },
      );
    }

    cookies().set("currentUser", user.id, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return NextResponse.json(
      {
        ok: true,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        stack: error,
      },
      { status: 500 },
    );
  }
}
