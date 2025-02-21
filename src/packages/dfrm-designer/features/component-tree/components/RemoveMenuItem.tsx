import React from "react";
import { VscTrash } from "react-icons/vsc";
import { ConfirmMenuItem } from "../../../components/ContextMenu";
import { type ComponentTreeNodeData, useDispatch } from "../../../model";
import type { Node } from "../../../utils/tree";
import { getAllComponentIds } from "../utils/getAllComponentIds";

interface RemoveMenuItemProps {
  path: string[];
  node: Node<ComponentTreeNodeData>;
}

export const RemoveMenuItem: React.FunctionComponent<RemoveMenuItemProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      dispatch({
        type: "form-tree__remove-component-references",
        payload: { ids: getAllComponentIds(node) },
      });
      dispatch({
        type: "component-tree__select",
        payload: { path: path.slice(0, -1) },
      });
      dispatch({
        type: "component-tree__remove",
        payload: { path },
      });
      dispatch({
        type: "editor__close-tab",
        payload: { path },
      });
    }, [dispatch, path, node]);
    return <ConfirmMenuItem icon={<VscTrash />} text="Remove" onClick={onClick} />;
  },
);
