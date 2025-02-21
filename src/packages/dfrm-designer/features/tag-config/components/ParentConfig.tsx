import React from "react";
import { Column, Form, Row } from "../../../../dfrm-components";
import { Config, ConfigContext, ConfigTab, ConfigTabContent } from "../../../components/Config";
import {
  TagTreeLeafConfigTabId,
  type TagTreeNodeData,
  TagTreeParentConfigTabId,
  type TagTreeParentNodeData,
  useDispatch,
  useTagTreeParentConfigState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { LabelField } from "./LabelField";
import { NameField } from "./NameField";

interface ParentConfigProps {
  path: string[];
  node: Node<TagTreeParentNodeData, TagTreeNodeData>;
}

export const ParentConfig: React.FunctionComponent<ParentConfigProps> = React.memo(
  ({ path, node }) => {
    const { tab } = useTagTreeParentConfigState();
    const dispatch = useDispatch();

    const setTab = React.useCallback(
      (tab: TagTreeParentConfigTabId) => {
        dispatch({
          type: "tag-tree-parent-config__set-tab",
          payload: { tab },
        });
      },
      [dispatch],
    );

    return (
      <ConfigContext.Provider value={{ tab, setTab }}>
        <Config key={node.id} tabs={<Tabs />} content={<Content path={path} node={node} />} />
      </ConfigContext.Provider>
    );
  },
);

const Tabs: React.FunctionComponent = React.memo(() => (
  <ConfigTab value={TagTreeParentConfigTabId.Properties}>Properties</ConfigTab>
));

const Content: React.FunctionComponent<ParentConfigProps> = React.memo(({ path, node }) => (
  <ConfigTabContent value={TagTreeLeafConfigTabId.Properties}>
    <PropertiesTabContent path={path} node={node} />
  </ConfigTabContent>
));

const PropertiesTabContent: React.FunctionComponent<ParentConfigProps> = React.memo(
  ({ path, node }) => (
    <Form>
      <Row>
        <Column width={12}>
          <NameField path={path} node={node} />
        </Column>
      </Row>
      <Row>
        <Column width={12}>
          <LabelField path={path} node={node} />
        </Column>
      </Row>
    </Form>
  ),
);
