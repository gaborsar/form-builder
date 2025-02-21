import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeNodeData, SchemaTreeObjectNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { InputWrapperTypeField } from "./InputWrapperTypeField";
import { KeyField } from "./KeyField";

interface ObjectConfigProps {
  path: string[];
  node: Node<SchemaTreeObjectNodeData, SchemaTreeNodeData>;
}

export const ObjectConfig: React.FunctionComponent<ObjectConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <InputWrapperTypeField path={path} node={node} />
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
