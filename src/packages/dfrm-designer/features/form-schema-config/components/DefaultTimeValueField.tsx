import { Field, Input, ValidationError } from "dfrm-components";
import React from "react";
import { type SchemaTreeNodeData, type SchemaTreeTimeNodeData, useDispatch } from "../../../model";
import type { Node } from "../../../utils/tree";

interface DefaultTimeValueFieldProps {
  path: string[];
  node: Node<SchemaTreeTimeNodeData, SchemaTreeNodeData>;
}

export const DefaultTimeValueField: React.FunctionComponent<DefaultTimeValueFieldProps> =
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
        <Input type="time" name="defaultValue" value={defaultValue} onChangeValue={onChangeValue} />
        <ValidationError />
      </Field>
    );
  });
