import React from "react";
import { VscAdd } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createRowNode } from "../../schema-tree";

interface AppendRowMenuItemProps {
  path: string[];
}

export const AppendRowMenuItem: React.FunctionComponent<AppendRowMenuItemProps> = React.memo(
  ({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createRowNode();
      dispatch({
        type: "form-schema-tree__append",
        payload: { path, node },
      });
      dispatch({
        type: "form-schema-tree__select",
        payload: { path: path.concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<VscAdd />} text="Append row" onClick={onClick} />;
  },
);
