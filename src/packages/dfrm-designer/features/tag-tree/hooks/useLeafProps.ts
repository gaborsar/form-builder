import React from "react";
import { EditorTabType, type TagTreeNodeData, useDispatch, useTagTreeState } from "../../../model";
import { type Node, isSamePath } from "../../../utils/tree";

interface UseLeafPropsResult {
  isSelected: boolean;
  isVisible: boolean;
  onSelect(): void;
  onOpen(): void;
}

export function useLeafProps(path: string[], node: Node<TagTreeNodeData>): UseLeafPropsResult {
  const { path: selectedPath } = useTagTreeState();
  const dispatch = useDispatch();

  const isSelected = React.useMemo(() => isSamePath(selectedPath, path), [selectedPath, path]);

  const onSelect = React.useCallback(() => {
    dispatch({ type: "tag-tree__select", payload: { path } });
  }, [dispatch, path]);

  const onOpen = React.useCallback(() => {
    dispatch({
      type: "tag-tree__select",
      payload: { path },
    });
    dispatch({
      type: "editor__open-tab",
      payload: { type: EditorTabType.Tag, path },
    });
  }, [dispatch, path]);

  return {
    isSelected,
    isVisible: node.visible,
    onSelect,
    onOpen,
  };
}
