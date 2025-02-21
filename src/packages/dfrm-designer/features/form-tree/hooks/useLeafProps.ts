import React from "react";
import {
  EditorTabType,
  ExplorerTabId,
  type FormTreeNodeData,
  useDispatch,
  useFormTreeState,
} from "../../../model";
import { type Node, isSamePath } from "../../../utils/tree";

interface UseLeafPropsResult {
  isSelected: boolean;
  isVisible: boolean;
  onSelect(): void;
  onOpen(): void;
}

export function useLeafProps(path: string[], node: Node<FormTreeNodeData>): UseLeafPropsResult {
  const { path: selectedPath } = useFormTreeState();
  const dispatch = useDispatch();

  const isSelected = React.useMemo(() => isSamePath(selectedPath, path), [selectedPath, path]);

  const onSelect = React.useCallback(() => {
    dispatch({
      type: "form-tree__select",
      payload: { path },
    });
  }, [dispatch, path]);

  const onOpen = React.useCallback(() => {
    dispatch({
      type: "form-tree__select",
      payload: { path },
    });
    dispatch({
      type: "editor__open-tab",
      payload: { type: EditorTabType.Form, path },
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
