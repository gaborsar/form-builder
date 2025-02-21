import React from "react";
import { VscAdd } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createColumnNode, createEmptyNode, createFieldNode } from "../../schema-tree";

interface AppendColumnMenuItemProps {
  path: string[];
}

export const AppendColumnMenuItem: React.FunctionComponent<AppendColumnMenuItemProps> = React.memo(
  ({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node1 = createEmptyNode();
      const node2 = createFieldNode([node1]);
      const node3 = createColumnNode([node2]);
      dispatch({
        type: "form-schema-tree__append",
        payload: { path, node: node3 },
      });
      dispatch({
        type: "form-schema-tree__select",
        payload: { path: path.concat(node3.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<VscAdd />} text="Append column" onClick={onClick} />;
  },
);
