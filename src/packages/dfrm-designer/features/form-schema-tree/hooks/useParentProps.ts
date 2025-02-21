import React from "react";
import { type SchemaTreeNodeData, useDispatch, useFormSchemaTreeState } from "../../../model";
import { type Node, isSamePath } from "../../../utils/tree";

interface UseParentPropsResult {
  isSelected: boolean;
  isOpen: boolean;
  isVisible: boolean;
  onSelect(): void;
  onToggle(): void;
}

export function useParentProps(
  path: string[],
  node: Node<SchemaTreeNodeData>,
): UseParentPropsResult {
  const { path: selectedPath } = useFormSchemaTreeState();
  const dispatch = useDispatch();

  const isSelected = React.useMemo(() => isSamePath(selectedPath, path), [selectedPath, path]);

  const onSelect = React.useCallback(() => {
    dispatch({
      type: "form-schema-tree__select",
      payload: { path },
    });
  }, [dispatch, path]);

  const onToggle = React.useCallback(() => {
    dispatch({
      type: "form-schema-tree__toggle",
      payload: { path },
    });
  }, [dispatch, path]);

  return {
    isSelected,
    isOpen: !node.collapsed,
    isVisible: node.visible,
    onSelect,
    onToggle,
  };
}
