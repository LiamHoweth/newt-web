import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Read a runtime env var on Node (next dev) or Cloudflare Workers.
 * Tries process.env first, then Worker bindings via getCloudflareContext.
 */
export function getEnv(name: string): string | undefined {
  const fromProcess = process.env[name];
  if (fromProcess) return fromProcess;

  try {
    const { env } = getCloudflareContext();
    const value = (env as Record<string, string | undefined>)[name];
    if (value) return value;
  } catch {
    // Not in a Cloudflare worker context (e.g. next dev without worker preview).
  }

  return undefined;
}

export function getEnvFlags(names: readonly string[]): Record<string, boolean> {
  return Object.fromEntries(names.map((name) => [name, Boolean(getEnv(name))]));
}
