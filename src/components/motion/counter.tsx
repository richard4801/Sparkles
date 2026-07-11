"use client";

import * as React from "react";
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  animate,
} from "motion/react";

interface CounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/** Counts up from 0 to `value` once when scrolled into view. Reason: feedback
 *  that these are live platform figures. Static under reduced motion. */
export function Counter({ value, suffix, decimals = 0, className }: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [animated, setAnimated] = React.useState("0");

  const format = React.useCallback(
    (n: number) =>
      n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals],
  );

  React.useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(mv, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setAnimated(format(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, mv, format]);

  // Under reduced motion, jump straight to the final value once in view
  // (derived during render, so no setState inside the effect).
  const shown = reduce ? (inView ? format(value) : format(0)) : animated;

  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  );
}
