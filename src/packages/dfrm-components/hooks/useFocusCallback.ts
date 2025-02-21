import React from "react";

export function useFocusCallback<Element extends { focus(): unknown }>(
  ref: React.RefObject<Element | null>,
): () => void {
  return React.useCallback(() => {
    const { current: el } = ref;
    if (el !== null) {
      el.focus();
    }
  }, [ref]);
}
