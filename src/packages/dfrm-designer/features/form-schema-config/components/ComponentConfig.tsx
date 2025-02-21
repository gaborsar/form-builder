import { Column, Form, Row } from "dfrm-components";
import React from "react";
import type { SchemaTreeComponentNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { InputTypeField } from "./InputTypeField";

interface ComponentConfigProps {
  path: string[];
  node: Node<SchemaTreeComponentNodeData, SchemaTreeNodeData>;
}

export const ComponentConfig: React.FunctionComponent<ComponentConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <InputTypeField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
