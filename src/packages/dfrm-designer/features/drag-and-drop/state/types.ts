import type { Node } from "../../../utils/tree";

export enum DndMode {
  MoveIn = "move-in",
  MoveBefore = "move-before",
  MoveAfter = "move-after",
  MoveOver = "move-over",
}

export interface DndSubject<Data> {
  path: string[];
  ancestors: Node<Data>[];
  node: Node<Data>;
  index: number;
}
