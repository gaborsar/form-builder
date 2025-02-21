import React from "react";
import { Field, NumberInput, ValidationError } from "../../../../dfrm-components";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeNumberNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface MinFieldProps {
  path: string[];
  node: Node<SchemaTreeNumberNodeData, ComponentSchemaTreeNodeData>;
}

export const MinField: React.FunctionComponent<MinFieldProps> = React.memo(({ path, node }) => {
  const dispatch = useDispatch();

  const { data } = node;
  const { min } = data;

  const onChangeValue = React.useCallback(
    (value: string) => {
      dispatch({
        type: "component-schema-tree__replace",
        payload: {
          path,
          node: {
            ...node,
            data: {
              ...data,
              min: value === "" ? null : Number.parseInt(value, 0),
            },
          },
        },
      });
    },
    [dispatch, path, node, data],
  );

  return (
    <Field>
      <label htmlFor="min">Min</label>
      <NumberInput name="min" value={min === null ? "" : `${min}`} onChangeValue={onChangeValue} />
      <ValidationError />
    </Field>
  );
});
