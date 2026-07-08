import { getCloudflareContext } from "@opennextjs/cloudflare";

function readBinding(name: string, env: Record<string, unknown>): string | undefined {
  const value = env[name];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function readFromCloudflareEnv(name: string): string | undefined {
  try {
    const { env } = getCloudflareContext();
    return readBinding(name, env as Record<string, unknown>);
  } catch {
    return undefined;
  }
}

async function readFromCloudflareEnvAsync(name: string): Promise<string | undefined> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return readBinding(name, env as Record<string, unknown>);
  } catch {
    return undefined;
  }
}

/**
 * Read a runtime env var on Node (next dev) or Cloudflare Workers.
 * Checks process.env, then Worker bindings (secrets are not always on process.env).
 */
export function getEnv(name: string): string | undefined {
  const fromProcess = process.env[name];
  if (fromProcess) return fromProcess;
  return readFromCloudflareEnv(name);
}

export async function getEnvAsync(name: string): Promise<string | undefined> {
  const fromProcess = process.env[name];
  if (fromProcess) return fromProcess;

  const fromSync = readFromCloudflareEnv(name);
  if (fromSync) return fromSync;

  return readFromCloudflareEnvAsync(name);
}

export function getEnvFlags(names: readonly string[]): Record<string, boolean> {
  return Object.fromEntries(names.map((name) => [name, Boolean(getEnv(name))]));
}

export async function getEnvFlagsAsync(
  names: readonly string[]
): Promise<Record<string, boolean>> {
  const entries = await Promise.all(
    names.map(async (name) => [name, Boolean(await getEnvAsync(name))] as const)
  );
  return Object.fromEntries(entries);
}
