import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import type { SchemaTreeNodeData, SchemaTreeRemoteDropdownNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import { InputTypeField } from "./InputTypeField";
import { PathField } from "./PathField";
import { RequiredField } from "./RequiredField";

interface RemoteDropdownConfigProps {
  path: string[];
  node: Node<SchemaTreeRemoteDropdownNodeData, SchemaTreeNodeData>;
}

export const RemoteDropdownConfig: React.FunctionComponent<RemoteDropdownConfigProps> = React.memo(
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
          <PathField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
