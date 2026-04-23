import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const slug = Math.random().toString(36).substring(2, 10);
    return NextResponse.json({ slug, shareUrl: `/invite/${slug}` });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
