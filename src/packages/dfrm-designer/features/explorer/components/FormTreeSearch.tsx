import React from "react";
import { ExplorerSearchInput } from "../../../components/Explorer";
import { useDispatch, useFormTreeState } from "../../../model";

export const FormTreeSearch: React.FunctionComponent = React.memo(() => {
  const { query } = useFormTreeState();
  const dispatch = useDispatch();
  const onChangeQuery = React.useCallback(
    (query: string) => {
      dispatch({
        type: "form-tree__search",
        payload: { query },
      });
    },
    [dispatch],
  );
  return <ExplorerSearchInput query={query} onChangeQuery={onChangeQuery} />;
});
