import { Field, Input, ValidationError } from "dfrm-components";
import React from "react";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeRemoteDropdownNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface PathFieldProps {
  path: string[];
  node: Node<SchemaTreeRemoteDropdownNodeData, ComponentSchemaTreeNodeData>;
}

export const PathField: React.FunctionComponent<PathFieldProps> = React.memo(({ path, node }) => {
  const dispatch = useDispatch();

  const { data } = node;
  const { path: value } = data;

  const onChangeValue = React.useCallback(
    (value: string) => {
      dispatch({
        type: "component-schema-tree__replace",
        payload: {
          path,
          node: { ...node, data: { ...data, path: value } },
        },
      });
    },
    [dispatch, path, node, data],
  );

  return (
    <Field>
      <label htmlFor="path">Path</label>
      <Input type="text" name="path" value={value} onChangeValue={onChangeValue} />
      <ValidationError />
    </Field>
  );
});
