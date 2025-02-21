import { Column, Form, Row } from "dfrm-components";
import React from "react";
import {
  type SchemaTreeConditionalNodeData,
  type SchemaTreeNodeData,
  useFormSchemaTreeState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { findFirstNoneConditionalParent } from "../../schema-tree";
import { ColumnTypeField } from "./ColumnTypeField";
import { FieldsetTypeField } from "./FieldsetTypeField";
import { InputTypeField } from "./InputTypeField";
import { InputWrapperTypeField } from "./InputWrapperTypeField";
import { RowTypeField } from "./RowTypeField";
import { TemplateField } from "./TemplateField";

export interface ConditionalConfigProps {
  path: string[];
  node: Node<SchemaTreeConditionalNodeData, SchemaTreeNodeData>;
}

export const ConditionalConfig: React.FunctionComponent<ConditionalConfigProps> = React.memo(
  ({ path, node }) => {
    const { root } = useFormSchemaTreeState();

    const parentNode = React.useMemo(
      () => findFirstNoneConditionalParent(root, path),
      [root, path],
    );

    let typeField: React.ReactNode | null = null;
    switch (parentNode.data.type) {
      case "Form":
        typeField = <FieldsetTypeField path={path} node={node} />;
        break;
      case "Fieldset":
        typeField = <RowTypeField path={path} node={node} />;
        break;
      case "Row":
        typeField = <ColumnTypeField path={path} node={node} />;
        break;
      case "Column":
        typeField = <InputWrapperTypeField path={path} node={node} />;
        break;
      case "Field":
      case "FieldList":
        typeField = <InputTypeField path={path} node={node} />;
        break;
    }

    return (
      <Form>
        <Row>
          <Column width={12}>{typeField}</Column>
        </Row>
        <Row>
          <Column width={12}>
            <TemplateField path={path} node={node} />
          </Column>
        </Row>
      </Form>
    );
  },
);
