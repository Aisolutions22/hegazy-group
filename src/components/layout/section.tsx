import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes, ReactNode, CSSProperties } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** "default" keeps 1280px max-width; "full" bleeds edge-to-edge but keeps px padding. */
  size?: "default" | "full";
  /** Override --section-py (accepts any CSS length or clamp()). */
  py?: string;
  /** Remove vertical padding entirely (e.g. hero). */
  flush?: boolean;
  children: ReactNode;
};

/**
 * Section = vertical rhythm + horizontal container.
 * Owns --section-py so hero, footer, and content sections all share the same
 * fluid vertical scale. Pair with <Grid> inside for the 12-column track.
 */
export function Section({
  as: Tag = "section",
  size = "default",
  py,
  flush,
  className,
  children,
  style,
  ...rest
}: SectionProps) {
  const s: CSSProperties = { ...style };
  if (!flush) s.paddingBlock = py ?? "var(--section-py)";
  return (
    <Tag className={cn("w-full", className)} style={s} {...rest}>
      <div
        className={cn(
          "mx-auto w-full px-6 md:px-8",
          size === "default" && "max-w-[var(--grid-max)]"
        )}
      >
        {children}
      </div>
    </Tag>
  );
}

type GridProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

/**
 * 12-column responsive grid track (4 → 8 → 12 columns).
 * Children use Tailwind `col-span-*` utilities to place themselves.
 */
export function Grid({ className, children, ...rest }: GridProps) {
  return (
    <div className={cn("grid-12", className)} {...rest}>
      {children}
    </div>
  );
}
