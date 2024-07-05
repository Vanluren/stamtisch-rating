import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, _: NextResponse) {
  try {
    request.cookies.delete("currentUser");

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
