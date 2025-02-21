import { Column, Form, Row } from "dfrm-components";
import React from "react";
import type { ComponentSchemaTreeNodeData, SchemaTreeEmailNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultStringValueField } from "./DefaultStringValueField";
import { InputTypeField } from "./InputTypeField";
import { RequiredField } from "./RequiredField";

interface EmailConfigProps {
  path: string[];
  node: Node<SchemaTreeEmailNodeData, ComponentSchemaTreeNodeData>;
}

export const EmailConfig: React.FunctionComponent<EmailConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <InputTypeField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <RequiredField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <DefaultStringValueField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
