import { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import type { CollectionEntry, AddToCollectionDto, UpdateCollectionDto } from "../types";
import { collectionApi } from "../api/collection.api";
import { useAuth } from "./AuthContext";

interface CollectionState {
  entries: CollectionEntry[];
  loading: boolean;
  error: string | null;
}

type CollectionAction =
  | { type: "SET_LOADING" }
  | { type: "SET_ENTRIES"; payload: CollectionEntry[] }
  | { type: "ADD_ENTRY"; payload: CollectionEntry }
  | { type: "UPDATE_ENTRY"; payload: CollectionEntry }
  | { type: "REMOVE_ENTRY"; payload: string }
  | { type: "SET_ERROR"; payload: string };

function collectionReducer(state: CollectionState, action: CollectionAction): CollectionState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_ENTRIES":
      return { ...state, loading: false, entries: action.payload };
    case "ADD_ENTRY":
      return { ...state, entries: [...state.entries, action.payload] };
    case "UPDATE_ENTRY":
      return {
        ...state,
        entries: state.entries.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case "REMOVE_ENTRY":
      return {
        ...state,
        entries: state.entries.filter((e) => e.id !== action.payload),
      };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

interface CollectionContextType {
  state: CollectionState;
  addEntry: (data: AddToCollectionDto) => Promise<void>;
  updateEntry: (id: string, data: UpdateCollectionDto) => Promise<void>;
  removeEntry: (id: string) => Promise<void>;
}

const CollectionContext = createContext<CollectionContextType | null>(null);

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(collectionReducer, {
    entries: [],
    loading: false,
    error: null,
  });

  const { user } = useAuth();

useEffect(() => {
  if (!user) {
    dispatch({ type: "SET_ENTRIES", payload: [] });
    return;
  }
  dispatch({ type: "SET_LOADING" });
  collectionApi
    .getAll()
    .then((entries) => dispatch({ type: "SET_ENTRIES", payload: entries }))
    .catch((err: Error) => dispatch({ type: "SET_ERROR", payload: err.message }));
}, [user]);

  const addEntry = async (data: AddToCollectionDto) => {
    const entry = await collectionApi.add(data);
    dispatch({ type: "ADD_ENTRY", payload: entry });
  };

  const updateEntry = async (id: string, data: UpdateCollectionDto) => {
    const entry = await collectionApi.update(id, data);
    dispatch({ type: "UPDATE_ENTRY", payload: entry });
  };

  const removeEntry = async (id: string) => {
  await collectionApi.remove(id);
  const entries = await collectionApi.getAll();
  dispatch({ type: "SET_ENTRIES", payload: entries });
};

  return (
    <CollectionContext.Provider value={{ state, addEntry, updateEntry, removeEntry }}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) throw new Error("useCollection must be used within a CollectionProvider");
  return context;
}