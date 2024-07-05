import prisma from "@/lib/prisma";
import { genSalt, hash } from "bcrypt";
import { Profile, User } from "@prisma/client";

const hashPassword = async (password: string) => {
  const salt = await genSalt(10);

  return hash(password, salt);
};

export async function POST(
  _: Response,
  request: { body: User & Partial<Profile> },
) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return Response.json({
        status: 400,
        error: "Email and password are required",
      });
    }

    if (await prisma.user.findUnique({ where: { email } })) {
      return Response.json({
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
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          bio: "",
        },
      });

      if (!profile) {
        throw new Error("Error creating user profile");
      }

      return user;
    });

    return Response.json({
      status: 200,
      user,
    });
  } catch (error) {
    console.error("Error creating user", error);
    return Response.json({
      status: 500,
      error: "Error creating user",
    });
  }
}
