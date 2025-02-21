import React from "react";
import { CgMoveUp } from "react-icons/cg";
import { MenuItem } from "../../../components/ContextMenu";
import { useDispatch } from "../../../model";

interface MoveUpMenuItemProps {
  path: string[];
}

export const MoveUpMenuItem: React.FunctionComponent<MoveUpMenuItemProps> = React.memo(
  ({ path }) => {
    const dispatch = useDispatch();
    const onClick = React.useCallback(() => {
      dispatch({
        type: "tag-tree__move-up",
        payload: { path },
      });
      dispatch({
        type: "tag-tree__select",
        payload: { path },
      });
    }, [dispatch, path]);
    return <MenuItem icon={<CgMoveUp />} text="Move up" onClick={onClick} />;
  },
);
