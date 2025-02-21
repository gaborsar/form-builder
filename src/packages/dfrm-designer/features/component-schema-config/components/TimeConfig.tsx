import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { ComponentSchemaTreeNodeData, SchemaTreeTimeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultTimeValueField } from "./DefaultTimeValueField";
import { InputTypeField } from "./InputTypeField";
import { RequiredField } from "./RequiredField";

interface TimeConfigProps {
  path: string[];
  node: Node<SchemaTreeTimeNodeData, ComponentSchemaTreeNodeData>;
}

export const TimeConfig: React.FunctionComponent<TimeConfigProps> = React.memo(({ path, node }) => (
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
        <DefaultTimeValueField path={path} node={node} />
      </Column>
    </Row>
  </Form>
));
