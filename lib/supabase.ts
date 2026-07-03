import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getEnv } from "./env";

let adminClient: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(getEnv("SUPABASE_URL") && getEnv("SUPABASE_SERVICE_ROLE_KEY"));
}

/** Server-side Supabase client with service role for admin operations. */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;

  if (!adminClient) {
    adminClient = createClient(
      getEnv("SUPABASE_URL")!,
      getEnv("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );
  }
  return adminClient;
}

/** Public Supabase client for browser uploads (when anon key is set). */
export function getSupabasePublic(): SupabaseClient | null {
  const url = getEnv("SUPABASE_URL");
  const anonKey = getEnv("SUPABASE_ANON_KEY");
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}

export function isStorageConfigured(): boolean {
  return isSupabaseConfigured() && Boolean(getEnv("SUPABASE_ANON_KEY"));
}
