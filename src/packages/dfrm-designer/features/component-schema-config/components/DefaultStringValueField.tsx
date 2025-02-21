import { Field, Input, ValidationError } from "dfrm-components";
import React from "react";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeEmailNodeData,
  type SchemaTreeLongTextNodeData,
  type SchemaTreePasswordNodeData,
  type SchemaTreePhoneNumberNodeData,
  type SchemaTreeShortTextNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface DefaultStringValueFieldProps {
  path: string[];
  node: Node<
    | SchemaTreeShortTextNodeData
    | SchemaTreeLongTextNodeData
    | SchemaTreeEmailNodeData
    | SchemaTreePhoneNumberNodeData
    | SchemaTreePasswordNodeData,
    ComponentSchemaTreeNodeData
  >;
}

export const DefaultStringValueField: React.FunctionComponent<DefaultStringValueFieldProps> =
  React.memo(({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { defaultValue } = data;

    const onChangeValue = React.useCallback(
      (value: string) => {
        dispatch({
          type: "component-schema-tree__replace",
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
        <Input type="text" name="defaultValue" value={defaultValue} onChangeValue={onChangeValue} />
        <ValidationError />
      </Field>
    );
  });
