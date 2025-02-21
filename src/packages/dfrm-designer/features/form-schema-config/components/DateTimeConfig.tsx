import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeDateTimeNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultDateTimeValueField } from "./DefaultDateTimeValueField";
import { InputTypeField } from "./InputTypeField";
import { RequiredField } from "./RequiredField";

interface DateTimeConfigProps {
  path: string[];
  node: Node<SchemaTreeDateTimeNodeData, SchemaTreeNodeData>;
}

export const DateTimeConfig: React.FunctionComponent<DateTimeConfigProps> = React.memo(
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
          <DefaultDateTimeValueField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
