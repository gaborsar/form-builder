import React from "react";
import { Dropdown, Field, ValidationError } from "../../../../dfrm-components";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeCheckboxGroupNodeData,
  type SchemaTreeRadioGroupNodeData,
  type SchemaTreeSwitchGroupNodeData,
  useDispatch,
} from "../../../model";
import type { SchemaTreeMultiElementSelectableDirection } from "../../../model";
import type { Node } from "../../../utils/tree";

const options = [
  { label: "Vertical", value: "vertical" },
  { label: "Horizontal", value: "horizontal" },
];

interface DirectionFieldProps {
  path: string[];
  node: Node<
    SchemaTreeRadioGroupNodeData | SchemaTreeCheckboxGroupNodeData | SchemaTreeSwitchGroupNodeData,
    ComponentSchemaTreeNodeData
  >;
}

export const DirectionField: React.FunctionComponent<DirectionFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { direction } = data;

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
                direction: value as SchemaTreeMultiElementSelectableDirection,
              },
            },
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="direction">Direction</label>
        <Dropdown
          name="direction"
          canClear={false}
          value={`${direction}`}
          options={options}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
