import type { SVGProps } from "react";

/**
 * Restrained industrial line icons for Hegazy Group.
 *
 * Design rules:
 * - 24×24 viewBox, currentColor, stroke-width 1.25 to match the site's Lucide
 *   line weight (arrows, phone, chevron).
 * - Abstract / geometric — never pictorial or illustrative. These are marks,
 *   not illustrations. No shading, no fill.
 * - No decorative flourishes. Cap/join = round for optical consistency with
 *   Lucide, which the rest of the site uses.
 */

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Construction — stacked structural volumes. */
export function ConstructionMark(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="11" width="8" height="10" />
      <rect x="11" y="6" width="10" height="15" />
      <path d="M13 10h6M13 14h6M13 18h6M6 15h2M6 18h2" />
    </svg>
  );
}

/** Manufacturing — modular process/plant abstraction. */
export function ManufacturingMark(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 21V10l6 4V10l6 4V6l6 4v11z" />
      <path d="M3 21h18" />
    </svg>
  );
}

/** Marine — hull profile over waterline. */
export function MarineMark(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 15h18l-2 4H5z" />
      <path d="M12 4v11" />
      <path d="M12 4l6 3-6 3" />
      <path d="M3 21c1.5-1 3 1 4.5 0S10.5 20 12 21s3-1 4.5 0S19.5 20 21 21" />
    </svg>
  );
}

/** Automotive — chassis silhouette, no wheels-as-circles cliché. */
export function AutomotiveMark(props: IconProps) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 15v-2l3-5h12l3 5v2" />
      <path d="M3 15h18v3H3z" />
      <path d="M9 8v5M15 8v5" />
    </svg>
  );
}
