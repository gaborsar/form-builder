import React from "react";
import { Dropdown, Field, ValidationError } from "../../../../dfrm-components";
import {
  type SchemaTreeColumnNodeData,
  type SchemaTreeNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

const options = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
];

interface WidthFieldProps {
  path: string[];
  node: Node<SchemaTreeColumnNodeData, SchemaTreeNodeData>;
}

export const WidthField: React.FunctionComponent<WidthFieldProps> = React.memo(({ path, node }) => {
  const dispatch = useDispatch();

  const { data } = node;
  const { width } = data;

  const onChangeValue = React.useCallback(
    (value: string) => {
      dispatch({
        type: "form-schema-tree__replace",
        payload: {
          path,
          node: {
            ...node,
            data: { ...data, width: Number.parseInt(value, 0) },
          },
        },
      });
    },
    [dispatch, path, node, data],
  );

  return (
    <Field>
      <label htmlFor="width">Width</label>
      <Dropdown
        name="width"
        canClear={false}
        value={`${width}`}
        options={options}
        onChangeValue={onChangeValue}
      />
      <ValidationError />
    </Field>
  );
});
