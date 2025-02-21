import React from "react";
import { Field, NumberInput, ValidationError } from "../../../../dfrm-components";
import {
  type SchemaTreeNodeData,
  type SchemaTreeNumberNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface MaxExclusiveFieldProps {
  path: string[];
  node: Node<SchemaTreeNumberNodeData, SchemaTreeNodeData>;
}

export const MaxExclusiveField: React.FunctionComponent<MaxExclusiveFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { maxExclusive } = data;

    const onChangeValue = React.useCallback(
      (value: string) => {
        dispatch({
          type: "form-schema-tree__replace",
          payload: {
            path,
            node: {
              ...node,
              data: {
                ...data,
                maxExclusive: value === "" ? null : Number.parseInt(value, 0),
              },
            },
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="maxExclusive">Max exclusive</label>
        <NumberInput
          name="maxExclusive"
          value={maxExclusive === null ? "" : `${maxExclusive}`}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
