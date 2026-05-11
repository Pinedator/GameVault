import type { Game } from "../types";

let accessToken: string | null = null;

async function getAccessToken(): Promise<string> {
  if (accessToken) return accessToken;

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  const url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

  const res = await fetch(url, { method: "POST" });

  if (!res.ok) {
    const errorBody = await res.text();
    console.log("Token error body:", errorBody);
    throw new Error("Failed to get IGDB access token");
  }

  const data = (await res.json()) as { access_token: string };
  accessToken = data.access_token;
  return accessToken;
}

async function igdbFetch(endpoint: string, body: string): Promise<unknown> {
  const token = await getAccessToken();
  const clientId = process.env.TWITCH_CLIENT_ID;

  const res = await fetch(`https://api.igdb.com/v4${endpoint}`, {
    method: "POST",
    headers: {
      "Client-ID": clientId!,
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
    },
    body,
  });
  if (!res.ok) throw new Error(`IGDB error: ${res.status}`);
  return res.json();
}

export const igdbClient = {
  searchGames: async (query: string): Promise<Game[]> => {
    const data = (await igdbFetch(
      "/games",
      `search "${query}"; fields id,name,cover.url,genres.name,platforms.name,involved_companies.company.name,rating,summary,first_release_date; limit 10;`
    )) as any[];

    return data.map((g) => ({
      id: g.id,
      name: g.name,
      background_image: g.cover
        ? `https:${g.cover.url.replace("t_thumb", "t_cover_big")}`
        : "",
      genres: g.genres ?? [],
      platforms: g.platforms?.map((p: any) => ({ platform: { id: p.id, name: p.name } })) ?? [],
      developers: g.involved_companies?.map((c: any) => ({ id: c.company.id, name: c.company.name })) ?? [],
      metacritic: Math.round(g.rating ?? 0),
      description_raw: g.summary ?? "",
      released: g.first_release_date
        ? new Date(g.first_release_date * 1000).toISOString()
        : "",
    }));
  },

  getGameById: async (id: number): Promise<Game> => {
    const data = (await igdbFetch(
      "/games",
      `where id = ${id}; fields id,name,cover.url,genres.name,platforms.name,involved_companies.company.name,rating,summary,first_release_date; limit 1;`
    )) as any[];

    if (!data.length) throw new Error("Game not found");
    const g = data[0];

    return {
      id: g.id,
      name: g.name,
      background_image: g.cover
        ? `https:${g.cover.url.replace("t_thumb", "t_cover_big")}`
        : "",
      genres: g.genres?.map((genre: any) => ({ id: genre.id, name: genre.name })) ?? [],
      platforms: g.platforms?.map((p: any) => ({ platform: { id: p.id, name: p.name } })) ?? [],
      developers: g.involved_companies?.map((c: any) => ({ id: c.company.id, name: c.company.name })) ?? [],
      metacritic: Math.round(g.rating ?? 0),
      description_raw: g.summary ?? "",
      released: g.first_release_date
        ? new Date(g.first_release_date * 1000).toISOString()
        : "",
    };
  },
};