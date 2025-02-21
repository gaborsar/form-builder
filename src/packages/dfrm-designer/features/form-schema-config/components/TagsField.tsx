import { Dropdown, Field, ValidationError } from "dfrm-components";
import { append, remove, update } from "ramda";
import React from "react";
import { TagList, TagListItem } from "../../../components/TagList";
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

interface TagsFieldProps {
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

export const TagsField: React.FunctionComponent<TagsFieldProps> = React.memo(({ path, node }) => {
  const dispatch = useDispatch();

  const { data } = node;
  const { tags = [] } = data;

  const value = React.useMemo(() => {
    if (tags.length === 0) {
      return [""];
    }
    if (tags[tags.length - 1] !== "") {
      return tags.concat("");
    }
    return tags;
  }, [tags]);

  const onUpdate = React.useCallback(
    (index: number, value: string) => {
      let tags = data.tags || [];
      if (value === "") {
        tags = remove(index, 1, tags);
      } else {
        tags = index === tags.length ? append(value, tags) : update(index, value, tags);
      }
      dispatch({
        type: "form-schema-tree__replace",
        payload: {
          path,
          node: {
            ...node,
            data: { ...data, tags },
          } as typeof node,
        },
      });
    },
    [dispatch, path, node, data],
  );

  return (
    <Field>
      <label htmlFor="tag-1">Tags</label>
      <TagList>
        {value.map((item, index) => (
          <TagListItem key={index}>
            <TagsFieldItem index={index} value={item || ""} onUpdate={onUpdate} />
          </TagListItem>
        ))}
      </TagList>
      <ValidationError />
    </Field>
  );
});

interface TagsFieldItemProps {
  index: number;
  value: string;
  onUpdate(index: number, value: string): unknown;
}

const TagsFieldItem: React.FunctionComponent<TagsFieldItemProps> = React.memo(
  ({ index, value, onUpdate }) => {
    const createTag = useCreateTagForm();
    const options = useTagOptions();

    const onChangeValue = React.useCallback(
      (value: string) => {
        onUpdate(index, value);
      },
      [onUpdate, index],
    );

    const onOpen = useOpenTag();

    const onCreate = React.useCallback(
      async (value: string) => {
        onChangeValue(await createTag(value));
      },
      [createTag, onChangeValue],
    );

    return (
      <Dropdown
        name={`tag-${index + 1}`}
        canOpen={true}
        canCreate={true}
        options={options}
        value={value}
        onChangeValue={onChangeValue}
        onOpen={onOpen}
        onCreate={onCreate}
      />
    );
  },
);
