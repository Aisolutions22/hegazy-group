import { useEffect, useState } from "react";

export type ScrollState = {
  direction: "up" | "down";
  y: number;
  atTop: boolean;
};

export function useScrollDirection(threshold = 8): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: "up",
    y: 0,
    atTop: true,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const diff = y - lastY;
        if (Math.abs(diff) >= threshold) {
          setState({
            direction: diff > 0 ? "down" : "up",
            y,
            atTop: y < 24,
          });
          lastY = y;
        } else {
          setState((s) => ({ ...s, y, atTop: y < 24 }));
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}
