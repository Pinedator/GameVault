import apiFetch from "./client";
import type { Game } from "../types";

export const gamesApi = {
  search: (query: string) =>
    apiFetch<Game[]>(`/api/games/search?q=${encodeURIComponent(query)}`),

  getById: (id: number) =>
    apiFetch<Game>(`/api/games/${id}`),
};