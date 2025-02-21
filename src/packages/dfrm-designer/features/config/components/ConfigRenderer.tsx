import React from "react";
import {
  EditorTabType,
  ExplorerTabId,
  LayoutElementId,
  useComponentTreeState,
  useEditorState,
  useFormTreeState,
  useLayoutState,
  useTagTreeState,
} from "../../../model";
import { useExplorerState } from "../../../model/hooks/useExplorerState";
import { ComponentConfig } from "../../component-config";
import { ComponentSchemaConfig } from "../../component-schema-config";
import { FormConfig } from "../../form-config";
import { FormSchemaConfig } from "../../form-schema-config";
import { TagConfig } from "../../tag-config";

export const ConfigRenderer: React.FunctionComponent = React.memo(() => {
  const { activeElement } = useLayoutState();
  const { tab: explorerTab } = useExplorerState();
  const { tabs, index } = useEditorState();
  const { path: tagTreePath } = useTagTreeState();
  const { path: formTreePath } = useFormTreeState();
  const { path: componentTreePath } = useComponentTreeState();
  if (activeElement === LayoutElementId.Editor && tabs.length !== 0) {
    if (tabs.length !== 0 && index !== -1) {
      const { type, path } = tabs[index];
      if (type === EditorTabType.Tag) {
        return <TagConfig path={path} />;
      }
      if (explorerTab === ExplorerTabId.Structure) {
        return <StructureConfig />;
      }
      if (type === EditorTabType.Form) {
        return <FormConfig path={path} />;
      }
      if (type === EditorTabType.Component) {
        return <ComponentConfig path={path} />;
      }
    }
  }
  if (explorerTab === ExplorerTabId.Tags) {
    return <TagConfig path={tagTreePath} />;
  }
  if (explorerTab === ExplorerTabId.Forms) {
    return <FormConfig path={formTreePath} />;
  }
  if (explorerTab === ExplorerTabId.Components) {
    return <ComponentConfig path={componentTreePath} />;
  }
  if (explorerTab === ExplorerTabId.Structure) {
    return <StructureConfig />;
  }
  return null;
});

const StructureConfig: React.FunctionComponent = React.memo(() => {
  const { tabs, index } = useEditorState();
  if (tabs.length === 0 || index === -1) {
    return null;
  }
  const { type } = tabs[index];
  if (type === EditorTabType.Form) {
    return <FormSchemaConfig />;
  }
  if (type === EditorTabType.Component) {
    return <ComponentSchemaConfig />;
  }
  return null;
});
