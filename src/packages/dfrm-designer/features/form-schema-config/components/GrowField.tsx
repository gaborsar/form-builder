import { Checkbox, Field, ValidationError } from "dfrm-components";
import React from "react";
import {
  type SchemaTreeColumnNodeData,
  type SchemaTreeNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface GrowFieldProps {
  path: string[];
  node: Node<SchemaTreeColumnNodeData, SchemaTreeNodeData>;
}

export const GrowField: React.FunctionComponent<GrowFieldProps> = React.memo(({ path, node }) => {
  const dispatch = useDispatch();

  const { data } = node;
  const { grow } = data;

  const onChangeChecked = React.useCallback(
    (value: boolean) => {
      dispatch({
        type: "form-schema-tree__replace",
        payload: {
          path,
          node: { ...node, data: { ...data, grow: value } },
        },
      });
    },
    [dispatch, path, node, data],
  );

  return (
    <Field>
      <label htmlFor="grow">Grow to fit</label>
      <Checkbox name="grow" checked={grow} onChangeChecked={onChangeChecked} />
      <ValidationError />
    </Field>
  );
});
