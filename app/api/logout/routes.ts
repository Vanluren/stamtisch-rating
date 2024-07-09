import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, _: NextResponse) {
  try {
    request.cookies.delete("currentUser");

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
      },
      { status: 500 },
    );
  }
}
