'use client';

import { useEffect, useRef, useState, type ReactElement } from 'react';
import { ResponsiveContainer } from 'recharts';

type ResponsiveChartProps = {
  children: ReactElement;
  className?: string;
  /** Explicit pixel height — avoids 0-height flex/percentage races. */
  height: number;
};

/**
 * Mounts Recharts only after the container has a non-zero box.
 * Prevents "width(0) and height(0)" warnings when a parent is `display: none`
 * or still laying out.
 */
export function ResponsiveChart({ children, className, height }: ResponsiveChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const { width, height: h } = el.getBoundingClientRect();
      setReady(width > 0 && h > 0);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ width: '100%', height, minWidth: 0 }}>
      {ready ? (
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          {children}
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}
