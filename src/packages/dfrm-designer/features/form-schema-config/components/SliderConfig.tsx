import { Column, Form, Row } from "dfrm-components";
import React from "react";
import type { SchemaTreeOptionNodeData, SchemaTreeSliderNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { DefaultSingleChoiceValueField } from "./DefaultSingleChoiceValueField";
import { InputTypeField } from "./InputTypeField";
import { TransferOptionMetaToParentField } from "./TransferOptionMetaToParentField";

interface SliderConfigProps {
  path: string[];
  node: Node<SchemaTreeSliderNodeData, SchemaTreeOptionNodeData>;
}

export const SliderConfig: React.FunctionComponent<SliderConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <InputTypeField path={path} node={node} />
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
