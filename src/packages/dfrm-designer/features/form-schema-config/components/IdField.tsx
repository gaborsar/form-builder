import React from "react";
import { Dropdown, Field, ValidationError } from "../../../../dfrm-components";
import {
  type SchemaTreeButtonGroupNodeData,
  type SchemaTreeCheckboxGroupNodeData,
  type SchemaTreeCheckboxNodeData,
  type SchemaTreeComponentNodeData,
  type SchemaTreeComputedNodeData,
  type SchemaTreeDateNodeData,
  type SchemaTreeDateTimeNodeData,
  type SchemaTreeDropdownNodeData,
  type SchemaTreeEmailNodeData,
  type SchemaTreeFieldGroupListNodeData,
  type SchemaTreeFieldListNodeData,
  type SchemaTreeFieldNodeData,
  type SchemaTreeFormNodeData,
  type SchemaTreeLongTextNodeData,
  type SchemaTreeMultiSelectNodeData,
  type SchemaTreeNodeData,
  type SchemaTreeNumberNodeData,
  type SchemaTreeObjectNodeData,
  type SchemaTreeOptionNodeData,
  type SchemaTreePasswordNodeData,
  type SchemaTreePhoneNumberNodeData,
  type SchemaTreeRadioGroupNodeData,
  type SchemaTreeRemoteDropdownNodeData,
  type SchemaTreeShortTextNodeData,
  type SchemaTreeSliderNodeData,
  type SchemaTreeSwitchGroupNodeData,
  type SchemaTreeSwitchNodeData,
  type SchemaTreeTimeNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { useCreateTagForm } from "../../create-tag-form";
import { useTagOptions } from "../../tag-tree";
import { useOpenTag } from "../hooks/useOpenTag";

interface IdFieldProps {
  path: string[];
  node: Node<
    | SchemaTreeButtonGroupNodeData
    | SchemaTreeCheckboxGroupNodeData
    | SchemaTreeCheckboxNodeData
    | SchemaTreeComponentNodeData
    | SchemaTreeComputedNodeData
    | SchemaTreeDateNodeData
    | SchemaTreeDateTimeNodeData
    | SchemaTreeRemoteDropdownNodeData
    | SchemaTreeDropdownNodeData
    | SchemaTreeEmailNodeData
    | SchemaTreeFieldGroupListNodeData
    | SchemaTreeFieldListNodeData
    | SchemaTreeFieldNodeData
    | SchemaTreeFormNodeData
    | SchemaTreeLongTextNodeData
    | SchemaTreeMultiSelectNodeData
    | SchemaTreeNumberNodeData
    | SchemaTreeObjectNodeData
    | SchemaTreeOptionNodeData
    | SchemaTreePasswordNodeData
    | SchemaTreePhoneNumberNodeData
    | SchemaTreeRadioGroupNodeData
    | SchemaTreeShortTextNodeData
    | SchemaTreeSliderNodeData
    | SchemaTreeSwitchGroupNodeData
    | SchemaTreeSwitchNodeData
    | SchemaTreeTimeNodeData,
    SchemaTreeNodeData
  >;
}

export const IdField: React.FunctionComponent<IdFieldProps> = React.memo(({ path, node }) => {
  const dispatch = useDispatch();

  const createTag = useCreateTagForm();
  const options = useTagOptions();

  const { data } = node;
  const { id } = data;

  const onChangeValue = React.useCallback(
    (value: string) => {
      dispatch({
        type: "form-schema-tree__replace",
        payload: {
          path,
          node: {
            ...node,
            data: { ...data, id: value },
          } as typeof node,
        },
      });
    },
    [dispatch, path, node, data],
  );

  const onOpen = useOpenTag();

  const onCreate = React.useCallback(
    async (value: string) => {
      onChangeValue(await createTag(value));
    },
    [createTag, onChangeValue],
  );

  return (
    <Field>
      <label htmlFor="id">Identifier</label>
      <Dropdown
        name="id"
        canOpen={true}
        canCreate={true}
        options={options}
        value={id || ""}
        onChangeValue={onChangeValue}
        onOpen={onOpen}
        onCreate={onCreate}
      />
      <ValidationError />
    </Field>
  );
});
