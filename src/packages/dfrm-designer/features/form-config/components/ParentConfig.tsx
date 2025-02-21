import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { FormTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { LabelField } from "./LabelField";
import { NameField } from "./NameField";

interface ParentConfigProps {
  path: string[];
  node: Node<FormTreeNodeData>;
}

export const ParentConfig: React.FunctionComponent<ParentConfigProps> = React.memo(
  ({ path, node }) => (
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
  ),
);
