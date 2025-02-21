import React from "react";
import { VscAdd } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createParentNode } from "../utils/createParentNode";

interface AppendGroupMenuItem {
  path: string[];
}

export const AppendGroupMenuItem: React.FunctionComponent<AppendGroupMenuItem> = React.memo(
  ({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createParentNode();
      dispatch({
        type: "tag-tree__append",
        payload: { path, node },
      });
      dispatch({
        type: "tag-tree__select",
        payload: { path: path.concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<VscAdd />} text="Append group" onClick={onClick} />;
  },
);
