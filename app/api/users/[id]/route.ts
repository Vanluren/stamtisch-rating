import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user }, { status: 200 });
}

export async function PUT(
  _: NextRequest,
  { params, body }: { params: { id: string }; body: Partial<User> },
) {
  const id = params.id;
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...body,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      user,
    },
    { status: 200 },
  );
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      user,
    },
    { status: 200 },
  );
}
