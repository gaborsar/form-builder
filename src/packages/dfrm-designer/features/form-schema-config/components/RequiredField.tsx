import { Checkbox, Field, ValidationError } from "dfrm-components";
import React from "react";
import {
  type SchemaTreeButtonGroupNodeData,
  type SchemaTreeDateNodeData,
  type SchemaTreeDateTimeNodeData,
  type SchemaTreeDropdownNodeData,
  type SchemaTreeEmailNodeData,
  type SchemaTreeLongTextNodeData,
  type SchemaTreeNodeData,
  type SchemaTreeNumberNodeData,
  type SchemaTreePasswordNodeData,
  type SchemaTreePhoneNumberNodeData,
  type SchemaTreeRadioGroupNodeData,
  type SchemaTreeRemoteDropdownNodeData,
  type SchemaTreeShortTextNodeData,
  type SchemaTreeTimeNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface RequiredFieldProps {
  path: string[];
  node: Node<
    | SchemaTreeShortTextNodeData
    | SchemaTreeLongTextNodeData
    | SchemaTreeNumberNodeData
    | SchemaTreeDateNodeData
    | SchemaTreeTimeNodeData
    | SchemaTreeDateTimeNodeData
    | SchemaTreeEmailNodeData
    | SchemaTreePhoneNumberNodeData
    | SchemaTreePasswordNodeData
    | SchemaTreeRemoteDropdownNodeData
    | SchemaTreeDropdownNodeData
    | SchemaTreeButtonGroupNodeData
    | SchemaTreeRadioGroupNodeData,
    SchemaTreeNodeData
  >;
}

export const RequiredField: React.FunctionComponent<RequiredFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { required } = data;

    const onChangeChecked = React.useCallback(
      (value: boolean) => {
        dispatch({
          type: "form-schema-tree__replace",
          payload: {
            path,
            node: {
              ...node,
              data: { ...data, required: value },
            } as typeof node,
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="required">Required</label>
        <Checkbox name="required" checked={required} onChangeChecked={onChangeChecked} />
        <ValidationError />
      </Field>
    );
  },
);
