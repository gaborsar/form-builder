import { Column, Form, Row } from "dfrm-components";
import React from "react";
import type { SchemaTreeDateNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultDateValueField } from "./DefaultDateValueField";
import { InputTypeField } from "./InputTypeField";
import { RequiredField } from "./RequiredField";

interface DateConfigProps {
  path: string[];
  node: Node<SchemaTreeDateNodeData, SchemaTreeNodeData>;
}

export const DateConfig: React.FunctionComponent<DateConfigProps> = React.memo(({ path, node }) => (
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
        <DefaultDateValueField path={path} node={node} />
      </Column>
    </Row>
  </Form>
));
