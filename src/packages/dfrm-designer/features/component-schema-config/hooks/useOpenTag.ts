import React from "react";
import {
  ExplorerTabId,
  TagTreeLeafConfigTabId,
  useDispatch,
  useTagTreeState,
} from "../../../model";
import { findPath } from "../../../utils/tree";

export function useOpenTag(): (id: string) => void {
  const { root } = useTagTreeState();
  const dispatch = useDispatch();

  return React.useCallback(
    (id: string) => {
      dispatch({
        type: "tag-tree__select",
        payload: { path: findPath(root, id) },
      });
      dispatch({
        type: "explorer__set-tab",
        payload: { tab: ExplorerTabId.Tags },
      });
      dispatch({
        type: "tag-tree-leaf-config__set-tab",
        payload: { tab: TagTreeLeafConfigTabId.Properties },
      });
    },
    [root, dispatch],
  );
}
