import { Column, Form, Row } from "dfrm-components";
import React from "react";
import type { ComponentSchemaTreeNodeData, SchemaTreeCheckboxNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultBooleanValueField } from "./DefaultBooleanValueField";
import { InputTypeField } from "./InputTypeField";

interface CheckboxConfigProps {
  path: string[];
  node: Node<SchemaTreeCheckboxNodeData, ComponentSchemaTreeNodeData>;
}

export const CheckboxConfig: React.FunctionComponent<CheckboxConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <InputTypeField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <DefaultBooleanValueField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
