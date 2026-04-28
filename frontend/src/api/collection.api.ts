import apiFetch from "./client";
import type { CollectionEntry, AddToCollectionDto, UpdateCollectionDto } from "../types";

export const collectionApi = {
  getAll: () =>
    apiFetch<CollectionEntry[]>("/api/collection"),

  add: (data: AddToCollectionDto) =>
    apiFetch<CollectionEntry>("/api/collection", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateCollectionDto) =>
    apiFetch<CollectionEntry>(`/api/collection/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  remove: (id: string) =>
    apiFetch<void>(`/api/collection/${id}`, {
      method: "DELETE",
    }),
};