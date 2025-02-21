import React from "react";
import {
  type ComponentTreeNodeData,
  EditorTabType,
  ExplorerTabId,
  useComponentTreeState,
  useDispatch,
} from "../../../model";
import { type Node, isSamePath } from "../../../utils/tree";

interface UseLeafPropsResult {
  isSelected: boolean;
  isVisible: boolean;
  onSelect(): void;
  onOpen(): void;
}

export function useLeafProps(
  path: string[],
  node: Node<ComponentTreeNodeData>,
): UseLeafPropsResult {
  const { path: selectedPath } = useComponentTreeState();
  const dispatch = useDispatch();

  const isSelected = React.useMemo(() => isSamePath(selectedPath, path), [selectedPath, path]);

  const onSelect = React.useCallback(() => {
    dispatch({
      type: "component-tree__select",
      payload: { path },
    });
  }, [dispatch, path]);

  const onOpen = React.useCallback(() => {
    dispatch({
      type: "component-tree__select",
      payload: { path },
    });
    dispatch({
      type: "editor__open-tab",
      payload: { type: EditorTabType.Component, path },
    });
    dispatch({
      type: "explorer__set-tab",
      payload: { tab: ExplorerTabId.Structure },
    });
  }, [dispatch, path]);

  return {
    isSelected,
    isVisible: node.visible,
    onSelect,
    onOpen,
  };
}
