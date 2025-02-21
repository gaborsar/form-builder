import { Dropdown, Field, ValidationError } from "dfrm-components";
import React from "react";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeCheckboxGroupNodeData,
  type SchemaTreeRadioGroupNodeData,
  type SchemaTreeSwitchGroupNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

const options = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];

interface ColumnsFieldProps {
  path: string[];
  node: Node<
    SchemaTreeRadioGroupNodeData | SchemaTreeCheckboxGroupNodeData | SchemaTreeSwitchGroupNodeData,
    ComponentSchemaTreeNodeData
  >;
}

export const ColumnsField: React.FunctionComponent<ColumnsFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { columns } = data;

    const onChangeValue = React.useCallback(
      (value: string) => {
        dispatch({
          type: "component-schema-tree__replace",
          payload: {
            path,
            node: {
              ...node,
              data: { ...data, columns: Number.parseInt(value, 0) },
            },
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="columns">Columns</label>
        <Dropdown
          name="columns"
          canClear={false}
          value={`${columns}`}
          options={options}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
