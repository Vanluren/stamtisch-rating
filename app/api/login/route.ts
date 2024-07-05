import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, _: NextResponse) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({
        status: 400,
        error: "Missing required fields",
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return Response.json({
        status: 400,
        error: "User not found",
      });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return Response.json({
        status: 400,
        error: "Invalid password",
      });
    }

    cookies().set("currentUser", user.id, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return Response.json({
      status: 200,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      error: "Internal server error",
    });
  }
}
