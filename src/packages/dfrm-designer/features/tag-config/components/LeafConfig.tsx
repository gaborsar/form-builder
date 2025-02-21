import { Column, Form, Row } from "dfrm-components";
import React from "react";
import { Config, ConfigContext, ConfigTab, ConfigTabContent } from "../../../components/Config";
import {
  TagTreeLeafConfigTabId,
  type TagTreeLeafNodeData,
  type TagTreeNodeData,
  useDispatch,
  useTagTreeLeafConfigState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { CreateTagFormProvider } from "../../create-tag-form";
import { LabelField } from "./LabelField";
import { NameField } from "./NameField";
import { RelationsField } from "./RelationsField";

interface LeafConfigProps {
  path: string[];
  node: Node<TagTreeLeafNodeData, TagTreeNodeData>;
}

export const LeafConfig: React.FunctionComponent<LeafConfigProps> = React.memo(({ path, node }) => {
  const { tab } = useTagTreeLeafConfigState();
  const dispatch = useDispatch();

  const setTab = React.useCallback(
    (tab: TagTreeLeafConfigTabId) => {
      dispatch({
        type: "tag-tree-leaf-config__set-tab",
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
});

const Tabs: React.FunctionComponent = React.memo(() => (
  <>
    <ConfigTab value={TagTreeLeafConfigTabId.Properties}>Properties</ConfigTab>
    <ConfigTab value={TagTreeLeafConfigTabId.Relations}>Related Tags</ConfigTab>
  </>
));

const Content: React.FunctionComponent<LeafConfigProps> = React.memo(({ path, node }) => (
  <>
    <ConfigTabContent value={TagTreeLeafConfigTabId.Properties}>
      <PropertiesTabContent path={path} node={node} />
    </ConfigTabContent>
    <ConfigTabContent value={TagTreeLeafConfigTabId.Relations}>
      <RelationsTabContent path={path} node={node} />
    </ConfigTabContent>
  </>
));

const PropertiesTabContent: React.FunctionComponent<LeafConfigProps> = React.memo(
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

const RelationsTabContent: React.FunctionComponent<LeafConfigProps> = React.memo(
  ({ path, node }) => (
    <CreateTagFormProvider>
      <Form>
        <Row>
          <Column width={12}>
            <RelationsField path={path} node={node} />
          </Column>
        </Row>
      </Form>
    </CreateTagFormProvider>
  ),
);
