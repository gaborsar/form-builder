import React from "react";
import { Field, Input, ValidationError } from "../../../../dfrm-components";
import { type FormTreeNodeData, useDispatch } from "../../../model";
import type { Node } from "../../../utils/tree";

interface NameFieldProps {
  path: string[];
  node: Node<FormTreeNodeData>;
}

export const NameField: React.FunctionComponent<NameFieldProps> = React.memo(({ path, node }) => {
  const dispatch = useDispatch();

  const {
    data: { name: value },
  } = node;

  const onChangeValue = React.useCallback(
    (value: string) => {
      const { data } = node;
      dispatch({
        type: "form-tree__replace",
        payload: {
          path,
          node: { ...node, data: { ...data, name: value } },
        },
      });
    },
    [dispatch, path, node],
  );

  return (
    <Field>
      <label htmlFor="name">Name</label>
      <Input type="text" name="name" value={value} onChangeValue={onChangeValue} />
      <ValidationError />
    </Field>
  );
});
