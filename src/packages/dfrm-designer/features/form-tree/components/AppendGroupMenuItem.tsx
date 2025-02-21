import React from "react";
import { VscAdd } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createParentNode } from "../utils/createParentNode";

interface AppendGroupMenuItemProps {
  path: string[];
}

export const AppendGroupMenuItem: React.FunctionComponent<AppendGroupMenuItemProps> = React.memo(
  ({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createParentNode();
      dispatch({
        type: "form-tree__append",
        payload: { path, node },
      });
      dispatch({
        type: "form-tree__select",
        payload: { path: path.concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<VscAdd />} text="Append group" onClick={onClick} />;
  },
);
