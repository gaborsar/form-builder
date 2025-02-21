import { Column, Form, Row } from "dfrm-components";
import React from "react";
import type { SchemaTreeButtonGroupNodeData, SchemaTreeOptionNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultSingleChoiceValueField } from "./DefaultSingleChoiceValueField";
import { InputTypeField } from "./InputTypeField";
import { RequiredField } from "./RequiredField";
import { TransferOptionMetaToParentField } from "./TransferOptionMetaToParentField";

interface ButtonGroupConfigProps {
  path: string[];
  node: Node<SchemaTreeButtonGroupNodeData, SchemaTreeOptionNodeData>;
}

export const ButtonGroupConfig: React.FunctionComponent<ButtonGroupConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <InputTypeField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <RequiredField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <DefaultSingleChoiceValueField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <TransferOptionMetaToParentField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
