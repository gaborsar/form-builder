import React from "react";
import { Config, ConfigContext, ConfigTab, ConfigTabContent } from "../../../components/Config";
import {
  ComponentTreeConfigTabId,
  type ComponentTreeNodeData,
  useComponentTreeConfigState,
  useComponentTreeState,
  useDispatch,
} from "../../../model";
import { type Node, findNodeByPath } from "../../../utils/tree";
import { LeafConfig } from "./LeafConfig";
import { ParentConfig } from "./ParentConfig";

interface ComponentConfigProps {
  path: string[];
}

export const ComponentConfig: React.FunctionComponent<ComponentConfigProps> = React.memo(
  ({ path }) => {
    const { tab } = useComponentTreeConfigState();
    const { root } = useComponentTreeState();
    const dispatch = useDispatch();

    const node = React.useMemo(() => findNodeByPath(root, path), [root, path]);

    const setTab = React.useCallback(
      (tab: ComponentTreeConfigTabId) => {
        dispatch({
          type: "component-tree-config__set-tab",
          payload: { tab },
        });
      },
      [dispatch],
    );

    if (path.length === 0) {
      return null;
    }

    return (
      <ConfigContext.Provider value={{ tab, setTab }}>
        <Config key={node.id} tabs={<Tabs />} content={<Content path={path} node={node} />} />
      </ConfigContext.Provider>
    );
  },
);

const Tabs: React.FunctionComponent = React.memo(() => (
  <ConfigTab value={ComponentTreeConfigTabId.Properties}>Properties</ConfigTab>
));

interface ContentProps {
  path: string[];
  node: Node<ComponentTreeNodeData>;
}

const Content: React.FunctionComponent<ContentProps> = React.memo(({ path, node }) => (
  <ConfigTabContent value={ComponentTreeConfigTabId.Properties}>
    <PropertiesTabContent path={path} node={node} />
  </ConfigTabContent>
));

const PropertiesTabContent: React.FunctionComponent<ContentProps> = React.memo(({ path, node }) =>
  node.data.type === "Parent" ? (
    <ParentConfig path={path} node={node} />
  ) : (
    <LeafConfig path={path} node={node} />
  ),
);
