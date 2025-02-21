import { Field, Input, ValidationError } from "dfrm-components";
import React from "react";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeOptionNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface ValueFieldProps {
  path: string[];
  node: Node<SchemaTreeOptionNodeData, ComponentSchemaTreeNodeData>;
  placeholder?: string;
}

export const ValueField: React.FunctionComponent<ValueFieldProps> = React.memo(
  ({ path, node, placeholder }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { value } = data;

    const onChangeValue = React.useCallback(
      (value: string) => {
        dispatch({
          type: "component-schema-tree__replace",
          payload: {
            path,
            node: { ...node, data: { ...data, value } },
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="value">Data value</label>
        <Input
          type="text"
          name="value"
          placeholder={placeholder}
          value={value}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
