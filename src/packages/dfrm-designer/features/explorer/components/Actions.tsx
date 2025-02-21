import React from "react";
import { ExplorerTabActions } from "../../../components/Explorer";
import { EditorTabType, ExplorerTabId, useEditorState } from "../../../model";
import { ComponentSchemaTreeActions } from "./ComponentSchemaTreeActions";
import { ComponentTreeActions } from "./ComponentTreeActions";
import { FormSchemaTreeActions } from "./FormSchemaTreeActions";
import { FormTreeActions } from "./FormTreeActions";
import { TagTreeActions } from "./TagTreeActions";

export const Actions: React.FunctionComponent = React.memo(() => (
  <>
    <ExplorerTabActions value={ExplorerTabId.Tags}>
      <TagTreeActions />
    </ExplorerTabActions>
    <ExplorerTabActions value={ExplorerTabId.Forms}>
      <FormTreeActions />
    </ExplorerTabActions>
    <ExplorerTabActions value={ExplorerTabId.Components}>
      <ComponentTreeActions />
    </ExplorerTabActions>
    <ExplorerTabActions value={ExplorerTabId.Structure}>
      <StructureTabActions />
    </ExplorerTabActions>
  </>
));

const StructureTabActions: React.FunctionComponent = React.memo(() => {
  const { tabs, index } = useEditorState();
  if (tabs.length === 0 || index === -1) {
    return null;
  }
  const { type } = tabs[index];
  if (type === EditorTabType.Form) {
    return <FormSchemaTreeActions />;
  }
  if (type === EditorTabType.Component) {
    return <ComponentSchemaTreeActions />;
  }
  return null;
});
