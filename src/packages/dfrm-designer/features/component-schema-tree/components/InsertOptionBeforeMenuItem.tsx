import React from "react";
import { CgInsertBefore } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createOptionNode } from "../../schema-tree";

interface InsertOptionBeforeMenuItemProps {
  path: string[];
}

export const InsertOptionBeforeMenuItem: React.FunctionComponent<InsertOptionBeforeMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createOptionNode();
      dispatch({
        type: "component-schema-tree__insert-before",
        payload: { path, node },
      });
      dispatch({
        type: "component-schema-tree__select",
        payload: { path: path.slice(0, -1).concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertBefore />} text="Insert option before" onClick={onClick} />;
  });
