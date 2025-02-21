import React from "react";
import { VscCopy } from "react-icons/vsc";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";

interface DuplicateMenuItemProps {
  path: string[];
}

export const DuplicateMenuItem: React.FunctionComponent<DuplicateMenuItemProps> = React.memo(
  ({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      dispatch({
        type: "component-tree__duplicate",
        payload: { path },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<VscCopy />} text="Duplicate" onClick={onClick} />;
  },
);
