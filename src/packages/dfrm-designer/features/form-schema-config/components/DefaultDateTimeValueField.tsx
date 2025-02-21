import { DateTime, Field, ValidationError } from "dfrm-components";
import React from "react";
import {
  type SchemaTreeDateTimeNodeData,
  type SchemaTreeNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface DefaultDateTimeValueFieldProps {
  path: string[];
  node: Node<SchemaTreeDateTimeNodeData, SchemaTreeNodeData>;
}

export const DefaultDateTimeValueField: React.FunctionComponent<DefaultDateTimeValueFieldProps> =
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
        <DateTime name="defaultValue" value={defaultValue} onChangeValue={onChangeValue} />
        <ValidationError />
      </Field>
    );
  });
