import fs from "fs";
import path from "path";
import { CollectionEntry } from "../types";

const DB_PATH = path.join(__dirname, "../../data/collection.json");

function ensureFileExists() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  }
}

export const collectionRepository = {
  getAll: (): CollectionEntry[] => {
    ensureFileExists();
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data) as CollectionEntry[];
  },

  save: (entries: CollectionEntry[]): void => {
    ensureFileExists();
    fs.writeFileSync(DB_PATH, JSON.stringify(entries, null, 2));
  },

  findById: (id: string): CollectionEntry | undefined => {
    const entries = collectionRepository.getAll();
    return entries.find((e) => e.id === id);
  },
};