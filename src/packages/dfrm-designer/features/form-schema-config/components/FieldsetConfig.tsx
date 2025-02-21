import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeFieldsetNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { FieldsetTypeField } from "./FieldsetTypeField";
import { LabelField } from "./LabelField";

interface FieldsetConfigProps {
  path: string[];
  node: Node<SchemaTreeFieldsetNodeData, SchemaTreeNodeData>;
}

export const FieldsetConfig: React.FunctionComponent<FieldsetConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <FieldsetTypeField path={path} node={node} />
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
