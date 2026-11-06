// Server-side only: never import this from a client component.

/** Reads a server env var, treating empty values and copied .env.example placeholders as "not set". */
export function env(name: string): string | undefined {
  const value = process.env[name]?.trim().replace(/^["']|["']$/g, "");
  if (!value || /your-domain|\[.*\]|^re_x+$/i.test(value)) return undefined;
  return value;
}

/** True when the inquiry form can deliver online (Resend or a webhook is configured). */
export function isOnlineDeliveryConfigured(): boolean {
  return Boolean(env("RESEND_API_KEY") || env("INQUIRY_WEBHOOK_URL"));
}
