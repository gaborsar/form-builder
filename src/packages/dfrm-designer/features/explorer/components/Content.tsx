import React from "react";
import { ExplorerTabContent } from "../../../components/Explorer";
import { EditorTabType, ExplorerTabId, useEditorState } from "../../../model";
import { ComponentSchemaTreeRenderer } from "../../component-schema-tree";
import { ComponentTreeRenderer } from "../../component-tree";
import { FormSchemaTreeRenderer } from "../../form-schema-tree";
import { FormTreeRenderer } from "../../form-tree";
import { TagTreeRenderer } from "../../tag-tree";

export const Content: React.FunctionComponent = React.memo(() => (
  <>
    <ExplorerTabContent value={ExplorerTabId.Tags}>
      <TagTreeRenderer />
    </ExplorerTabContent>
    <ExplorerTabContent value={ExplorerTabId.Forms}>
      <FormTreeRenderer />
    </ExplorerTabContent>
    <ExplorerTabContent value={ExplorerTabId.Components}>
      <ComponentTreeRenderer />
    </ExplorerTabContent>
    <ExplorerTabContent value={ExplorerTabId.Structure}>
      <StructureTabContent />
    </ExplorerTabContent>
  </>
));

const StructureTabContent: React.FunctionComponent = React.memo(() => {
  const { tabs, index } = useEditorState();
  if (tabs.length === 0 || index === -1) {
    return null;
  }
  const { type } = tabs[index];
  if (type === EditorTabType.Form) {
    return <FormSchemaTreeRenderer />;
  }
  if (type === EditorTabType.Component) {
    return <ComponentSchemaTreeRenderer />;
  }
  return null;
});
