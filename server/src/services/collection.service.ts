import { collectionRepository } from "../repositories/collection.repository";
import type { CollectionEntry, AddToCollectionDto, UpdateCollectionDto } from "../types";

export const collectionService = {
  getAll: async (userId: string): Promise<CollectionEntry[]> => {
    return collectionRepository.getAll(userId);
  },

  add: async (userId: string, dto: AddToCollectionDto): Promise<CollectionEntry> => {
    return collectionRepository.add(userId, {
      gameId: dto.gameId,
      gameName: dto.gameName,
      backgroundImage: dto.backgroundImage,
      genres: dto.genres,
      status: dto.status,
      rating: dto.rating ?? null,
      note: dto.note ?? null,
    });
  },

  update: async (userId: string, id: string, dto: UpdateCollectionDto): Promise<CollectionEntry> => {
    return collectionRepository.update(id, userId, dto);
  },

  remove: async (userId: string, id: string): Promise<void> => {
    return collectionRepository.remove(id, userId);
  },
};