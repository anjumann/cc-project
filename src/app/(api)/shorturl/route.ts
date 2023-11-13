import { createShortLink, findShortCode, findShortLink } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  const req = await request.json() as {
    original : string
  }

  let data = await createShortLink(req.original)
  return NextResponse.json({ data }, { status: 201 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shortCode = searchParams.get("code");
  // console.log(shortCode);
  if (shortCode) {
    let data = await findShortCode(shortCode);
    
    return NextResponse.json({ shortLink: data }, { status: 200 });
  }
  return NextResponse.json({ shortLink: "Not_found" }, { status: 404 });
}
