const IGDB_BASE_URL = "https://api.igdb.com/v4";
const TWITCH_TOKEN_URL = "https://id.twitch.tv/oauth2/token";

let cachedToken : {token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if(cachedToken && cachedToken.expiresAt > Date.now()){
    return cachedToken.token;
  }

  const clientID = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  const res = await fetch(`${TWITCH_TOKEN_URL}?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`, {method: "POST"});

  if(!res.ok) throw new Error(`Twitch auth error: ${res.status}`)

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return cachedToken.token;
}

async function igdbRequest<T>(endpoint: string, query:string): Promise<T> {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const token = await getAccessToken();

  const res = await fetch(`${IGDB_BASE_URL}${endpoint}`,{
    method: "POST",
    headers: {
      "Client-ID": clientId ?? "",
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
    },
    body: query,
  });
  console.log(token)

  if (!res.ok) throw new Error(`IGDB error: ${res.status}`);
  return res.json();
}

export type IgdbGame = {
  id: number,
  name: string,
  slug: string,
  cover: {id: number, image_id: string} | null,
  rating: number | null,
  first_release_date: number | null,
  genres: {id: number, name: string}[],
  summary: string,
};

const GAME_FIELDS = `fields id, name, slug, cover.image_id, rating, first_release_date, genres.name, summary;`;

export async function  searchGames(query: string): Promise<IgdbGame[]> {
  if (!query) return [];
  const body = `
  ${GAME_FIELDS}
  where rating > 50;
  search "${query}";
  limit 20;
  `;
  return igdbRequest<IgdbGame[]>("/games", body);
}

export async function getGame(slug: string): Promise<IgdbGame> {
  const body = `
  ${GAME_FIELDS}
  where slug = "${slug}";
  limit 1;
  `;
  
  const results = await igdbRequest<IgdbGame[]>("/games", body);
  if (!results.length) throw new Error (`Game not found: ${slug}`);
  return results[0];
}

export function coverImageUrl(imageId: string, size: string = "cover_big"): string{
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;
}