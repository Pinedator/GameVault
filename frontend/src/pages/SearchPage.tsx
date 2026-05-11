import { useState } from "react";
import { useGameSearch } from "../hooks/useGameSearch";
import { useCollection } from "../context/CollectionContext";
import Modal from "../components/Modal";
import type { Game, AddToCollectionDto } from "../types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { results, loading, error, search } = useGameSearch();
  const { addEntry, state } = useCollection();
  const [pendingGame, setPendingGame] = useState<Game | null>(null);

  const handleSearch = async () => {
    await search(query);
  };

  const handleAdd = (game: Game) => {
    setPendingGame(game);
  };

  const confirmAdd = async () => {
  if (!pendingGame) return;

  const alreadyInCollection = state.entries.some(
    (e) => e.gameId === pendingGame.id
  );

  if (alreadyInCollection) {
    setPendingGame(null);
    return;
  }

  const dto: AddToCollectionDto = {
    gameId: pendingGame.id,
    gameName: pendingGame.name,
    backgroundImage: pendingGame.background_image,
    genres: pendingGame.genres,
    status: "pending",
  };
  await addEntry(dto);
  setPendingGame(null);
};

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-[calc(100vh-61px)] bg-[#0d0d0f] text-white px-4 sm:px-10 py-8 overflow-x-hidden"
    >
      {pendingGame && (
  <Modal
    title={
      state.entries.some((e) => e.gameId === pendingGame.id)
        ? "Ya en colección"
        : "Añadir juego"
    }
    message={
      state.entries.some((e) => e.gameId === pendingGame.id)
        ? `"${pendingGame.name}" ya está en tu colección.`
        : `¿Añadir "${pendingGame.name}" a tu colección?`
    }
    confirmLabel={
      state.entries.some((e) => e.gameId === pendingGame.id)
        ? "Cerrar"
        : "Añadir"
    }
    onConfirm={confirmAdd}
    onCancel={() => setPendingGame(null)}
    hideCancel={state.entries.some((e) => e.gameId === pendingGame.id)}
  />
)}

      <h1
        style={{ fontFamily: "'Syne', sans-serif" }}
        className="text-4xl sm:text-5xl tracking-widest text-white mb-2"
      >
        BUSCAR <span className="text-purple-500">JUEGOS</span>
      </h1>
      <p className="text-gray-500 text-sm mb-6 tracking-wide">
        Encuentra cualquier juego y añádelo a tu colección
      </p>

      <div className="flex gap-2 mb-8 w-full max-w-2xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Busca un juego..."
          className="flex-1 bg-[#13131a] border border-[#1e1e2e] text-white px-4 py-3 text-sm outline-none focus:border-purple-500 transition placeholder-gray-600 min-w-0"
        />
        <button
          onClick={handleSearch}
          className="bg-purple-600 hover:bg-purple-500 px-5 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-200 whitespace-nowrap"
        >
          Buscar
        </button>
      </div>

      {loading && (
        <p className="text-gray-500 text-sm tracking-widest uppercase animate-pulse mb-6">
          Buscando...
        </p>
      )}
      {error && <p className="text-red-400 text-sm mb-6">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {results.map((game) => (
          <div
            key={game.id}
            className="group relative bg-[#13131a] overflow-hidden border border-transparent hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="relative overflow-hidden aspect-[3/4]">
              {game.background_image ? (
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-[#1e1e2e] flex items-center justify-center">
                  <span className="text-gray-600 text-4xl">🎮</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <button
                  onClick={() => handleAdd(game)}
                  className="w-full bg-purple-600 hover:bg-purple-500 py-2 text-xs tracking-widest uppercase font-medium transition"
                >
                  + Añadir
                </button>
              </div>
            </div>
            <div className="p-3">
              <h2 className="text-sm font-medium leading-tight mb-1 line-clamp-2">
                {game.name}
              </h2>
              <p className="text-gray-600 text-xs line-clamp-1">
                {game.genres?.map((g) => g.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}