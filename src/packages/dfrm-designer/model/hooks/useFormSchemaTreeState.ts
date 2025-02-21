import React from "react";
import { findNodeByPath } from "../../utils/tree";
import { EditorTabType } from "../editor";
import { type FormSchemaTreeState, emptyFormSchemaTreeState } from "../form-schema-tree";
import { useEditorState } from "./useEditorState";
import { useFormTreeState } from "./useFormTreeState";

export function useFormSchemaTreeState(): FormSchemaTreeState {
  const { tabs, index } = useEditorState();
  const { root } = useFormTreeState();
  return React.useMemo(() => {
    if (tabs.length === 0 || index === -1) {
      return emptyFormSchemaTreeState;
    }
    const { type, path } = tabs[index];
    if (type !== EditorTabType.Form) {
      return emptyFormSchemaTreeState;
    }
    const node = findNodeByPath(root, path);
    if (node.data.type === "Parent") {
      return emptyFormSchemaTreeState;
    }
    return node.data.schemaTree;
  }, [tabs, index, root]);
}
