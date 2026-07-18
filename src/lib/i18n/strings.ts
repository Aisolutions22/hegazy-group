/**
 * Locale barrel — copy dictionaries live in `strings.en.ts` / `strings.ar.ts`.
 * `Strings` is derived from the English dictionary and enforced on every other
 * locale so a missing key breaks the build, not the page.
 */
import { en, type Strings } from "./strings.en";
import { ar } from "./strings.ar";

export type Lang = "en" | "ar";
export type { Strings };

export const strings: Record<Lang, Strings> = { en, ar };
