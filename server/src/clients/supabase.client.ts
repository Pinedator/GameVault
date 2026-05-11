import { createClient, SupabaseClient } from "@supabase/supabase-js";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ws = require("ws");

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;

  if (!url || !key) throw new Error("Supabase credentials missing");

  _supabase = createClient(url, key, {
    realtime: {
      transport: ws,
    },
  });
  return _supabase;
}