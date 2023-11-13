import { createShortLink, findShortCode, findShortLink } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json({ shortLink: "shortLink" }, { status: 201 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shortCode = searchParams.get("code");
  console.log(shortCode);
  if (shortCode) {
    let data = await findShortCode(shortCode);
    
    return NextResponse.json({ shortLink: data }, { status: 200 });
  }
  return NextResponse.json({ shortLink: "Not_found" }, { status: 404 });
}
