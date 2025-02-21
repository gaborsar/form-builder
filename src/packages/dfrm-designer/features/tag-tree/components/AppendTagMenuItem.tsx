import React from "react";
import { VscAdd } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";
import { createLeafNode } from "../utils/createLeafNode";

interface AppendTagMenuItemProps {
  path: string[];
}

export const AppendTagMenuItem: React.FunctionComponent<AppendTagMenuItemProps> = React.memo(
  ({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      const node = createLeafNode();
      dispatch({
        type: "tag-tree__append",
        payload: { path, node },
      });
      dispatch({
        type: "tag-tree__select",
        payload: { path: path.concat(node.id) },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<VscAdd />} text="Append tag" onClick={onClick} />;
  },
);
