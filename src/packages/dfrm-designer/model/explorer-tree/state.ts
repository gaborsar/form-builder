import type { Node } from "../../utils/tree";

export interface ExplorerTreeState<Data> {
  query: string;
  path: string[];
  root: Node<Data>;
}
