import { USER_UPLOAD_DIR } from "@/lib/constants";
import { put } from "@vercel/blob";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const slugify = (text: string) =>
  text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export async function POST({ body, url }: NextRequest) {
  try {
    const { searchParams } = new URL(url);
    const filename = searchParams.get("filename");
    const currentUser = cookies().get("currentUser")?.value;

    if (!filename) {
      return NextResponse.json(
        {
          message: "filename query parameter is required",
        },
        { status: 400 },
      );
    }

    if (!body) {
      return NextResponse.json(
        {
          message: "body is required",
        },
        { status: 400 },
      );
    }

    const FILE_PATH =
      `${USER_UPLOAD_DIR}/${currentUser}/${slugify(filename)}`.toLowerCase();

    const blob = await put(FILE_PATH, body, {
      access: "public",
    });

    return NextResponse.json(
      {
        message: "Blob created",
        blob,
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
