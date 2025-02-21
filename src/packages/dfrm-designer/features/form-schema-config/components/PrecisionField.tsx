import { Field, NumberInput, ValidationError } from "dfrm-components";
import React from "react";
import {
  type SchemaTreeNodeData,
  type SchemaTreeNumberNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface PrecisionFieldProps {
  path: string[];
  node: Node<SchemaTreeNumberNodeData, SchemaTreeNodeData>;
}

export const PrecisionField: React.FunctionComponent<PrecisionFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { precision } = data;

    const onChangeValue = React.useCallback(
      (value: string) => {
        dispatch({
          type: "form-schema-tree__replace",
          payload: {
            path,
            node: {
              ...node,
              data: {
                ...data,
                precision: value === "" ? null : Number.parseInt(value, 0),
              },
            },
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="precision">Precision</label>
        <NumberInput
          name="precision"
          value={precision === null ? "" : `${precision}`}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
