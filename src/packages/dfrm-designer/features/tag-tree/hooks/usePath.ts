import React from "react";
import type { TagTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";

export function usePath(parentPath: string[], { id }: Node<TagTreeNodeData>): string[] {
  return React.useMemo(() => parentPath.concat(id), [parentPath, id]);
}
