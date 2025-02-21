import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeColumnNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { ColumnTypeField } from "./ColumnTypeField";
import { GrowField } from "./GrowField";
import { WidthField } from "./WidthField";

interface ColumnConfigProps {
  path: string[];
  node: Node<SchemaTreeColumnNodeData, SchemaTreeNodeData>;
}

export const ColumnConfig: React.FunctionComponent<ColumnConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <ColumnTypeField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <WidthField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <GrowField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
