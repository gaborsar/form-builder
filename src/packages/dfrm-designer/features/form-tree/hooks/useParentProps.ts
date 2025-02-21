import React from "react";
import { type FormTreeNodeData, useDispatch, useFormTreeState } from "../../../model";
import { type Node, isSamePath } from "../../../utils/tree";

interface UseParentPropsResult {
  isSelected: boolean;
  isOpen: boolean;
  isVisible: boolean;
  onSelect(): void;
  onToggle(): void;
}

export function useParentProps(path: string[], node: Node<FormTreeNodeData>): UseParentPropsResult {
  const { path: selectedPath } = useFormTreeState();
  const dispatch = useDispatch();

  const isSelected = React.useMemo(() => isSamePath(selectedPath, path), [selectedPath, path]);

  const onSelect = React.useCallback(() => {
    dispatch({
      type: "form-tree__select",
      payload: { path },
    });
  }, [dispatch, path]);

  const onToggle = React.useCallback(() => {
    dispatch({
      type: "form-tree__toggle",
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
