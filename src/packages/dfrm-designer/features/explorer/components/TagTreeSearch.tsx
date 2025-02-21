import React from "react";
import { ExplorerSearchInput } from "../../../components/Explorer";
import { useDispatch, useTagTreeState } from "../../../model";

export const TagTreeSearch: React.FunctionComponent = React.memo(() => {
  const { query } = useTagTreeState();
  const dispatch = useDispatch();
  const onChangeQuery = React.useCallback(
    (query: string) => {
      dispatch({
        type: "tag-tree__search",
        payload: { query },
      });
    },
    [dispatch],
  );
  return <ExplorerSearchInput query={query} onChangeQuery={onChangeQuery} />;
});
