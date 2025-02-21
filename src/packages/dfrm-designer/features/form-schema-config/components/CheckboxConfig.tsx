import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeCheckboxNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultBooleanValueField } from "./DefaultBooleanValueField";
import { InputTypeField } from "./InputTypeField";

interface CheckboxConfigProps {
  path: string[];
  node: Node<SchemaTreeCheckboxNodeData, SchemaTreeNodeData>;
}

export const CheckboxConfig: React.FunctionComponent<CheckboxConfigProps> = React.memo(
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
