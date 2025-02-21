import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type {
  ComponentSchemaTreeNodeData,
  SchemaTreeButtonGroupNodeData,
  SchemaTreeCheckboxGroupNodeData,
  SchemaTreeCheckboxNodeData,
  SchemaTreeComputedNodeData,
  SchemaTreeDateNodeData,
  SchemaTreeDateTimeNodeData,
  SchemaTreeDropdownNodeData,
  SchemaTreeEmailNodeData,
  SchemaTreeLongTextNodeData,
  SchemaTreeMultiSelectNodeData,
  SchemaTreeNumberNodeData,
  SchemaTreeOptionNodeData,
  SchemaTreePasswordNodeData,
  SchemaTreePhoneNumberNodeData,
  SchemaTreeRadioGroupNodeData,
  SchemaTreeRemoteDropdownNodeData,
  SchemaTreeShortTextNodeData,
  SchemaTreeSliderNodeData,
  SchemaTreeSwitchGroupNodeData,
  SchemaTreeSwitchNodeData,
  SchemaTreeTimeNodeData,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { CreateTagFormProvider } from "../../create-tag-form";
import { IdField } from "./IdField";
import { TagsField } from "./TagsField";

interface IdAndTagsConfigProps {
  path: string[];
  node: Node<
    | SchemaTreeButtonGroupNodeData
    | SchemaTreeCheckboxGroupNodeData
    | SchemaTreeCheckboxNodeData
    | SchemaTreeComputedNodeData
    | SchemaTreeDateNodeData
    | SchemaTreeDateTimeNodeData
    | SchemaTreeRemoteDropdownNodeData
    | SchemaTreeDropdownNodeData
    | SchemaTreeEmailNodeData
    | SchemaTreeLongTextNodeData
    | SchemaTreeMultiSelectNodeData
    | SchemaTreeNumberNodeData
    | SchemaTreeOptionNodeData
    | SchemaTreePasswordNodeData
    | SchemaTreePhoneNumberNodeData
    | SchemaTreeRadioGroupNodeData
    | SchemaTreeShortTextNodeData
    | SchemaTreeSliderNodeData
    | SchemaTreeSwitchGroupNodeData
    | SchemaTreeSwitchNodeData
    | SchemaTreeTimeNodeData,
    ComponentSchemaTreeNodeData
  >;
}

export const IdAndTagsConfig: React.FunctionComponent<IdAndTagsConfigProps> = React.memo(
  ({ path, node }) => (
    <CreateTagFormProvider>
      <Form>
        <Row>
          <Column width={12}>
            <IdField path={path} node={node} />
          </Column>
        </Row>
        <Row>
          <Column width={12}>
            <TagsField path={path} node={node} />
          </Column>
        </Row>
      </Form>
    </CreateTagFormProvider>
  ),
);
