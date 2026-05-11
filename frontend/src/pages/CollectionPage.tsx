import { useState } from "react";
import { useCollection } from "../context/CollectionContext";
import Modal from "../components/Modal";
import type { CollectionStatus } from "../types";
import StarRating from "../components/StarRating";
import { Clock, Gamepad2, CheckCircle } from "lucide-react";

const STATUS_LABELS: Record<CollectionStatus, string> = {
  completed: "Completado",
  playing: "Jugando",
  pending: "Pendiente",
};

const STATUS_COLORS: Record<CollectionStatus, string> = {
  completed: "text-green-400 border-green-400",
  playing: "text-purple-400 border-purple-400",
  pending: "text-gray-400 border-gray-600",
};

export default function CollectionPage() {
  const { state, updateEntry, removeEntry } = useCollection();
  const [filter, setFilter] = useState<CollectionStatus | "all">("all");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const filtered =
    filter === "all"
      ? state.entries
      : state.entries.filter((e) => e.status === filter);

  const entryToDelete = state.entries.find((e) => e.id === pendingDelete);

  if (state.loading)
    return (
      <div className="min-h-[calc(100vh-61px)] bg-[#0d0d0f] text-white flex items-center justify-center">
        <p className="text-gray-600 text-sm tracking-widest uppercase animate-pulse">
          Cargando colección...
        </p>
      </div>
    );

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-[calc(100vh-61px)] bg-[#0d0d0f] text-white px-4 sm:px-10 py-8 overflow-x-hidden"
    >
      {pendingDelete && entryToDelete && (
        <Modal
          title="Eliminar juego"
          message={`¿Eliminar "${entryToDelete.gameName}" de tu colección? Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          cancelLabel="Cancelar"
          danger
          onConfirm={async () => {
            await removeEntry(pendingDelete);
            setPendingDelete(null);
          }}
          onCancel={() => setPendingDelete(null)}
        />
      )}

      <h1
        style={{ fontFamily: "'Syne', sans-serif" }}
        className="text-4xl sm:text-5xl tracking-widest text-white mb-2"
      >
        MI <span className="text-purple-500">COLECCIÓN</span>
      </h1>
      <p className="text-gray-500 text-sm mb-6 tracking-wide">
        {state.entries.length} juego{state.entries.length !== 1 ? "s" : ""} en tu biblioteca
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {(["all", "playing", "pending", "completed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 text-xs tracking-widest uppercase border transition-all duration-200 ${filter === s
              ? "bg-purple-600 border-purple-600 text-white"
              : "border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300"
              }`}
          >
            {s === "all" ? "Todos" : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <span className="text-6xl opacity-20">🎮</span>
          <p className="text-gray-600 text-sm tracking-widest uppercase">
            No hay juegos en esta categoría
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="group relative bg-[#13131a] overflow-hidden border border-transparent hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="relative overflow-hidden aspect-[3/4]">
              {entry.backgroundImage ? (
                <img
                  src={entry.backgroundImage}
                  alt={entry.gameName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-[#1e1e2e] flex items-center justify-center">
                  <span className="text-gray-600 text-4xl">🎮</span>
                </div>
              )}

              {entry.rating && (
                <div className="absolute top-2 right-2 bg-black/80 text-purple-400 text-xs font-bold px-2 py-1 border border-purple-500/50">
                  {entry.rating}/10
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 gap-2">
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 gap-2">

                  {/* Selector de estado */}
                  <div className="flex gap-1">
                    {(["pending", "playing", "completed"] as const).map((s) => {
                      const icons = {
                        pending: <Clock size={14} />,
                        playing: <Gamepad2 size={14} />,
                        completed: <CheckCircle size={14} />,
                      };
                      return (
                        <button
                          key={s}
                          onClick={() => updateEntry(entry.id, { status: s })}
                          title={s === "pending" ? "Pendiente" : s === "playing" ? "Jugando" : "Completado"}
                          className={`flex-1 py-2 flex items-center justify-center border transition ${entry.status === s
                              ? "bg-purple-600 border-purple-600 text-white"
                              : "border-gray-700 text-gray-500 hover:border-purple-500 hover:text-white"
                            }`}
                        >
                          {icons[s]}
                        </button>
                      );
                    })}
                  </div>

                  {/* Estrellas */}
                  <StarRating
                    value={entry.rating}
                    onChange={(rating) => updateEntry(entry.id, { rating })}
                  />

                  <button
                    onClick={() => setPendingDelete(entry.id)}
                    className="w-full border border-red-800 text-red-400 hover:bg-red-900/30 py-1.5 text-xs tracking-widest uppercase transition"
                  >
                    Eliminar
                  </button>
                </div>

                <button
                  onClick={() => setPendingDelete(entry.id)}
                  className="w-full border border-red-800 text-red-400 hover:bg-red-900/30 py-1.5 text-xs tracking-widest uppercase transition"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="p-3">
              <h2 className="text-sm font-medium leading-tight mb-1 line-clamp-2">
                {entry.gameName}
              </h2>
              <span className={`text-xs border px-2 py-0.5 tracking-wide ${STATUS_COLORS[entry.status]}`}>
                {STATUS_LABELS[entry.status]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}