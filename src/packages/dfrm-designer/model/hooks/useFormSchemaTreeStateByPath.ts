import React from "react";
import { findNodeByPath } from "../../utils/tree";
import { type FormSchemaTreeState, emptyFormSchemaTreeState } from "../form-schema-tree";
import { useFormTreeState } from "./useFormTreeState";

export function useFormSchemaTreeStateByPath(path: string[]): FormSchemaTreeState {
  const { root } = useFormTreeState();
  return React.useMemo(() => {
    const node = findNodeByPath(root, path);
    if (node.data.type === "Parent") {
      return emptyFormSchemaTreeState;
    }
    return node.data.schemaTree;
  }, [root, path]);
}
