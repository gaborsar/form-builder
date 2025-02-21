import React from "react";
import { ExplorerSearchInput } from "../../../components/Explorer";
import { useComponentTreeState, useDispatch } from "../../../model";

export const ComponentTreeSearch: React.FunctionComponent = React.memo(() => {
  const { query } = useComponentTreeState();
  const dispatch = useDispatch();
  const onChangeQuery = React.useCallback(
    (query: string) => {
      dispatch({
        type: "component-tree__search",
        payload: { query },
      });
    },
    [dispatch],
  );
  return <ExplorerSearchInput query={query} onChangeQuery={onChangeQuery} />;
});
