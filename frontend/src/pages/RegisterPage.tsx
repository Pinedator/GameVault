import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      navigate("/collection");
    } catch {
      setError("No se pudo crear la cuenta. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="min-h-[calc(100vh-61px)] bg-[#0d0d0f] text-white flex items-center justify-center px-4"
    >
      <div className="w-full max-w-sm bg-[#13131a] border border-[#1e1e2e] p-8 flex flex-col gap-6">
        <div>
          <h1
            style={{ fontFamily: "'Syne', sans-serif" }}
            className="text-3xl tracking-widest text-white uppercase"
          >
            Crear <span className="text-purple-500">cuenta</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Empieza tu colección</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs tracking-widest uppercase text-gray-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#0d0d0f] border border-[#1e1e2e] text-white px-4 py-3 text-sm outline-none focus:border-purple-500 transition placeholder-gray-600"
              placeholder="tu@email.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs tracking-widest uppercase text-gray-500">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#0d0d0f] border border-[#1e1e2e] text-white px-4 py-3 text-sm outline-none focus:border-purple-500 transition placeholder-gray-600"
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs tracking-widest uppercase text-gray-500">Confirmar contraseña</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="bg-[#0d0d0f] border border-[#1e1e2e] text-white px-4 py-3 text-sm outline-none focus:border-purple-500 transition placeholder-gray-600"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 py-3 text-sm tracking-widest uppercase font-medium transition mt-2"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 transition">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}