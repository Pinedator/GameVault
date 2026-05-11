import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-[calc(100vh-61px)] bg-[#0d0d0f] text-white flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Grid decorativo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-8">
        <h1
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-[12rem] leading-none tracking-widest text-white/10"
        >
          404
        </h1>

        <p
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-3xl tracking-widest text-gray-400 -mt-12"
        >
          PÁGINA NO <span className="text-purple-500">ENCONTRADA</span>
        </p>

        <p className="text-gray-600 text-sm max-w-sm">
          La página que buscas no existe o ha sido movida.
        </p>

        <Link
          to="/"
          className="mt-4 border border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 px-8 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-200"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}