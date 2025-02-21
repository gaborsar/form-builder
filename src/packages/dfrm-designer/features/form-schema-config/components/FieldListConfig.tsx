import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeFieldListNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { InputWrapperTypeField } from "./InputWrapperTypeField";
import { KeyField } from "./KeyField";
import { LabelField } from "./LabelField";
import { MaxLengthField } from "./MaxLengthField";
import { MinLengthField } from "./MinLengthField";
import { UniqueField } from "./UniqueField";

interface FieldListConfigProps {
  path: string[];
  node: Node<SchemaTreeFieldListNodeData, SchemaTreeNodeData>;
}

export const FieldListConfig: React.FunctionComponent<FieldListConfigProps> = React.memo(
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
      <Row>
        <Column width={6}>
          <UniqueField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
