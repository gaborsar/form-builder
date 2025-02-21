import React from "react";
import { VscArrowRight } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import { EditorTabType, ExplorerTabId, useDispatch } from "../../../model";

interface OpenMenuItemProps {
  path: string[];
}

export const OpenMenuItem: React.FunctionComponent<OpenMenuItemProps> = React.memo(({ path }) => {
  const dispatch = useDispatch();
  const onClick = React.useCallback(() => {
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
  return <MenuItem icon={<VscArrowRight />} text="Open" onClick={onClick} />;
});
