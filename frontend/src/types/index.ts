export interface Genre {
  id: number;
  name: string;
}

export interface Platform {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  genres: Genre[];
  platforms: Platform[];
  metacritic: number;
  description_raw: string;
  released: string;
}

export interface CollectionEntry {
  id: string;
  gameId: number;
  gameName: string;
  backgroundImage: string;
  genres: Genre[];
  status: "completed" | "playing" | "pending";
  rating: number | null;
  note: string | null;
  addedAt: string;
}

export type CollectionStatus = "completed" | "playing" | "pending";

export interface AddToCollectionDto {
  gameId: number;
  gameName: string;
  backgroundImage: string;
  genres: Genre[];
  status: CollectionStatus;
  rating?: number;
  note?: string;
}

export interface UpdateCollectionDto {
  status?: CollectionStatus;
  rating?: number;
  note?: string;
}