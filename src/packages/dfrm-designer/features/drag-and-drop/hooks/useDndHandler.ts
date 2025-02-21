import React from "react";
import type { DndSubject } from "../state/types";

export function useDndHandler<Data, Action>(
  dispatch: React.Dispatch<Action>,
  fn: (
    dispatch: React.Dispatch<Action>,
    source: DndSubject<Data>,
    target: DndSubject<Data>,
  ) => unknown,
): (source: DndSubject<Data>, target: DndSubject<Data>) => void {
  return React.useCallback(
    (source, target) => {
      fn(dispatch, source, target);
    },
    [dispatch, fn],
  );
}
