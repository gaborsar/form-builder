import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeFieldNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { InputWrapperTypeField } from "./InputWrapperTypeField";
import { KeyField } from "./KeyField";
import { LabelField } from "./LabelField";

interface FieldConfigProps {
  path: string[];
  node: Node<SchemaTreeFieldNodeData, SchemaTreeNodeData>;
}

export const FieldConfig: React.FunctionComponent<FieldConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <InputWrapperTypeField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <LabelField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <KeyField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
