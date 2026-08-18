import { NextRequest, NextResponse } from "next/server";
import { searchGames } from "@/lib/igdb";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") ?? "";
  if (!query.trim()) return NextResponse.json([]);
  try {
    const games = await searchGames(query);
    return NextResponse.json(games);
  } catch (err) {
    console.log(String(err));
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}