import { Field, ValidationError } from "dfrm-components";
import React from "react";
import { TemplateInput } from "../../../components/TemplateInput";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeComputedNodeData,
  type SchemaTreeConditionalNodeData,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface TemplateFieldProps {
  path: string[];
  node: Node<
    SchemaTreeConditionalNodeData | SchemaTreeComputedNodeData,
    ComponentSchemaTreeNodeData
  >;
}

export const TemplateField: React.FunctionComponent<TemplateFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const { data } = node;
    const { template } = data;

    const onChangeValue = React.useCallback(
      (value: string) => {
        dispatch({
          type: "component-schema-tree__replace",
          payload: {
            path,
            node: {
              ...node,
              data: { ...data, template: value },
            } as typeof node,
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="template">Template</label>
        <TemplateInput name="template" value={template} onChangeValue={onChangeValue} />
        <ValidationError />
      </Field>
    );
  },
);
