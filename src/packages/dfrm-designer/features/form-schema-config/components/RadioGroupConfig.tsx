import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeOptionNodeData, SchemaTreeRadioGroupNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { ColumnsField } from "./ColumnsField";
import { DefaultSingleChoiceValueField } from "./DefaultSingleChoiceValueField";
import { DirectionField } from "./DirectionField";
import { InputTypeField } from "./InputTypeField";
import { RequiredField } from "./RequiredField";
import { TransferOptionMetaToParentField } from "./TransferOptionMetaToParentField";

interface RadioGroupConfigProps {
  path: string[];
  node: Node<SchemaTreeRadioGroupNodeData, SchemaTreeOptionNodeData>;
}

export const RadioGroupConfig: React.FunctionComponent<RadioGroupConfigProps> = React.memo(
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
      <Row>
        <Column width={12}>
          <DirectionField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <ColumnsField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
