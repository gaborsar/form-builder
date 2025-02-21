import { Column, Form, Row } from "dfrm-components";
import React from "react";
import type { ComponentSchemaTreeNodeData, SchemaTreeNumberNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultNumberValueField } from "./DeafultNumberValueField";
import { InputTypeField } from "./InputTypeField";
import { MaxExclusiveField } from "./MaxExclusiveField";
import { MaxField } from "./MaxField";
import { MinExclusiveField } from "./MinExclusiveField";
import { MinField } from "./MinField";
import { MultipleOfField } from "./MultipleOfField";
import { PrecisionField } from "./PrecisionField";
import { RequiredField } from "./RequiredField";
import { UnitField } from "./UnitField";

interface NumberConfigProps {
  path: string[];
  node: Node<SchemaTreeNumberNodeData, ComponentSchemaTreeNodeData>;
}

export const NumberConfig: React.FunctionComponent<NumberConfigProps> = React.memo(
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
          <DefaultNumberValueField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={6}>
          <PrecisionField path={path} node={node} />
        </Column>
        <Column width={6}>
          <MultipleOfField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={6}>
          <MinField path={path} node={node} />
        </Column>
        <Column width={6}>
          <MaxField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={6}>
          <MinExclusiveField path={path} node={node} />
        </Column>
        <Column width={6}>
          <MaxExclusiveField path={path} node={node} />
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
