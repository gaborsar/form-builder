import React from "react";
import { Field, Input, ValidationError } from "../../../../dfrm-components";
import {
  type SchemaTreeLongTextNodeData,
  type SchemaTreeNodeData,
  type SchemaTreePasswordNodeData,
  type SchemaTreeShortTextNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface PatternFieldProps {
  path: string[];
  node: Node<
    SchemaTreeShortTextNodeData | SchemaTreeLongTextNodeData | SchemaTreePasswordNodeData,
    SchemaTreeNodeData
  >;
}

export const PatternField: React.FunctionComponent<PatternFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { pattern } = data;

    const onChangeValue = React.useCallback(
      (value: string) => {
        dispatch({
          type: "form-schema-tree__replace",
          payload: {
            path,
            node: { ...node, data: { ...data, pattern: value } },
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="pattern">Pattern</label>
        <Input type="text" name="pattern" value={pattern} onChangeValue={onChangeValue} />
        <ValidationError />
      </Field>
    );
  },
);
