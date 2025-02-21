import { Dropdown, Field, ValidationError } from "dfrm-components";
import React from "react";
import { type SchemaTreeNodeData, useDispatch } from "../../../model";
import type { Node } from "../../../utils/tree";
import { replaceWithEmpty } from "../utils/replaceWithEmpty";
import { replaceWithFieldset } from "../utils/replaceWithFieldset";
import { wrapWithConditional } from "../utils/wrapWithConditional";

const fieldsetTypeFieldOptions = [
  { value: "Fieldset", label: "Fieldset" },
  { value: "Conditional", label: "Conditional" },
];

interface FieldsetTypeFieldProps {
  path: string[];
  node: Node<SchemaTreeNodeData>;
}

export const FieldsetTypeField: React.FunctionComponent<FieldsetTypeFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const onChangeValue = React.useCallback(
      (value: string) => {
        if (value === node.data.type) {
          return;
        }
        if (value === "Fieldset") {
          return replaceWithFieldset(dispatch, path, node);
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
          options={fieldsetTypeFieldOptions}
          value={node.data.type}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
