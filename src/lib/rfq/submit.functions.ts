import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { rfqSchema, type RfqInput } from "./schema";

/**
 * Generates a human-friendly reference like RFQ-20260718-4839.
 */
function generateReference(): string {
  const d = new Date();
  const ymd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `RFQ-${ymd}-${suffix}`;
}

/**
 * Cheap non-reversible IP fingerprint for rate-limit / abuse triage, without
 * storing the raw address. Not cryptographically strong — informational only.
 */
async function hashIp(ip: string | null | undefined): Promise<string | null> {
  if (!ip) return null;
  const salt = process.env.RFQ_IP_SALT ?? "hegazy-rfq";
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .slice(0, 12)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export const submitRfq = createServerFn({ method: "POST" })
  .inputValidator((data: unknown): RfqInput => rfqSchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY!;

    // Publishable-key client: RLS allows INSERT with column checks.
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const reference = generateReference();
    const userAgent = getRequestHeader("user-agent")?.slice(0, 500) ?? null;
    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      null;
    const ipHash = await hashIp(ip);

    const row = {
      reference,
      category: data.category,
      product: data.product ?? null,
      form: data.form ?? null,
      alloy: data.alloy,
      temper: data.temper ?? null,
      finish: data.finish ?? null,
      dimensions: data.dimensions ?? null,
      quantity: data.quantity,
      unit: data.unit,
      use_case: data.useCase ?? null,
      timeline: data.timeline,
      destination: data.destination ?? null,
      contact_name: data.name,
      company: data.company,
      role: data.role ?? null,
      email: data.email,
      phone: data.phone ?? null,
      country: data.country ?? null,
      locale: data.locale ?? null,
      user_agent: userAgent,
      ip_hash: ipHash,
      status: "new" as const,
    };

    const { error } = await supabase.from("rfq_submissions").insert(row);
    if (error) {
      // Log server-side only. Never echo PII back to the client response.
      console.error("[RFQ] insert failed", {
        code: error.code,
        message: error.message,
      });
      throw new Error("Could not save your submission. Please try again.");
    }

    // Email notification is intentionally not wired yet — real destination
    // arrives from the client. When ready, invoke sendTemplateEmail() here
    // with the reference + a redacted summary (no full PII in logs).

    return { ok: true as const, reference };
  });
