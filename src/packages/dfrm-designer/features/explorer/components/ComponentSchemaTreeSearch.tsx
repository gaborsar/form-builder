import React from "react";
import { ExplorerSearchInput } from "../../../components/Explorer";
import { useComponentSchemaTreeState, useDispatch } from "../../../model";

export const ComponentSchemaTreeSearch: React.FunctionComponent = React.memo(() => {
  const { query } = useComponentSchemaTreeState();
  const dispatch = useDispatch();
  const onChangeQuery = React.useCallback(
    (query: string) => {
      dispatch({
        type: "component-schema-tree__search",
        payload: { query },
      });
    },
    [dispatch],
  );
  return <ExplorerSearchInput query={query} onChangeQuery={onChangeQuery} />;
});
