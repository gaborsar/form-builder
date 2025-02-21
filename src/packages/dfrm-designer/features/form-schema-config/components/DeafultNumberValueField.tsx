import React from "react";
import { Field, NumberInput, ValidationError } from "../../../../dfrm-components";
import {
  type SchemaTreeNodeData,
  type SchemaTreeNumberNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface DefaultNumberValueFieldProps {
  path: string[];
  node: Node<SchemaTreeNumberNodeData, SchemaTreeNodeData>;
}

export const DefaultNumberValueField: React.FunctionComponent<DefaultNumberValueFieldProps> =
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
              data: {
                ...data,
                defaultValue: value === "" ? null : Number.parseInt(value, 10),
              },
            },
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="defaultValue">Default value</label>
        <NumberInput
          name="defaultValue"
          value={defaultValue === null ? "" : `${defaultValue}`}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  });
