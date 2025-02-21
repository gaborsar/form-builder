import React from "react";
import { Field, Input, ValidationError } from "../../../../dfrm-components";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeOptionNodeData,
  useDispatch,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface LabelFieldProps {
  path: string[];
  node: Node<SchemaTreeOptionNodeData, ComponentSchemaTreeNodeData>;
  placeholder?: string;
}

export const LabelField: React.FunctionComponent<LabelFieldProps> = React.memo(
  ({ path, node, placeholder }) => {
    const { locale } = useIntlState();
    const dispatch = useDispatch();

    const { data } = node;
    const { label } = data;

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
                label: { ...data.label, [locale]: value },
              },
            } as typeof node,
          },
        });
      },
      [dispatch, path, node, data, locale],
    );

    return (
      <Field>
        <label htmlFor="label">Label</label>
        <Input
          type="text"
          name="label"
          placeholder={placeholder}
          value={label[locale] || ""}
          helper={locale}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
