import React from "react";
import { VscAdd } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createOptionNode } from "../../schema-tree";

interface AppendOptionMenuItemProps {
  path: string[];
}

export const AppendOptionMenuItem: React.FunctionComponent<AppendOptionMenuItemProps> = React.memo(
  ({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createOptionNode();
      dispatch({
        type: "form-schema-tree__append",
        payload: { path, node },
      });
      dispatch({
        type: "form-schema-tree__select",
        payload: { path: path.concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<VscAdd />} text="Append option" onClick={onClick} />;
  },
);
