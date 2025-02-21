import { Field, Input, ValidationError } from "dfrm-components";
import React from "react";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeComputedNodeData,
  type SchemaTreeNumberNodeData,
  useDispatch,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface UnitFieldProps {
  path: string[];
  node: Node<SchemaTreeNumberNodeData | SchemaTreeComputedNodeData, ComponentSchemaTreeNodeData>;
}

export const UnitField: React.FunctionComponent<UnitFieldProps> = React.memo(({ path, node }) => {
  const { locale } = useIntlState();
  const dispatch = useDispatch();

  const { data } = node;
  const { unit } = data;

  const onChangeValue = React.useCallback(
    (value: string) => {
      dispatch({
        type: "component-schema-tree__replace",
        payload: {
          path,
          node: {
            ...node,
            data: {
              ...data,
              unit: { ...data.unit, [locale]: value },
            },
          },
        },
      });
    },
    [dispatch, path, node, data, locale],
  );

  return (
    <Field>
      <label htmlFor="unit">Unit</label>
      <Input
        type="text"
        name="unit"
        value={unit[locale] || ""}
        helper={locale}
        onChangeValue={onChangeValue}
      />
      <ValidationError />
    </Field>
  );
});
