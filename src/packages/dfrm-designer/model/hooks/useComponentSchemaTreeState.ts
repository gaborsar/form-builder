import React from "react";
import { findNodeByPath } from "../../utils/tree";
import {
  type ComponentSchemaTreeState,
  emptyComponentSchemaTreeState,
} from "../component-schema-tree";
import { EditorTabType } from "../editor";
import { useComponentTreeState } from "./useComponentTreeState";
import { useEditorState } from "./useEditorState";

export function useComponentSchemaTreeState(): ComponentSchemaTreeState {
  const { tabs, index } = useEditorState();
  const { root } = useComponentTreeState();
  return React.useMemo(() => {
    if (tabs.length === 0 || index === -1) {
      return emptyComponentSchemaTreeState;
    }
    const { type, path } = tabs[index];
    if (type !== EditorTabType.Component) {
      return emptyComponentSchemaTreeState;
    }
    const node = findNodeByPath(root, path);
    if (node.data.type === "Parent") {
      return emptyComponentSchemaTreeState;
    }
    return node.data.schemaTree;
  }, [tabs, index, root]);
}
