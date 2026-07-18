/**
 * Client-side RFQ form types + option constants. Kept separate from
 * submit.functions.ts so route/component code can import them without
 * pulling any server-only symbols into the client bundle.
 */
export type Unit = "kg" | "tonnes" | "meters" | "pieces";
export type Timeline = "urgent" | "month" | "quarter" | "planning";

export type RfqData = {
  category: string;
  product: string;
  form: string;
  alloy: string;
  temper: string;
  finish: string;
  dimensions: string;
  quantity: string;
  unit: Unit;
  useCase: string;
  timeline: Timeline | "";
  destination: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  country: string;
  consent: boolean;
};

export const INITIAL_RFQ: RfqData = {
  category: "",
  product: "",
  form: "",
  alloy: "",
  temper: "",
  finish: "",
  dimensions: "",
  quantity: "",
  unit: "kg",
  useCase: "",
  timeline: "",
  destination: "",
  name: "",
  company: "",
  role: "",
  email: "",
  phone: "",
  country: "",
  consent: false,
};

/** Product-category options for step 1. `labelKey` maps into `t.products`. */
export const CATEGORY_KEYS = [
  { value: "profiles", labelKey: "profiles" as const },
  { value: "sheets-plates", labelKey: "sheets" as const },
  { value: "coils-foils", labelKey: "coils" as const },
  { value: "bars-rods", labelKey: "bars" as const },
];

export const FORM_OPTIONS = ["Profile", "Sheet", "Plate", "Coil", "Foil", "Bar", "Rod"];
export const UNIT_OPTIONS: Unit[] = ["kg", "tonnes", "meters", "pieces"];
export const TIMELINE_OPTIONS: Timeline[] = ["urgent", "month", "quarter", "planning"];

export type RfqErrors = Partial<Record<keyof RfqData, string>>;
export type RfqStep = 0 | 1 | 2 | 3;
export type RfqStatus = "idle" | "submitting" | "success" | "error";
