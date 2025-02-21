import React from "react";
import { Dropdown, Field, ValidationError } from "../../../../dfrm-components";
import {
  TagTreeLeafConfigTabId,
  type TagTreeRelation,
  useDispatch,
  useTagTreeState,
} from "../../../model";
import { findPath } from "../../../utils/tree";
import { useCreateTagForm } from "../../create-tag-form";
import { useTagOptions } from "../../tag-tree";

interface RelationIdFieldProps {
  index: number;
  relation: TagTreeRelation;
  onUpdate(index: number, relation: TagTreeRelation): unknown;
}

export const RelationIdField: React.FunctionComponent<RelationIdFieldProps> = React.memo(
  ({ index, relation, onUpdate }) => {
    const { root } = useTagTreeState();
    const dispatch = useDispatch();

    const createTag = useCreateTagForm();
    const tagOptions = useTagOptions();

    const { id: value } = relation;

    const onChangeValue = React.useCallback(
      (value: string) => {
        onUpdate(index, { ...relation, id: value });
      },
      [onUpdate, index, relation],
    );

    const onOpen = React.useCallback(
      (value: string) => {
        dispatch({
          type: "tag-tree__select",
          payload: { path: findPath(root, value) },
        });
        dispatch({
          type: "tag-tree-leaf-config__set-tab",
          payload: { tab: TagTreeLeafConfigTabId.Properties },
        });
      },
      [root, dispatch],
    );

    const onCreate = React.useCallback(
      async (value: string) => {
        const id = await createTag(value);
        onChangeValue(id);
      },
      [createTag, onChangeValue],
    );

    return (
      <Field>
        <label htmlFor="id">Tag</label>
        <Dropdown
          name="id"
          canOpen={true}
          canCreate={true}
          options={tagOptions}
          value={value}
          onChangeValue={onChangeValue}
          onOpen={onOpen}
          onCreate={onCreate}
        />
        <ValidationError />
      </Field>
    );
  },
);
