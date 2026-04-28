import { collectionRepository } from "../repositories/collection.repository";
import { CollectionEntry, AddToCollectionDto, UpdateCollectionDto } from "../types";
import { randomUUID } from "crypto";

export const collectionService = {
  getAll: (): CollectionEntry[] => {
    return collectionRepository.getAll();
  },

  add: (dto: AddToCollectionDto): CollectionEntry => {
    const entries = collectionRepository.getAll();

    const newEntry: CollectionEntry = {
      id: randomUUID(),
      gameId: dto.gameId,
      gameName: dto.gameName,
      backgroundImage: dto.backgroundImage,
      genres: dto.genres,
      status: dto.status,
      rating: dto.rating ?? null,
      note: dto.note ?? null,
      addedAt: new Date().toISOString(),
    };

    entries.push(newEntry);
    collectionRepository.save(entries);
    return newEntry;
  },

  update: (id: string, dto: UpdateCollectionDto): CollectionEntry => {
    const entries = collectionRepository.getAll();
    const index = entries.findIndex((e) => e.id === id);
    if (index === -1) throw new Error("Entry not found");

    entries[index] = { ...entries[index], ...dto };
    collectionRepository.save(entries);
    return entries[index];
  },

  remove: (id: string): void => {
    const entries = collectionRepository.getAll();
    const filtered = entries.filter((e) => e.id !== id);
    if (filtered.length === entries.length) throw new Error("Entry not found");
    collectionRepository.save(filtered);
  },
};