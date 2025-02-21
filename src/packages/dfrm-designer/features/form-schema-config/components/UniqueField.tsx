import React from "react";
import { Checkbox, Field, ValidationError } from "../../../../dfrm-components";
import {
  type SchemaTreeFieldListNodeData,
  type SchemaTreeNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface UniqueFieldProps {
  path: string[];
  node: Node<SchemaTreeFieldListNodeData, SchemaTreeNodeData>;
}

export const UniqueField: React.FunctionComponent<UniqueFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { unique } = data;

    const onChangeChecked = React.useCallback(
      (value: boolean) => {
        dispatch({
          type: "form-schema-tree__replace",
          payload: {
            path,
            node: { ...node, data: { ...data, unique: value } },
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="unique">Unique</label>
        <Checkbox name="unique" checked={unique} onChangeChecked={onChangeChecked} />
        <ValidationError />
      </Field>
    );
  },
);
