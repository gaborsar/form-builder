import React from "react";
import type { FormTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";

export function usePath(parentPath: string[], { id }: Node<FormTreeNodeData>): string[] {
  return React.useMemo(() => parentPath.concat(id), [parentPath, id]);
}
