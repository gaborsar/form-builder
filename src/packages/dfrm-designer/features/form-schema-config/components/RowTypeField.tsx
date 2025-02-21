import { Dropdown, Field, ValidationError } from "dfrm-components";
import React from "react";
import { type SchemaTreeNodeData, useDispatch } from "../../../model";
import type { Node } from "../../../utils/tree";
import { replaceWithEmpty } from "../utils/replaceWithEmpty";
import { replaceWithRow } from "../utils/replaceWithRow";
import { wrapWithConditional } from "../utils/wrapWithConditional";

const rowTypeFieldOptions = [
  { value: "Row", label: "Row" },
  { value: "Conditional", label: "Conditional" },
];

interface RowTypeFieldProps {
  path: string[];
  node: Node<SchemaTreeNodeData, SchemaTreeNodeData>;
}

export const RowTypeField: React.FunctionComponent<RowTypeFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const onChangeValue = React.useCallback(
      (value: string) => {
        if (value === node.data.type) {
          return;
        }
        if (value === "Row") {
          return replaceWithRow(dispatch, path, node);
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
          options={rowTypeFieldOptions}
          value={node.data.type}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
