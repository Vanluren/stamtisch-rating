import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function GET(_: Response, { params }: { params: { id: string } }) {
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
  _: Response,
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
