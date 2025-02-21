import React from "react";

export function useOnClickOutside<T extends Element>(
  ref: React.RefObject<T | null>,
  callback: (event: MouseEvent) => unknown,
): void {
  const handler = React.useCallback(
    (event: MouseEvent) => {
      if (ref.current === null || ref.current.contains(event.target as Element)) {
        return;
      }
      callback(event);
    },
    [ref, callback],
  );
  React.useEffect(() => {
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [handler]);
}
