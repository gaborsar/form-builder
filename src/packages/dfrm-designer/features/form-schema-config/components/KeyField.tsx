import { Field, Input, ValidationError } from "dfrm-components";
import React from "react";
import {
  type SchemaTreeFieldGroupListNodeData,
  type SchemaTreeFieldListNodeData,
  type SchemaTreeFieldNodeData,
  type SchemaTreeNodeData,
  type SchemaTreeObjectNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface KeyFieldProps {
  path: string[];
  node: Node<
    | SchemaTreeObjectNodeData
    | SchemaTreeFieldGroupListNodeData
    | SchemaTreeFieldListNodeData
    | SchemaTreeFieldNodeData,
    SchemaTreeNodeData
  >;
}

export const KeyField: React.FunctionComponent<KeyFieldProps> = React.memo(({ path, node }) => {
  const dispatch = useDispatch();

  const { data } = node;
  const { key } = data;

  const onChangeValue = React.useCallback(
    (value: string) => {
      dispatch({
        type: "form-schema-tree__replace",
        payload: {
          path,
          node: { ...node, data: { ...data, key: value } },
        },
      });
    },
    [dispatch, path, node, data],
  );

  return (
    <Field>
      <label htmlFor="key">Data key</label>
      <Input type="text" name="key" value={key} onChangeValue={onChangeValue} />
      <ValidationError />
    </Field>
  );
});
