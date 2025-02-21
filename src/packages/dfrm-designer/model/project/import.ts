import type { Node } from "../../utils/tree";
import type {
  ComponentSchemaTreeNodeData,
  ComponentSchemaTreeState,
} from "../component-schema-tree";
import type { ComponentTreeNodeData, ComponentTreeState } from "../component-tree";
import type { EditStackItem } from "../edit-stack";
import type { FormSchemaTreeState } from "../form-schema-tree";
import type { FormTreeNodeData, FormTreeState } from "../form-tree";
import type { SchemaTreeNodeData } from "../schema-tree";
import type { TagTreeLeafNodeData, TagTreeNodeData, TagTreeState } from "../tag-tree";
import type {
  ExternalComponentSchemaTreeNode,
  ExternalComponentSchemaTreeState,
  ExternalComponentTreeNode,
  ExternalComponentTreeState,
  ExternalFormSchemaTreeNode,
  ExternalFormSchemaTreeState,
  ExternalFormTreeNode,
  ExternalFormTreeState,
  ExternalProject,
  ExternalTagTreeNode,
  ExternalTagTreeState,
} from "./v1/types";

export function convertProjectToEditStackItem(
  filename: string,
  { tagTree, formTree, componentTree }: ExternalProject,
): EditStackItem {
  return {
    filename,
    tagTree: convertTagTreeState(tagTree),
    formTree: convertFormTreeState(formTree),
    componentTree: convertComponentTreeState(componentTree),
  };
}

function convertTagTreeState({ root }: ExternalTagTreeState): TagTreeState {
  return {
    query: "",
    path: [],
    root: convertTagTreeNode(root),
  };
}

function convertTagTreeNode(node: ExternalTagTreeNode): Node<TagTreeNodeData> {
  const { id, data, children = [] } = node;
  return data.type === "Parent"
    ? {
        id,
        visible: true,
        collapsible: true,
        collapsed: true,
        data,
        children: children.map(convertTagTreeNode),
      }
    : {
        id,
        visible: true,
        collapsible: false,
        collapsed: false,
        data: data as TagTreeLeafNodeData,
        children: [],
      };
}

function convertFormTreeState({ root }: ExternalFormTreeState): FormTreeState {
  return {
    query: "",
    path: [],
    root: convertFormTreeNode(root),
  };
}

function convertFormTreeNode(node: ExternalFormTreeNode): Node<FormTreeNodeData> {
  const { id, data, children = [] } = node;
  return data.type === "Parent"
    ? {
        id,
        visible: true,
        collapsible: true,
        collapsed: true,
        data,
        children: children.map(convertFormTreeNode),
      }
    : {
        id,
        visible: true,
        collapsible: false,
        collapsed: false,
        data: {
          ...data,
          schemaTree: convertFormSchemaTreeState(data.schemaTree),
        },
        children: [],
      };
}

function convertFormSchemaTreeState({ root }: ExternalFormSchemaTreeState): FormSchemaTreeState {
  return {
    query: "",
    path: [],
    root: convertFormSchemaTreeNode(root),
  };
}

function convertFormSchemaTreeNode(node: ExternalFormSchemaTreeNode): Node<SchemaTreeNodeData> {
  const { id, data, children = [] } = node;
  return isSchemaTreeParentNode(node)
    ? {
        id,
        visible: true,
        collapsible: true,
        collapsed: false,
        data,
        children: children.map(convertFormSchemaTreeNode),
      }
    : {
        id,
        visible: true,
        collapsible: false,
        collapsed: false,
        data,
        children: [],
      };
}

function isSchemaTreeParentNode({ data: { type } }: ExternalFormSchemaTreeNode): boolean {
  return (
    type === "Conditional" ||
    type === "Form" ||
    type === "Fieldset" ||
    type === "Row" ||
    type === "Column" ||
    type === "Object" ||
    type === "FieldGroupList" ||
    type === "FieldList" ||
    type === "Field" ||
    type === "Dropdown" ||
    type === "ButtonGroup" ||
    type === "RadioGroup" ||
    type === "Slider" ||
    type === "MultiSelect" ||
    type === "CheckboxGroup" ||
    type === "SwitchGroup"
  );
}

function convertComponentTreeState({ root }: ExternalComponentTreeState): ComponentTreeState {
  return {
    query: "",
    path: [],
    root: convertComponentTreeNode(root),
  };
}

function convertComponentTreeNode(node: ExternalComponentTreeNode): Node<ComponentTreeNodeData> {
  const { id, data, children = [] } = node;
  return data.type === "Parent"
    ? {
        id,
        visible: true,
        collapsible: true,
        collapsed: true,
        data,
        children: children.map(convertComponentTreeNode),
      }
    : {
        id,
        visible: true,
        collapsible: false,
        collapsed: false,
        data: {
          ...data,
          schemaTree: convertComponentSchemaTreeState(data.schemaTree),
        },
        children: [],
      };
}

function convertComponentSchemaTreeState({
  root,
}: ExternalComponentSchemaTreeState): ComponentSchemaTreeState {
  return {
    query: "",
    path: [],
    root: convertComponentSchemaTreeNode(root),
  };
}

function convertComponentSchemaTreeNode(
  node: ExternalComponentSchemaTreeNode,
): Node<ComponentSchemaTreeNodeData> {
  const { id, data, children = [] } = node;
  return isComponentSchemaTreeParentNode(node)
    ? {
        id,
        visible: true,
        collapsible: true,
        collapsed: false,
        data,
        children: children.map(convertComponentSchemaTreeNode),
      }
    : {
        id,
        visible: true,
        collapsible: false,
        collapsed: false,
        data,
        children: [],
      };
}

function isComponentSchemaTreeParentNode({
  data: { type },
}: ExternalComponentSchemaTreeNode): boolean {
  return (
    type === "Dropdown" ||
    type === "ButtonGroup" ||
    type === "RadioGroup" ||
    type === "Slider" ||
    type === "MultiSelect" ||
    type === "CheckboxGroup" ||
    type === "SwitchGroup"
  );
}
