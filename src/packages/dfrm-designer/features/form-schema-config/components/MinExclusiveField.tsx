import React from "react";
import { Field, NumberInput, ValidationError } from "../../../../dfrm-components";
import {
  type SchemaTreeNodeData,
  type SchemaTreeNumberNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface MinExclusiveFieldProps {
  path: string[];
  node: Node<SchemaTreeNumberNodeData, SchemaTreeNodeData>;
}

export const MinExclusiveField: React.FunctionComponent<MinExclusiveFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { minExclusive } = data;

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
                minExclusive: value === "" ? null : Number.parseInt(value, 0),
              },
            },
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="minExclusive">Min exclusive</label>
        <NumberInput
          name="minExclusive"
          value={minExclusive === null ? "" : `${minExclusive}`}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
