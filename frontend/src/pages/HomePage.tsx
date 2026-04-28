import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-screen bg-[#0d0d0f] text-white flex flex-col items-center justify-center relative overflow-hidden px-6"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center w-full max-w-2xl">
        <p className="text-purple-400 text-xs tracking-[0.3em] uppercase">
          Tu colección. Tu criterio.
        </p>

        <h1
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-6xl sm:text-8xl md:text-9xl tracking-widest text-white leading-none"
        >
          GAME<span className="text-purple-500">VAULT</span>
        </h1>

        <p className="text-gray-400 text-base max-w-sm font-light leading-relaxed">
          Registra cada juego que has completado, puntúalo y descubre qué jugar a continuación.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto">
          <Link
            to="/search"
            className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-200 text-center"
          >
            Explorar juegos
          </Link>
          <Link
            to="/collection"
            className="border border-gray-700 hover:border-purple-500 text-gray-400 hover:text-white px-8 py-3 text-sm tracking-widest uppercase font-medium transition-all duration-200 text-center"
          >
            Mi colección
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 text-gray-700 text-xs tracking-widest uppercase">
        Powered by IGDB
      </div>
    </div>
  );
}