import { getSupabase} from "../clients/supabase.client";
import type { CollectionEntry } from "../types";

export const collectionRepository = {
  getAll: async (userId: string): Promise<CollectionEntry[]> => {
    const { data, error } = await getSupabase()
      .from("collection")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => ({
      id: row.id,
      gameId: row.game_id,
      gameName: row.game_name,
      backgroundImage: row.background_image,
      genres: row.genres,
      status: row.status,
      rating: row.rating ? Number(row.rating) : null,
      note: row.note,
      addedAt: row.added_at,
    }));
  },

  add: async (userId: string, entry: Omit<CollectionEntry, "id" | "addedAt">): Promise<CollectionEntry> => {
    const { data, error } = await getSupabase()
      .from("collection")
      .insert({
        user_id: userId,
        game_id: entry.gameId,
        game_name: entry.gameName,
        background_image: entry.backgroundImage,
        genres: entry.genres,
        status: entry.status,
        rating: entry.rating ?? null,
        note: entry.note ?? null,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return {
      id: data.id,
      gameId: data.game_id,
      gameName: data.game_name,
      backgroundImage: data.background_image,
      genres: data.genres,
      status: data.status,
      rating: data.rating ? Number(data.rating) : null,
      note: data.note,
      addedAt: data.added_at,
    };
  },

  update: async (id: string, userId: string, fields: Partial<CollectionEntry>): Promise<CollectionEntry> => {
    const { data, error } = await getSupabase()
      .from("collection")
      .update({
        ...(fields.status && { status: fields.status }),
        ...(fields.rating !== undefined && { rating: fields.rating }),
        ...(fields.note !== undefined && { note: fields.note }),
      })
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return {
      id: data.id,
      gameId: data.game_id,
      gameName: data.game_name,
      backgroundImage: data.background_image,
      genres: data.genres,
      status: data.status,
      rating: data.rating ? Number(data.rating) : null,
      note: data.note,
      addedAt: data.added_at,
    };
  },

  remove: async (id: string, userId: string): Promise<void> => {
    const { error } = await getSupabase()
      .from("collection")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
  },
};