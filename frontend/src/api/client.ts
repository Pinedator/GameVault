const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message ?? `API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export default apiFetch;