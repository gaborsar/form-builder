import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeMultiSelectNodeData, SchemaTreeOptionNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultMultiChoiceValueField } from "./DefaultMultiChoiceValueField";
import { InputTypeField } from "./InputTypeField";

interface MultiSelectConfigProps {
  path: string[];
  node: Node<SchemaTreeMultiSelectNodeData, SchemaTreeOptionNodeData>;
}

export const MultiSelectConfig: React.FunctionComponent<MultiSelectConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <InputTypeField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <DefaultMultiChoiceValueField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
