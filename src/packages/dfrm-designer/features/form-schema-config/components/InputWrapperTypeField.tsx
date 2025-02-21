import { Dropdown, Field, ValidationError } from "dfrm-components";
import React from "react";
import { type SchemaTreeNodeData, useDispatch } from "../../../model";
import type { Node } from "../../../utils/tree";
import { replaceWithEmpty } from "../utils/replaceWithEmpty";
import { replaceWithField } from "../utils/replaceWithField";
import { replaceWithFieldGroupList } from "../utils/replaceWithFieldGroupList";
import { replaceWithFieldList } from "../utils/replaceWithFieldList";
import { replaceWithObject } from "../utils/replaceWithObject";
import { wrapWithConditional } from "../utils/wrapWithConditional";

const inputWrapperTypeFieldOptions = [
  { value: "Object", label: "Object" },
  { value: "FieldGroupList", label: "Field group list" },
  { value: "FieldList", label: "Field list" },
  { value: "Field", label: "Field" },
  { value: "Conditional", label: "Conditional" },
];

interface InputWrapperTypeFieldProps {
  path: string[];
  node: Node<SchemaTreeNodeData>;
}

export const InputWrapperTypeField: React.FunctionComponent<InputWrapperTypeFieldProps> =
  React.memo(({ path, node }) => {
    const dispatch = useDispatch();

    const onChangeValue = React.useCallback(
      (value: string) => {
        if (value === node.data.type) {
          return;
        }
        if (value === "Object") {
          return replaceWithObject(dispatch, path, node);
        }
        if (value === "FieldGroupList") {
          return replaceWithFieldGroupList(dispatch, path, node);
        }
        if (value === "FieldList") {
          return replaceWithFieldList(dispatch, path, node);
        }
        if (value === "Field") {
          return replaceWithField(dispatch, path, node);
        }
        if (value === "Conditional") {
          return wrapWithConditional(dispatch, path, node);
        }
        if (value === "") {
          return replaceWithEmpty(dispatch, path, node);
        }
      },
      [dispatch, path, node],
    );

    return (
      <Field>
        <label htmlFor="type">Type</label>
        <Dropdown
          name="type"
          options={inputWrapperTypeFieldOptions}
          value={node.data.type}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  });
