import React from "react";
import { ExplorerTabSearch } from "../../../components/Explorer";
import { EditorTabType, ExplorerTabId, useEditorState } from "../../../model";
import { ComponentSchemaTreeSearch } from "./ComponentSchemaTreeSearch";
import { ComponentTreeSearch } from "./ComponentTreeSearch";
import { FormSchemaTreeSearch } from "./FormSchemaTreeSearch";
import { FormTreeSearch } from "./FormTreeSearch";
import { TagTreeSearch } from "./TagTreeSearch";

export const Search: React.FunctionComponent = React.memo(() => (
  <>
    <ExplorerTabSearch value={ExplorerTabId.Tags}>
      <TagTreeSearch />
    </ExplorerTabSearch>
    <ExplorerTabSearch value={ExplorerTabId.Forms}>
      <FormTreeSearch />
    </ExplorerTabSearch>
    <ExplorerTabSearch value={ExplorerTabId.Components}>
      <ComponentTreeSearch />
    </ExplorerTabSearch>
    <ExplorerTabSearch value={ExplorerTabId.Structure}>
      <StructureTabSearch />
    </ExplorerTabSearch>
  </>
));

const StructureTabSearch: React.FunctionComponent = React.memo(() => {
  const { tabs, index } = useEditorState();
  if (tabs.length === 0 || index === -1) {
    return null;
  }
  const { type } = tabs[index];
  if (type === EditorTabType.Form) {
    return <FormSchemaTreeSearch />;
  }
  if (type === EditorTabType.Component) {
    return <ComponentSchemaTreeSearch />;
  }
  return null;
});
