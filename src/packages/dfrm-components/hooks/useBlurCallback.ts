import React from "react";

export function useBlurCallback<Element extends { blur(): unknown }>(
  ref: React.RefObject<Element | null>,
): () => void {
  return React.useCallback(() => {
    const { current: el } = ref;
    if (el !== null) {
      el.blur();
    }
  }, [ref]);
}
