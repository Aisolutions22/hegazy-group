import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  bleed?: boolean;
  children: ReactNode;
};

export function Section({ as: Tag = "section", bleed, className, children, ...rest }: Props) {
  return (
    <Tag
      className={cn("w-full", className)}
      style={{ paddingBlock: "var(--section-py)" }}
      {...rest}
    >
      <div className={cn("mx-auto w-full px-6 md:px-8", bleed ? "" : "max-w-[1280px]")}>
        {children}
      </div>
    </Tag>
  );
}
