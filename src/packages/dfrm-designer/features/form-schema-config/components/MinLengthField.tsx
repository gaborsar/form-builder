import React from "react";
import { Field, NumberInput, ValidationError } from "../../../../dfrm-components";
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

interface MinLengthFieldProps {
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

export const MinLengthField: React.FunctionComponent<MinLengthFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { minLength } = data;

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
                minLength: value === "" ? null : Number.parseInt(value, 0),
              },
            } as typeof node,
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="minLength">Min length</label>
        <NumberInput
          name="minLength"
          value={minLength === null ? "" : `${minLength}`}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
