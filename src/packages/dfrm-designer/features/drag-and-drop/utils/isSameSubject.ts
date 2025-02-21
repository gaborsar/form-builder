import type { DndSubject } from "../state/types";

export function isSameSubject<Data>(
  subjectA: DndSubject<Data>,
  subjectB: DndSubject<Data>,
): boolean {
  return subjectA.node === subjectB.node;
}
