import { z } from "zod";

/**
 * Shared RFQ payload schema. Used client-side for validation and server-side
 * for authoritative parsing inside the server function. Length caps mirror
 * the Postgres CHECK constraints on public.rfq_submissions.
 */

const trimmed = (max: number) =>
  z.string().trim().max(max, { message: `Must be ${max} characters or fewer` });

const optionalCapped = (max: number) =>
  trimmed(max).optional().or(z.literal("").transform(() => undefined));

export const rfqSchema = z.object({
  // Spec
  category: trimmed(60).min(1, { message: "Required" }),
  product: optionalCapped(160),
  form: optionalCapped(40),
  alloy: trimmed(60).min(1, { message: "Required" }),
  temper: optionalCapped(40),
  finish: optionalCapped(80),
  dimensions: optionalCapped(1000),

  // Project
  quantity: z.coerce
    .number()
    .positive({ message: "Must be greater than zero" })
    .lt(1e9, { message: "Value is too large" }),
  unit: z.enum(["kg", "tonnes", "meters", "pieces"]),
  useCase: optionalCapped(2000),
  timeline: z.enum(["urgent", "month", "quarter", "planning"]),
  destination: optionalCapped(160),

  // Contact
  name: trimmed(120).min(1, { message: "Required" }),
  company: trimmed(160).min(1, { message: "Required" }),
  role: optionalCapped(120),
  email: trimmed(254).email({ message: "Enter a valid email" }),
  phone: optionalCapped(40),
  country: optionalCapped(80),

  // Consent
  consent: z.literal(true, { message: "Consent is required" }),

  // Context (client-supplied, server-recorded)
  locale: z.enum(["en", "ar"]).optional(),
});

export type RfqInput = z.infer<typeof rfqSchema>;
