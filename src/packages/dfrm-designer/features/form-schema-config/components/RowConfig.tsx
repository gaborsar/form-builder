import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeNodeData, SchemaTreeRowNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { RowTypeField } from "./RowTypeField";

interface RowConfigProps {
  path: string[];
  node: Node<SchemaTreeRowNodeData, SchemaTreeNodeData>;
}

export const RowConfig: React.FunctionComponent<RowConfigProps> = React.memo(({ path, node }) => (
  <Form>
    <Row>
      <Column width={12}>
        <RowTypeField path={path} node={node} />
      </Column>
    </Row>
  </Form>
));
