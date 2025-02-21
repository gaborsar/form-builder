import { Column, Form, Row } from "dfrm-components";
import React from "react";
import type { SchemaTreeDropdownNodeData, SchemaTreeOptionNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultSingleChoiceValueField } from "./DefaultSingleChoiceValueField";
import { InputTypeField } from "./InputTypeField";
import { RequiredField } from "./RequiredField";
import { TransferOptionMetaToParentField } from "./TransferOptionMetaToParentField";

interface DropdownConfigProps {
  path: string[];
  node: Node<SchemaTreeDropdownNodeData, SchemaTreeOptionNodeData>;
}

export const DropdownConfig: React.FunctionComponent<DropdownConfigProps> = React.memo(
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
