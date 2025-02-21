import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeComputedNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { InputTypeField } from "./InputTypeField";
import { TemplateField } from "./TemplateField";
import { UnitField } from "./UnitField";

interface ComputedConfigProps {
  path: string[];
  node: Node<SchemaTreeComputedNodeData, SchemaTreeNodeData>;
}

export const ComputedConfig: React.FunctionComponent<ComputedConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <InputTypeField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <TemplateField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <UnitField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
