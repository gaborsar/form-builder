import { Checkbox, Field, ValidationError } from "dfrm-components";
import React from "react";
import {
  type SchemaTreeCheckboxNodeData,
  type SchemaTreeNodeData,
  type SchemaTreeSwitchNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface DefaultBooleanValueFieldProps {
  path: string[];
  node: Node<SchemaTreeCheckboxNodeData | SchemaTreeSwitchNodeData, SchemaTreeNodeData>;
}

export const DefaultBooleanValueField: React.FunctionComponent<DefaultBooleanValueFieldProps> =
  React.memo(({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { defaultValue } = data;

    const onChangeChecked = React.useCallback(
      (value: boolean) => {
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
        <label htmlFor="defaultValue">Is checked by default</label>
        <Checkbox name="defaultValue" checked={defaultValue} onChangeChecked={onChangeChecked} />
        <ValidationError />
      </Field>
    );
  });
