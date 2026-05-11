import { igdbClient } from "../clients/igdb.client";
import type { Game } from "../types";

export const gamesService = {
  search: async (query: string): Promise<Game[]> => {
    return igdbClient.searchGames(query);
  },

  getById: async (id: number): Promise<Game> => {
    return igdbClient.getGameById(id);
  },
};