import { useCallback, useLayoutEffect, useRef, useState } from "react";

interface Size {
  width: number;
  height: number;
}

export function useContainerSize<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const handleResize = useCallback(() => {
    if (ref.current) {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) return;
    handleResize();
    const observer = new window.ResizeObserver(() => {
      if (ref.current) handleResize();
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [handleResize]);

  return [ref, size] as const;
}
