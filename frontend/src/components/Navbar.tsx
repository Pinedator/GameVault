import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const links = [
    { to: "/", label: "Inicio" },
    ...(user ? [
      { to: "/search", label: "Buscar" },
      { to: "/collection", label: "Mi Colección" },
    ] : []),
  ];

  return (
    <nav style={{ fontFamily: "'Syne', sans-serif" }} className="bg-[#0d0d0f] border-b border-[#1e1e24] px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xl tracking-widest text-white hover:text-purple-400 transition">
          GAME<span className="text-purple-500">VAULT</span>
        </Link>

        {/* Botón hamburguesa móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-400 hover:text-white transition"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Links escritorio */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-widest uppercase transition ${
                location.pathname === link.to
                  ? "text-purple-400 border-b border-purple-400 pb-0.5"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition text-sm tracking-widest uppercase"
            >
              <LogOut size={14} />
              Salir
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 text-xs tracking-widest uppercase transition"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pb-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-sm tracking-widest uppercase transition ${
                location.pathname === link.to
                  ? "text-purple-400"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-left text-sm tracking-widest uppercase text-gray-500 hover:text-red-400 transition"
            >
              Salir
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-purple-400"
            >
              Entrar
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}