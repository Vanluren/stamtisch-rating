import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json("Hey, you found me! A bit cheeky, aren't you?");
}
