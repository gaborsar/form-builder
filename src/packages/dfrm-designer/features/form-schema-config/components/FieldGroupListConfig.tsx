import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeFieldGroupListNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { InputWrapperTypeField } from "./InputWrapperTypeField";
import { KeyField } from "./KeyField";
import { LabelField } from "./LabelField";
import { MaxLengthField } from "./MaxLengthField";
import { MinLengthField } from "./MinLengthField";

interface FieldGroupListConfigProps {
  path: string[];
  node: Node<SchemaTreeFieldGroupListNodeData, SchemaTreeNodeData>;
}

export const FieldGroupListConfig: React.FunctionComponent<FieldGroupListConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <InputWrapperTypeField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <LabelField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <KeyField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={6}>
          <MinLengthField path={path} node={node} />
        </Column>
        <Column width={6}>
          <MaxLengthField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
