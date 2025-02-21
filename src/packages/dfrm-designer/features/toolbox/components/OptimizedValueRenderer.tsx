import React from "react";
import { Json } from "../../../components/Json";
import { EditorTabType, useEditorState, useFormTreeState } from "../../../model";
import { findNodeByPath } from "../../../utils/tree";

export const OptimiziedValueRenderer: React.FunctionComponent = React.memo(() => {
  const { tabs, index } = useEditorState();
  const { root } = useFormTreeState();

  const value = React.useMemo(() => {
    if (tabs.length === 0 || index === -1) {
      return null;
    }
    const { type, path } = tabs[index];
    if (type !== EditorTabType.Form) {
      return null;
    }
    const node = findNodeByPath(root, path);
    if (node.data.type !== "Leaf") {
      throw new Error();
    }
    return node.data.previewState.optimizedValue;
  }, [root, tabs, index]);

  if (value === null) {
    return null;
  }

  return <Json value={value} />;
});
