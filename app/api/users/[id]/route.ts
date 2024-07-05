import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return Response.json({
      status: 404,
      message: "User not found",
    });
  }

  return Response.json({
    status: 200,
    user,
  });
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
    return Response.json({
      status: 404,
      message: "User not found",
    });
  }

  return Response.json({
    status: 200,
    user,
  });
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
    return Response.json({
      status: 404,
      message: "User not found",
    });
  }

  return Response.json({
    status: 200,
    user,
  });
}
