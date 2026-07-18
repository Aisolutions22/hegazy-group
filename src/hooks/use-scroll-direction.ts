import { useEffect, useState } from "react";

export type ScrollState = {
  direction: "up" | "down";
  y: number;
  atTop: boolean;
};

/**
 * Single global scroll observer. All layout chrome (utility bar collapse,
 * main header compress, transparent-header swap) reads from this one hook
 * so there is only ever ONE scroll listener on the window, driven by rAF.
 *
 * Direction updates use hysteresis (threshold px) so a fast flick scroll
 * does not flap the direction bit and cause the header to shake.
 */
export function useScrollDirection(threshold = 12): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: "up",
    y: 0,
    atTop: true,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let lastDir: "up" | "down" = "up";
    let ticking = false;

    const update = () => {
      const y = Math.max(0, window.scrollY);
      const atTop = y <= 4;
      const diff = y - lastY;

      let dir = lastDir;
      if (atTop) {
        // At the very top, always reset to "up" so utility bar reappears.
        dir = "up";
      } else if (Math.abs(diff) >= threshold) {
        dir = diff > 0 ? "down" : "up";
      }

      if (dir !== lastDir || Math.abs(diff) >= threshold || atTop) {
        lastY = y;
        lastDir = dir;
        setState((s) =>
          s.direction === dir && s.atTop === atTop && s.y === y
            ? s
            : { direction: dir, y, atTop }
        );
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}
