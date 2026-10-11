/** Minimal Upstash Redis REST client (no dependency). Configure via Vercel's "Upstash for Redis" integration. */
export function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}

export async function redisCmd(command: (string | number)[]): Promise<unknown> {
  const cfg = redisConfig();
  if (!cfg) throw new Error('store_not_configured');
  const r = await fetch(cfg.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
  });
  const data = (await r.json().catch(() => ({}))) as { result?: unknown; error?: string };
  if (!r.ok || data.error) throw new Error(`redis: ${data.error || r.status}`);
  return data.result;
}

/** Several commands in one round trip (Upstash /pipeline). Returns each command's result. */
export async function redisPipeline(commands: (string | number)[][]): Promise<unknown[]> {
  if (!commands.length) return [];
  const cfg = redisConfig();
  if (!cfg) throw new Error('store_not_configured');
  const r = await fetch(`${cfg.url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  const data = (await r.json().catch(() => [])) as { result?: unknown; error?: string }[];
  if (!r.ok || !Array.isArray(data)) throw new Error(`redis: ${r.status}`);
  return data.map((d) => (d && !d.error ? d.result : null));
}
