import { useState, useCallback } from "react";
import type { Game } from "../types";
import { gamesApi } from "../api/games.api";

interface UseGameSearchReturn {
  results: Game[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  clearResults: () => void;
}

export function useGameSearch(): UseGameSearchReturn {
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const games = await gamesApi.search(query);
      setResults(games);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error searching games");
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { results, loading, error, search, clearResults };
}