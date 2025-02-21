import { Column, Form, Row } from "dfrm-components";
import React from "react";
import type { SchemaTreeNodeData, SchemaTreeSwitchNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultBooleanValueField } from "./DefaultBooleanValueField";
import { InputTypeField } from "./InputTypeField";

interface SwitchConfigProps {
  path: string[];
  node: Node<SchemaTreeSwitchNodeData, SchemaTreeNodeData>;
}

export const SwitchConfig: React.FunctionComponent<SwitchConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <InputTypeField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <DefaultBooleanValueField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
