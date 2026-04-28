export interface Game {
  id: number;
  name: string;
  background_image: string;
  genres: Genre[];
  platforms: PlatformWrapper[];
  developers: Developer[];
  metacritic: number;
  description_raw: string;
  released: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface PlatformWrapper {
  platform: {
    id: number;
    name: string;
  };
}

export interface Developer {
  id: number;
  name: string;
}

export interface UpdateCollectionDto {
  status?: "completed" | "playing" | "pending";
  rating?: number;
  note?: string;
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

export interface AddToCollectionDto {
  gameId: number;
  gameName: string;
  backgroundImage: string;
  genres: Genre[];
  status: "completed" | "playing" | "pending";
  rating?: number;
  note?: string;
}