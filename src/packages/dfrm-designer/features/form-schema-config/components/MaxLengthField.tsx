import { Field, NumberInput, ValidationError } from "dfrm-components";
import React from "react";
import {
  type SchemaTreeFieldGroupListNodeData,
  type SchemaTreeFieldListNodeData,
  type SchemaTreeLongTextNodeData,
  type SchemaTreeNodeData,
  type SchemaTreePasswordNodeData,
  type SchemaTreeShortTextNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface MaxLengthFieldProps {
  path: string[];
  node: Node<
    | SchemaTreeFieldListNodeData
    | SchemaTreeFieldGroupListNodeData
    | SchemaTreeShortTextNodeData
    | SchemaTreeLongTextNodeData
    | SchemaTreePasswordNodeData,
    SchemaTreeNodeData
  >;
}

export const MaxLengthField: React.FunctionComponent<MaxLengthFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { maxLength } = data;

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
                maxLength: value === "" ? null : Number.parseInt(value, 0),
              },
            } as typeof node,
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="maxLength">Max length</label>
        <NumberInput
          name="maxLength"
          value={maxLength === null ? "" : `${maxLength}`}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
