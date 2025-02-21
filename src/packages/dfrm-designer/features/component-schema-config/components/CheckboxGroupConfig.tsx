import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeCheckboxGroupNodeData, SchemaTreeOptionNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { ColumnsField } from "./ColumnsField";
import { DefaultMultiChoiceValueField } from "./DefaultMultiChoiceValueField";
import { DirectionField } from "./DirectionField";
import { InputTypeField } from "./InputTypeField";

interface ConfigProps {
  path: string[];
  node: Node<SchemaTreeCheckboxGroupNodeData, SchemaTreeOptionNodeData>;
}

export const CheckboxGroupConfig: React.FunctionComponent<ConfigProps> = React.memo(
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
