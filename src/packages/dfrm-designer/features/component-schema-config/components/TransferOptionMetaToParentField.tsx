import React from "react";
import { Checkbox, Field, ValidationError } from "../../../../dfrm-components";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeButtonGroupNodeData,
  type SchemaTreeDropdownNodeData,
  type SchemaTreeRadioGroupNodeData,
  type SchemaTreeSliderNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface TransferOptionMetaToParentFieldProps {
  path: string[];
  node: Node<
    | SchemaTreeDropdownNodeData
    | SchemaTreeButtonGroupNodeData
    | SchemaTreeRadioGroupNodeData
    | SchemaTreeSliderNodeData,
    ComponentSchemaTreeNodeData
  >;
}

export const TransferOptionMetaToParentField: React.FunctionComponent<TransferOptionMetaToParentFieldProps> =
  React.memo(({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { transferOptionMetaToParent } = data;

    const onChangeChecked = React.useCallback(
      (value: boolean) => {
        dispatch({
          type: "component-schema-tree__replace",
          payload: {
            path,
            node: {
              ...node,
              data: {
                ...data,
                transferOptionMetaToParent: value,
              },
            } as typeof node,
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="transferOptionMetaToParent">
          Transfer option identifier and tags to parent
        </label>
        <Checkbox
          name="transferOptionMetaToParent"
          checked={transferOptionMetaToParent}
          onChangeChecked={onChangeChecked}
        />
        <ValidationError />
      </Field>
    );
  });
