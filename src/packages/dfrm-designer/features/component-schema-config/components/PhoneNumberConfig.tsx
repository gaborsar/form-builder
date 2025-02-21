import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { ComponentSchemaTreeNodeData, SchemaTreePhoneNumberNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultPhoneNumberValueField } from "./DefaultPhoneNumberValueField";
import { InputTypeField } from "./InputTypeField";
import { RequiredField } from "./RequiredField";

interface PhoneNumberConfigProps {
  path: string[];
  node: Node<SchemaTreePhoneNumberNodeData, ComponentSchemaTreeNodeData>;
}

export const PhoneNumberConfig: React.FunctionComponent<PhoneNumberConfigProps> = React.memo(
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
          <DefaultPhoneNumberValueField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
