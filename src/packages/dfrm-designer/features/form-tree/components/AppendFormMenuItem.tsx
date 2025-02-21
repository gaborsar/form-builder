import React from "react";
import { VscAdd } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createLeafNode } from "../utils/createLeafNode";

interface AppendFormMenuItemProps {
  path: string[];
}

export const AppendFormMenuItem: React.FunctionComponent<AppendFormMenuItemProps> = React.memo(
  ({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createLeafNode();
      dispatch({
        type: "form-tree__append",
        payload: { path, node },
      });
      dispatch({
        type: "form-tree__select",
        payload: { path: path.concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<VscAdd />} text="Append form" onClick={onClick} />;
  },
);
