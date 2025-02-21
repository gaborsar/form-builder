import React from "react";
import {
  type ComponentSchemaTreeNodeData,
  useComponentSchemaTreeState,
  useDispatch,
} from "../../../model";
import { type Node, isSamePath } from "../../../utils/tree";

interface UseLeafPropsResult {
  isSelected: boolean;
  isVisible: boolean;
  onSelect(): void;
}

export function useLeafProps(
  path: string[],
  node: Node<ComponentSchemaTreeNodeData>,
): UseLeafPropsResult {
  const { path: selectedPath } = useComponentSchemaTreeState();
  const dispatch = useDispatch();

  const isSelected = React.useMemo(() => isSamePath(selectedPath, path), [selectedPath, path]);

  const onSelect = React.useCallback(() => {
    dispatch({
      type: "component-schema-tree__select",
      payload: { path },
    });
  }, [dispatch, path]);

  return {
    isSelected,
    isVisible: node.visible,
    onSelect,
  };
}
