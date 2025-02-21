import React from "react";
import { type TagTreeNodeData, useDispatch, useTagTreeState } from "../../../model";
import { type Node, isSamePath } from "../../../utils/tree";

interface UseParentPropsResult {
  isSelected: boolean;
  isVisible: boolean;
  isOpen: boolean;
  onSelect(): void;
  onToggle(): void;
}

export function useParentProps(path: string[], node: Node<TagTreeNodeData>): UseParentPropsResult {
  const { path: selectedPath } = useTagTreeState();
  const dispatch = useDispatch();

  const isSelected = React.useMemo(() => isSamePath(selectedPath, path), [selectedPath, path]);

  const onSelect = React.useCallback(() => {
    dispatch({ type: "tag-tree__select", payload: { path } });
  }, [dispatch, path]);

  const onToggle = React.useCallback(() => {
    dispatch({ type: "tag-tree__toggle", payload: { path } });
  }, [dispatch, path]);

  return {
    isSelected,
    isVisible: node.visible,
    isOpen: !node.collapsed,
    onSelect,
    onToggle,
  };
}
