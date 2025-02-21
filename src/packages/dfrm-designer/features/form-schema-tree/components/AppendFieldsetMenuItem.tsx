import React from "react";
import { VscAdd } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createFieldsetNode } from "../../schema-tree";

interface AppendFieldsetMenuItemProps {
  path: string[];
}

export const AppendFieldsetMenuItem: React.FunctionComponent<AppendFieldsetMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createFieldsetNode();
      dispatch({
        type: "form-schema-tree__append",
        payload: { path, node },
      });
      dispatch({
        type: "form-schema-tree__select",
        payload: { path: path.concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<VscAdd />} text="Append fieldset" onClick={onClick} />;
  });
