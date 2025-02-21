import React from "react";
import { CgInsertBefore } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createColumnNode, createEmptyNode, createFieldNode } from "../../schema-tree";

interface InsertColumnBeforeMenuItemProps {
  path: string[];
}

export const InsertColumnBeforeMenuItem: React.FunctionComponent<InsertColumnBeforeMenuItemProps> =
  React.memo(({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node1 = createEmptyNode();
      const node2 = createFieldNode([node1]);
      const node3 = createColumnNode([node2]);
      dispatch({
        type: "form-schema-tree__insert-before",
        payload: { path, node: node3 },
      });
      dispatch({
        type: "form-schema-tree__select",
        payload: { path: path.slice(0, -1).concat(node3.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgInsertBefore />} text="Insert column before" onClick={onClick} />;
  });
