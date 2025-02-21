import React from "react";
import { Config, ConfigContext, ConfigTab, ConfigTabContent } from "../../../components/Config";
import {
  FormTreeConfigTabId,
  type FormTreeNodeData,
  useDispatch,
  useFormTreeConfigState,
  useFormTreeState,
} from "../../../model";
import { type Node, findNodeByPath } from "../../../utils/tree";
import { LeafConfig } from "./LeafConfig";
import { ParentConfig } from "./ParentConfig";

interface FormConfigProps {
  path: string[];
}

export const FormConfig: React.FunctionComponent<FormConfigProps> = React.memo(({ path }) => {
  const { tab } = useFormTreeConfigState();
  const { root } = useFormTreeState();
  const dispatch = useDispatch();

  const node = React.useMemo(() => findNodeByPath(root, path), [root, path]);

  const setTab = React.useCallback(
    (tab: FormTreeConfigTabId) => {
      dispatch({
        type: "form-tree-config__set-tab",
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
});

const Tabs: React.FunctionComponent = React.memo(() => (
  <ConfigTab value={FormTreeConfigTabId.Properties}>Properties</ConfigTab>
));

interface ContentProps {
  path: string[];
  node: Node<FormTreeNodeData>;
}

const Content: React.FunctionComponent<ContentProps> = React.memo(({ path, node }) => (
  <ConfigTabContent value={FormTreeConfigTabId.Properties}>
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
