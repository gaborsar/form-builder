import type { DndSubject } from "../state/types";

export function hasSameParent<Data>(source: DndSubject<Data>, target: DndSubject<Data>): boolean {
  if (source.ancestors.length === 0 && target.ancestors.length === 0) {
    return true;
  }
  if (source.ancestors.length === 0 || target.ancestors.length === 0) {
    return false;
  }

  const { id: idA } = source.ancestors[source.ancestors.length - 1];
  const { id: idB } = target.ancestors[target.ancestors.length - 1];

  return idA === idB;
}
