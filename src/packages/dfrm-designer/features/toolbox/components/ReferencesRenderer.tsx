import React from "react";
import { VscArrowRight } from "react-icons/vsc";
import { ReferenceList, ReferenceListItem } from "../../../components/ReferenceList";
import {
  EditorTabType,
  ExplorerTabId,
  LayoutElementId,
  SchemaTreeConfigTabId,
  TagTreeLeafConfigTabId,
  useComponentTreeState,
  useDispatch,
  useEditorState,
  useFormTreeState,
  useIntlState,
  useTagTreeState,
} from "../../../model";
import { findNodeByPath, resolvePath } from "../../../utils/tree";
import {
  type ComponentReference,
  type ComponentSchemaIdTagReference,
  type ComponentSchemaTagTagReference,
  type FormSchemaIdTagReference,
  type FormSchemaTagTagReference,
  type RelationTagReference,
  type TagReference,
  useComponentReferenceMap,
  useTagReferenceMap,
} from "../../inspector";

export const ReferencesRenderer: React.FunctionComponent = React.memo(() => {
  const { tabs, index } = useEditorState();
  if (tabs.length === 0 || index === -1) {
    return null;
  }
  const { type, path } = tabs[index];
  if (type === EditorTabType.Tag) {
    return <TagReferenceList path={path} />;
  }
  if (type === EditorTabType.Component) {
    return <ComponentReferenceList path={path} />;
  }
  return null;
});

interface ReferencesProps {
  path: string[];
}

const TagReferenceList: React.FunctionComponent<ReferencesProps> = React.memo(({ path }) => {
  const { root } = useTagTreeState();
  const map = useTagReferenceMap();

  const node = React.useMemo(() => findNodeByPath(root, path), [root, path]);
  const refs = React.useMemo(() => map[node.id] || [], [map, node]);

  return (
    <ReferenceList>
      {refs.map((ref, i) => (
        <TagReferenceRenderer key={i} {...ref} />
      ))}
    </ReferenceList>
  );
});

const TagReferenceRenderer: React.FunctionComponent<TagReference> = React.memo((props) => {
  if (props.type === "relation") {
    return <RelationTagReferenceRenderer {...props} />;
  }
  if (props.type === "form-schema-id" || props.type === "form-schema-tag") {
    return <FormSchemaTagReferenceRenderer {...props} />;
  }
  if (props.type === "component-schema-id" || props.type === "component-schema-tag") {
    return <ComponentSchemaTagReferenceRenderer {...props} />;
  }
  return null;
});

const RelationTagReferenceRenderer: React.FunctionComponent<RelationTagReference> = React.memo(
  ({ path }) => {
    const { locale } = useIntlState();
    const { root } = useTagTreeState();
    const dispatch = useDispatch();

    const label = React.useMemo(() => {
      const s = resolvePath(root, path)
        .slice(1)
        .map((node) => node.data.label[locale] || node.data.name || "anonymous")
        .join(" / ");
      return `Tags / ${s}`;
    }, [root, path, locale]);

    const onClick = React.useCallback(() => {
      dispatch({
        type: "layout__focus-on-element",
        payload: { id: LayoutElementId.LeftPanel },
      });
      dispatch({
        type: "explorer__set-tab",
        payload: { tab: ExplorerTabId.Tags },
      });
      dispatch({
        type: "editor__open-tab",
        payload: { type: EditorTabType.Tag, path },
      });
      dispatch({
        type: "tag-tree__select",
        payload: { path },
      });
      dispatch({
        type: "tag-tree-leaf-config__set-tab",
        payload: { tab: TagTreeLeafConfigTabId.Relations },
      });
    }, [dispatch, path]);

    return (
      <ReferenceListItem onClick={onClick}>
        <VscArrowRight />
        {label}
      </ReferenceListItem>
    );
  },
);

const FormSchemaTagReferenceRenderer: React.FunctionComponent<
  FormSchemaIdTagReference | FormSchemaTagTagReference
> = React.memo(({ formTreePath, schemaTreePath }) => {
  const { locale } = useIntlState();
  const { root } = useFormTreeState();
  const dispatch = useDispatch();

  const label = React.useMemo(() => {
    const s = resolvePath(root, formTreePath)
      .slice(1)
      .map((node) => node.data.label[locale] || node.data.name || "anonymous")
      .join(" / ");
    return `Forms / ${s}`;
  }, [root, formTreePath, locale]);

  const onClick = React.useCallback(() => {
    dispatch({
      type: "layout__focus-on-element",
      payload: { id: LayoutElementId.LeftPanel },
    });
    dispatch({
      type: "editor__open-tab",
      payload: { type: EditorTabType.Form, path: formTreePath },
    });
    dispatch({
      type: "form-tree__select",
      payload: { path: formTreePath },
    });
    dispatch({
      type: "form-schema-tree__select",
      payload: { path: schemaTreePath },
    });
    dispatch({
      type: "explorer__set-tab",
      payload: { tab: ExplorerTabId.Structure },
    });
    dispatch({
      type: "schema-tree-config__set-tab",
      payload: { tab: SchemaTreeConfigTabId.IdAndTags },
    });
  }, [dispatch, formTreePath, schemaTreePath]);

  return (
    <ReferenceListItem onClick={onClick}>
      <VscArrowRight />
      {label}
    </ReferenceListItem>
  );
});

const ComponentSchemaTagReferenceRenderer: React.FunctionComponent<
  ComponentSchemaIdTagReference | ComponentSchemaTagTagReference
> = React.memo(({ componentTreePath, schemaTreePath }) => {
  const { locale } = useIntlState();
  const { root } = useComponentTreeState();
  const dispatch = useDispatch();

  const label = React.useMemo(() => {
    const s = resolvePath(root, componentTreePath)
      .slice(1)
      .map((node) => node.data.label[locale] || node.data.name || "anonymous")
      .join(" / ");
    return `Components / ${s}`;
  }, [root, componentTreePath, locale]);

  const onClick = React.useCallback(() => {
    dispatch({
      type: "layout__focus-on-element",
      payload: { id: LayoutElementId.LeftPanel },
    });
    dispatch({
      type: "editor__open-tab",
      payload: { type: EditorTabType.Component, path: componentTreePath },
    });
    dispatch({
      type: "component-tree__select",
      payload: { path: componentTreePath },
    });
    dispatch({
      type: "component-schema-tree__select",
      payload: { path: schemaTreePath },
    });
    dispatch({
      type: "explorer__set-tab",
      payload: { tab: ExplorerTabId.Structure },
    });
    dispatch({
      type: "schema-tree-config__set-tab",
      payload: { tab: SchemaTreeConfigTabId.IdAndTags },
    });
  }, [dispatch, componentTreePath, schemaTreePath]);

  return (
    <ReferenceListItem onClick={onClick}>
      <VscArrowRight />
      {label}
    </ReferenceListItem>
  );
});

const ComponentReferenceList: React.FunctionComponent<ReferencesProps> = React.memo(({ path }) => {
  const { root } = useComponentTreeState();
  const map = useComponentReferenceMap();

  const node = React.useMemo(() => findNodeByPath(root, path), [root, path]);
  const refs = React.useMemo(() => map[node.id] || [], [map, node]);

  return (
    <ReferenceList>
      {refs.map((ref, i) => (
        <ComponentReferenceRenderer key={i} {...ref} />
      ))}
    </ReferenceList>
  );
});

const ComponentReferenceRenderer: React.FunctionComponent<ComponentReference> = React.memo(
  ({ formTreePath, schemaTreePath }) => {
    const { locale } = useIntlState();
    const { root } = useFormTreeState();
    const dispatch = useDispatch();

    const label = React.useMemo(() => {
      const s = resolvePath(root, formTreePath)
        .slice(1)
        .map((node) => node.data.label[locale] || node.data.name || "anonymous")
        .join(" / ");
      return `Forms / ${s}`;
    }, [root, formTreePath, locale]);

    const onClick = React.useCallback(() => {
      dispatch({
        type: "layout__focus-on-element",
        payload: { id: LayoutElementId.LeftPanel },
      });
      dispatch({
        type: "editor__open-tab",
        payload: { type: EditorTabType.Form, path: formTreePath },
      });
      dispatch({
        type: "form-tree__select",
        payload: { path: formTreePath },
      });
      dispatch({
        type: "form-schema-tree__select",
        payload: { path: schemaTreePath },
      });
      dispatch({
        type: "explorer__set-tab",
        payload: { tab: ExplorerTabId.Structure },
      });
    }, [dispatch, formTreePath, schemaTreePath]);

    return (
      <ReferenceListItem onClick={onClick}>
        <VscArrowRight />
        {label}
      </ReferenceListItem>
    );
  },
);
