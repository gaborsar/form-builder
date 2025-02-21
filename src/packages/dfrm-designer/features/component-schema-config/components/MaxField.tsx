import { Field, NumberInput, ValidationError } from "dfrm-components";
import React from "react";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeNumberNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface MaxFieldProps {
  path: string[];
  node: Node<SchemaTreeNumberNodeData, ComponentSchemaTreeNodeData>;
}

export const MaxField: React.FunctionComponent<MaxFieldProps> = React.memo(({ path, node }) => {
  const dispatch = useDispatch();

  const { data } = node;
  const { max } = data;

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
              max: value === "" ? null : Number.parseInt(value, 0),
            },
          },
        },
      });
    },
    [dispatch, path, node, data],
  );

  return (
    <Field>
      <label htmlFor="max">Max</label>
      <NumberInput name="max" value={max === null ? "" : `${max}`} onChangeValue={onChangeValue} />
      <ValidationError />
    </Field>
  );
});
