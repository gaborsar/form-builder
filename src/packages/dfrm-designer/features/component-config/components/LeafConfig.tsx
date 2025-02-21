import { Column, Form, Row } from "dfrm-components";
import React from "react";
import type { ComponentTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { LabelField } from "./LabelField";
import { NameField } from "./NameField";

interface LeafConfigProps {
  path: string[];
  node: Node<ComponentTreeNodeData>;
}

export const LeafConfig: React.FunctionComponent<LeafConfigProps> = React.memo(({ path, node }) => (
  <Form>
    <Row>
      <Column width={12}>
        <NameField path={path} node={node} />
      </Column>
    </Row>
    <Row>
      <Column width={12}>
        <LabelField path={path} node={node} />
      </Column>
    </Row>
  </Form>
));
