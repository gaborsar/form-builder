import React from "react";
import { VscPreview, VscSymbolSnippet, VscTag } from "react-icons/vsc";
import {
  Editor,
  EditorBreadcrumbs,
  EditorContent,
  EditorTab,
  EditorTabs,
} from "../../../components/Editor";
import {
  type EditorTab as EditorTabData,
  EditorTabType,
  ExplorerTabId,
  LayoutElementId,
  useComponentTreeState,
  useDispatch,
  useEditorState,
  useFormTreeState,
  useIntlState,
  useTagTreeState,
} from "../../../model";
import { findNodeByPath, resolvePath } from "../../../utils/tree";
import { FormPreviewRenderer } from "../../form-preview";

export const EditorRenderer: React.FunctionComponent = React.memo(() => {
  const { tabs, index } = useEditorState();
  const dispatch = useDispatch();

  const onSelect = React.useCallback(
    (index: number) => {
      dispatch({
        type: "editor__select-tab",
        payload: { index },
      });
    },
    [dispatch],
  );

  const onMove = React.useCallback(
    (source: number, target: number) => {
      dispatch({
        type: "editor__move-tab",
        payload: { source, target },
      });
    },
    [dispatch],
  );

  const onClose = React.useCallback(
    (index: number) => {
      dispatch({
        type: "editor__close-tab",
        payload: { index },
      });
    },
    [dispatch],
  );

  const onCloseOthers = React.useCallback(
    (index: number) => {
      for (let i = index + 1; i < tabs.length; i++) {
        dispatch({
          type: "editor__close-tab",
          payload: { index: index + 1 },
        });
      }
      for (let i = 0; i < index; i++) {
        dispatch({
          type: "editor__close-tab",
          payload: { index: 0 },
        });
      }
    },
    [dispatch, tabs],
  );

  const onCloseAll = React.useCallback(() => {
    for (let i = 0; i < tabs.length; i++) {
      dispatch({
        type: "editor__close-tab",
        payload: { index: 0 },
      });
    }
  }, [dispatch, tabs]);

  const onCloseToTheRight = React.useCallback(
    (index: number) => {
      for (let i = index + 1; i < tabs.length; i++) {
        dispatch({
          type: "editor__close-tab",
          payload: { index: index + 1 },
        });
      }
    },
    [dispatch, tabs],
  );

  const onRevealInExplorer = React.useCallback(
    (index: number) => {
      const { type, path } = tabs[index];
      dispatch({
        type: "layout__focus-on-element",
        payload: { id: LayoutElementId.LeftPanel },
      });
      if (type === "tag") {
        dispatch({
          type: "explorer__set-tab",
          payload: { tab: ExplorerTabId.Tags },
        });
        dispatch({
          type: "tag-tree__select",
          payload: { path },
        });
      } else if (type === "form") {
        dispatch({
          type: "explorer__set-tab",
          payload: { tab: ExplorerTabId.Forms },
        });
        dispatch({
          type: "form-tree__select",
          payload: { path },
        });
      } else if (type === "component") {
        dispatch({
          type: "explorer__set-tab",
          payload: { tab: ExplorerTabId.Components },
        });
        dispatch({
          type: "component-tree__select",
          payload: { path },
        });
      }
    },
    [dispatch, tabs],
  );

  return (
    <Editor>
      {tabs.length !== 0 && (
        <>
          <EditorTabs>
            {tabs.map((tab, i) => (
              <Tab
                key={i}
                isActive={index === i}
                index={i}
                tab={tab}
                onSelect={onSelect}
                onMove={onMove}
                onClose={onClose}
                onCloseOthers={onCloseOthers}
                onCloseAll={onCloseAll}
                onCloseToTheRight={onCloseToTheRight}
                onRevealInExplorer={onRevealInExplorer}
              />
            ))}
          </EditorTabs>
          {tabs.map((tab, i) => (
            <EditorContent key={`${tab.type}/${tab.path.join("/")}`} isActive={index === i}>
              <Content {...tab} />
            </EditorContent>
          ))}
          <EditorBreadcrumbs>
            <Breadcrumbs {...tabs[index]} />
          </EditorBreadcrumbs>
        </>
      )}
    </Editor>
  );
});

interface TabProps {
  isActive: boolean;
  index: number;
  tab: EditorTabData;
  onSelect(index: number): unknown;
  onMove(source: number, target: number): unknown;
  onClose(index: number): unknown;
  onCloseOthers(index: number): unknown;
  onCloseAll(): unknown;
  onCloseToTheRight(index: number): unknown;
  onRevealInExplorer(index: number): unknown;
}

const Tab: React.FunctionComponent<TabProps> = React.memo(
  ({
    isActive,
    index,
    tab,
    onSelect,
    onMove,
    onClose,
    onCloseOthers,
    onCloseAll,
    onCloseToTheRight,
    onRevealInExplorer,
  }) => (
    <EditorTab
      isActive={isActive}
      index={index}
      icon={<TabIcon {...tab} />}
      onSelect={onSelect}
      onMove={onMove}
      onClose={onClose}
      onCloseOthers={onCloseOthers}
      onCloseAll={onCloseAll}
      onCloseToTheRight={onCloseToTheRight}
      onRevealInExplorer={onRevealInExplorer}
    >
      <TabLabel {...tab} />
    </EditorTab>
  ),
);

const TabIcon: React.FunctionComponent<EditorTabData> = React.memo(({ type }) => {
  if (type === EditorTabType.Tag) {
    return <VscTag />;
  }
  if (type === EditorTabType.Form) {
    return <VscPreview />;
  }
  if (type === EditorTabType.Component) {
    return <VscSymbolSnippet />;
  }
  return null;
});

const TabLabel: React.FunctionComponent<EditorTabData> = React.memo(({ type, path }) => {
  switch (type) {
    case EditorTabType.Tag:
      return <TagTabLabel path={path} />;
    case EditorTabType.Form:
      return <FormTabLabel path={path} />;
    case EditorTabType.Component:
      return <ComponentTabLabel path={path} />;
  }
});

interface TabLabelProps {
  path: string[];
}

const TagTabLabel: React.FunctionComponent<TabLabelProps> = React.memo(({ path }) => {
  const { locale } = useIntlState();
  const { root } = useTagTreeState();
  const label = React.useMemo(() => {
    const node = findNodeByPath(root, path);
    return node.data.label[locale] || node.data.name || "anonymous";
  }, [root, path, locale]);
  return <>{label}</>;
});

const FormTabLabel: React.FunctionComponent<TabLabelProps> = React.memo(({ path }) => {
  const { locale } = useIntlState();
  const { root } = useFormTreeState();
  const label = React.useMemo(() => {
    const node = findNodeByPath(root, path);
    return node.data.label[locale] || node.data.name || "anonymous";
  }, [root, path, locale]);
  return <>{label}</>;
});

const ComponentTabLabel: React.FunctionComponent<TabLabelProps> = React.memo(({ path }) => {
  const { locale } = useIntlState();
  const { root } = useComponentTreeState();
  const label = React.useMemo(() => {
    const node = findNodeByPath(root, path);
    return node.data.label[locale] || node.data.name || "anonymous";
  }, [root, path, locale]);
  return <>{label}</>;
});

const Content: React.FunctionComponent<EditorTabData> = React.memo(({ type, path }) => {
  switch (type) {
    case EditorTabType.Tag:
      return null;
    case EditorTabType.Form:
      return <FormContent path={path} />;
    case EditorTabType.Component:
      return null;
  }
});

interface ContentProps {
  path: string[];
}

const FormContent: React.FunctionComponent<ContentProps> = React.memo(({ path }) => (
  <FormPreviewRenderer path={path} />
));

const Breadcrumbs: React.FunctionComponent<EditorTabData> = React.memo(({ type, path }) => {
  switch (type) {
    case EditorTabType.Tag:
      return <TagBreadcrumbs path={path} />;
    case EditorTabType.Form:
      return <FormBreadcrumbs path={path} />;
    case EditorTabType.Component:
      return <ComponentBreadcrumbs path={path} />;
  }
});

interface BreadcrumbsProps {
  path: string[];
}

const TagBreadcrumbs: React.FunctionComponent<BreadcrumbsProps> = React.memo(({ path }) => {
  const { locale } = useIntlState();
  const { root } = useTagTreeState();
  const nodes = React.useMemo(() => resolvePath(root, path), [root, path]);
  return (
    <>
      {nodes
        .slice(1)
        .map((node) => node.data.label[locale] || node.data.name || "anonymous")
        .join(" / ")}
    </>
  );
});

const FormBreadcrumbs: React.FunctionComponent<BreadcrumbsProps> = React.memo(({ path }) => {
  const { locale } = useIntlState();
  const { root } = useFormTreeState();
  const nodes = React.useMemo(() => resolvePath(root, path), [root, path]);
  return (
    <>
      {nodes
        .slice(1)
        .map((node) => node.data.label[locale] || node.data.name || "anonymous")
        .join(" / ")}
    </>
  );
});

const ComponentBreadcrumbs: React.FunctionComponent<BreadcrumbsProps> = React.memo(({ path }) => {
  const { locale } = useIntlState();
  const { root } = useComponentTreeState();
  const nodes = React.useMemo(() => resolvePath(root, path), [root, path]);
  return (
    <>
      {nodes
        .slice(1)
        .map((node) => node.data.label[locale] || node.data.name || "anonymous")
        .join(" / ")}
    </>
  );
});
