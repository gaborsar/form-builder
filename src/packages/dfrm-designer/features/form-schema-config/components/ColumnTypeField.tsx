import React from "react";
import { Dropdown, Field, ValidationError } from "../../../../dfrm-components";
import { type SchemaTreeNodeData, useDispatch } from "../../../model";
import type { Node } from "../../../utils/tree";
import { replaceWithColumn } from "../utils/replaceWithColumn";
import { replaceWithEmpty } from "../utils/replaceWithEmpty";
import { wrapWithConditional } from "../utils/wrapWithConditional";

const columnTypeFieldOptions = [
  { value: "Column", label: "Column" },
  { value: "Conditional", label: "Conditional" },
];

interface ColumnTypeFieldProps {
  path: string[];
  node: Node<SchemaTreeNodeData>;
}

export const ColumnTypeField: React.FunctionComponent<ColumnTypeFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const onChangeValue = React.useCallback(
      (value: string) => {
        if (value === node.data.type) {
          return;
        }
        if (value === "Column") {
          return replaceWithColumn(dispatch, path, node);
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
          options={columnTypeFieldOptions}
          value={node.data.type}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
