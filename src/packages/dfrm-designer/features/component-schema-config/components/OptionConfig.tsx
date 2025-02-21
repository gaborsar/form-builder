import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreeOptionNodeData,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { useTag } from "../../tag-tree";
import { LabelField } from "./LabelField";
import { ValueField } from "./ValueField";

interface OptionConfigProps {
  path: string[];
  node: Node<SchemaTreeOptionNodeData, ComponentSchemaTreeNodeData>;
}

export const OptionConfig: React.FunctionComponent<OptionConfigProps> = React.memo(
  ({ path, node }) => {
    const { locale } = useIntlState();

    const tag = useTag(node.data.id || "");

    const defaultLabel = React.useMemo(() => {
      if (tag === null) {
        return "";
      }
      return tag.data.label[locale] || "";
    }, [tag, locale]);

    const defaultValue = React.useMemo(() => {
      if (tag === null) {
        return "";
      }
      return tag.data.name;
    }, [tag]);

    return (
      <Form>
        <Row>
          <Column width={12}>
            <LabelField path={path} node={node} placeholder={defaultLabel} />
          </Column>
        </Row>
        <Row>
          <Column width={12}>
            <ValueField path={path} node={node} placeholder={defaultValue} />
          </Column>
        </Row>
      </Form>
    );
  },
);
