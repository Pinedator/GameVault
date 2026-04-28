import { Game } from "../types";

const RAWG_BASE_URL = "https://api.rawg.io/api";
const API_KEY = process.env.RAWG_API_KEY;

interface RawgSearchResponse {
  results: Game[];
}

export const rawgClient = {
  searchGames: async (query: string): Promise<Game[]> => {
    const res = await fetch(
      `${RAWG_BASE_URL}/games?search=${query}&key=${API_KEY}&page_size=10`
    );
    if (!res.ok) throw new Error("Error fetching games from RAWG");
    const data = (await res.json()) as RawgSearchResponse;
    return data.results;
  },

  getGameById: async (id: number): Promise<Game> => {
    const res = await fetch(
      `${RAWG_BASE_URL}/games/${id}?key=${API_KEY}`
    );
    if (!res.ok) throw new Error("Game not found");
    return res.json() as Promise<Game>;
  },
};