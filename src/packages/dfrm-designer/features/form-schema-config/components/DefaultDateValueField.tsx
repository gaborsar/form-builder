import React from "react";
import { Field, Input, ValidationError } from "../../../../dfrm-components";
import { type SchemaTreeDateNodeData, type SchemaTreeNodeData, useDispatch } from "../../../model";
import type { Node } from "../../../utils/tree";

interface DefaultDateValueFieldProps {
  path: string[];
  node: Node<SchemaTreeDateNodeData, SchemaTreeNodeData>;
}

export const DefaultDateValueField: React.FunctionComponent<DefaultDateValueFieldProps> =
  React.memo(({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { defaultValue } = data;

    const onChangeValue = React.useCallback(
      (value: string) => {
        dispatch({
          type: "form-schema-tree__replace",
          payload: {
            path,
            node: {
              ...node,
              data: { ...data, defaultValue: value },
            },
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="defaultValue">Default value</label>
        <Input type="date" name="defaultValue" value={defaultValue} onChangeValue={onChangeValue} />
        <ValidationError />
      </Field>
    );
  });
