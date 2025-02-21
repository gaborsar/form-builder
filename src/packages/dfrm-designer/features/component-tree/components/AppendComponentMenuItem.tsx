import React from "react";
import { VscAdd } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createLeafNode } from "../utils/createLeafNode";

interface AppendComponentMenuItemProps {
  path: string[];
}

export const AppendComponentMenuItem: React.FunctionComponent<AppendComponentMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createLeafNode();
      dispatch({
        type: "component-tree__append",
        payload: { path, node },
      });
      dispatch({
        type: "component-tree__select",
        payload: { path: path.concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<VscAdd />} text="Append component" onClick={onClick} />;
  });
