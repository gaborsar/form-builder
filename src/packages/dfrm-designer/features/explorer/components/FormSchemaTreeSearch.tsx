import React from "react";
import { ExplorerSearchInput } from "../../../components/Explorer";
import { useDispatch, useFormSchemaTreeState } from "../../../model";

export const FormSchemaTreeSearch: React.FunctionComponent = React.memo(() => {
  const { query } = useFormSchemaTreeState();
  const dispatch = useDispatch();
  const onChangeQuery = React.useCallback(
    (query: string) => {
      dispatch({
        type: "form-schema-tree__search",
        payload: { query },
      });
    },
    [dispatch],
  );
  return <ExplorerSearchInput query={query} onChangeQuery={onChangeQuery} />;
});
