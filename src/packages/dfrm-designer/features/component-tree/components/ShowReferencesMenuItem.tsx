import React from "react";
import { VscReferences } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import { EditorTabType, ToolboxTabId, useDispatch } from "../../../model";

interface ShowReferencesMenuItemProps {
  path: string[];
}

export const ShowReferencesMenuItem: React.FunctionComponent<ShowReferencesMenuItemProps> =
  React.memo(({ path }) => {
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
        type: "toolbox__set-tab",
        payload: { tab: ToolboxTabId.References },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<VscReferences />} text="Show references" onClick={onClick} />;
  });
