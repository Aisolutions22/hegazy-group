export type ProductSummary = {
  slug: string;
  category: string; // route segment
  categoryLabel: string;
  name: string;
  code: string;
  form: "Profile" | "Sheet" | "Plate" | "Coil" | "Foil" | "Bar" | "Rod";
  alloy: string;
  temper: string;
  finish: string;
  availability: "in-stock" | "on-request";
  /** Absolute or /assets URL. Optional — cards fall back to a neutral tile. */
  imageUrl?: string;
  /** Optional short marketing/spec note (dimensions, use case). */
  description?: string;
  /** Optional standard-compliance codes (EN, ASTM, etc.). */
  standards?: string[];
  /**
   * All commercial pricing is quote-only. This flag lets the UI render an
   * explicit "Price on request" chip on cards / detail pages when useful.
   */
  priceOnRequest?: boolean;
};


/**
 * Placeholder catalog — structure only. Every product row is representative;
 * real SKUs, dimensions, and stock levels are [CLIENT-INPUT-REQUIRED].
 */
export const PRODUCTS: ProductSummary[] = [
  { slug: "extruded-rectangular-profile", category: "profiles", categoryLabel: "Profiles", name: "Extruded Rectangular Profile", code: "PRF-001", form: "Profile", alloy: "6063", temper: "T5", finish: "Mill", availability: "in-stock" },
  { slug: "curtain-wall-mullion", category: "profiles", categoryLabel: "Profiles", name: "Curtain Wall Mullion", code: "PRF-014", form: "Profile", alloy: "6063", temper: "T6", finish: "Anodized", availability: "in-stock" },
  { slug: "structural-t-section", category: "profiles", categoryLabel: "Profiles", name: "Structural T-Section", code: "PRF-027", form: "Profile", alloy: "6061", temper: "T6", finish: "Mill", availability: "on-request" },
  { slug: "mill-finish-sheet", category: "sheets-plates", categoryLabel: "Sheets & Plates", name: "Mill Finish Sheet", code: "SHT-102", form: "Sheet", alloy: "1050", temper: "H14", finish: "Mill", availability: "in-stock" },
  { slug: "marine-grade-plate", category: "sheets-plates", categoryLabel: "Sheets & Plates", name: "Marine Grade Plate", code: "PLT-208", form: "Plate", alloy: "5083", temper: "H116", finish: "Mill", availability: "in-stock" },
  { slug: "pre-coated-sheet", category: "sheets-plates", categoryLabel: "Sheets & Plates", name: "Pre-Coated Sheet", code: "SHT-121", form: "Sheet", alloy: "3003", temper: "H14", finish: "PE Coated", availability: "on-request" },
  { slug: "round-bar-6061", category: "bars-rods", categoryLabel: "Bars & Rods", name: "Round Bar", code: "BAR-041", form: "Bar", alloy: "6061", temper: "T6", finish: "Mill", availability: "in-stock" },
  { slug: "square-bar-6082", category: "bars-rods", categoryLabel: "Bars & Rods", name: "Square Bar", code: "BAR-052", form: "Bar", alloy: "6082", temper: "T6", finish: "Mill", availability: "in-stock" },
  { slug: "hex-rod-2024", category: "bars-rods", categoryLabel: "Bars & Rods", name: "Hex Rod", code: "ROD-063", form: "Rod", alloy: "2024", temper: "T3", finish: "Mill", availability: "on-request" },
  { slug: "converter-coil-1100", category: "coils-foils", categoryLabel: "Coils & Foils", name: "Converter Coil", code: "COL-311", form: "Coil", alloy: "1100", temper: "O", finish: "Mill", availability: "in-stock" },
  { slug: "household-foil-8011", category: "coils-foils", categoryLabel: "Coils & Foils", name: "Household Foil Stock", code: "FOL-322", form: "Foil", alloy: "8011", temper: "O", finish: "Mill", availability: "in-stock" },
  { slug: "pre-painted-coil", category: "coils-foils", categoryLabel: "Coils & Foils", name: "Pre-Painted Coil", code: "COL-334", form: "Coil", alloy: "3105", temper: "H16", finish: "PVDF Coated", availability: "on-request" },
];

export const FILTER_GROUPS = {
  form: ["Profile", "Sheet", "Plate", "Coil", "Foil", "Bar", "Rod"],
  alloy: ["1xxx", "2xxx", "3xxx", "5xxx", "6xxx", "8xxx"],
  temper: ["O", "H14", "H16", "H116", "T3", "T5", "T6"],
  finish: ["Mill", "Anodized", "PE Coated", "PVDF Coated"],
} as const;
