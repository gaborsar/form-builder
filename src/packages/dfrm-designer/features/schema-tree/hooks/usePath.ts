import React from "react";
import type { SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";

export function usePath(parentPath: string[], { id }: Node<SchemaTreeNodeData>): string[] {
  return React.useMemo(() => parentPath.concat(id), [parentPath, id]);
}
