import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeLongTextNodeData, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultStringValueField } from "./DefaultStringValueField";
import { InputTypeField } from "./InputTypeField";
import { MaxLengthField } from "./MaxLengthField";
import { MinLengthField } from "./MinLengthField";
import { PatternField } from "./PatternField";
import { RequiredField } from "./RequiredField";

interface LongTextConfigProps {
  path: string[];
  node: Node<SchemaTreeLongTextNodeData, SchemaTreeNodeData>;
}

export const LongTextConfig: React.FunctionComponent<LongTextConfigProps> = React.memo(
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
          <DefaultStringValueField path={path} node={node} />
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
        <Column width={12}>
          <PatternField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
