import React from "react";
import type { ComponentTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";

export function usePath(parentPath: string[], { id }: Node<ComponentTreeNodeData>): string[] {
  return React.useMemo(() => parentPath.concat(id), [parentPath, id]);
}
