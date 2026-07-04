const BASE_URL = "https://api.rawg.io/api";

function apiUrl(path: string, params: Record<string, string> = {}) {
  const key = process.env.RAWG_API_KEY;
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("key", key ?? "");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

export type RawgGame = {
  id: number;
  name: string;
  slug: string;
  background_image: string | null;
  rating: number;
  released: string | null;
  genres: { id: number; name: string }[];
};

export async function searchGames(query: string): Promise<RawgGame[]> {
  if (!query) return [];
  const url = apiUrl("/games", { search: query, page_size: "20" });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`RAWG error: ${res.status}`);
  const data = await res.json();
  return data.results as RawgGame[];
}

export async function getGame(slug: string): Promise<RawgGame> {
  const url = apiUrl(`/games/${slug}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Game not found: ${res.status}`);
  return res.json();
}