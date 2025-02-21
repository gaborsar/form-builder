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
import type { TagTreeNodeData, TagTreeState } from "../tag-tree";
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
  ExternalTagTreeLeafNodeData,
  ExternalTagTreeNode,
  ExternalTagTreeState,
} from "./v1/types";

export function convertEditStackItemToProject({
  tagTree,
  formTree,
  componentTree,
}: EditStackItem): ExternalProject {
  return {
    version: 1,
    tagTree: convertTagTreeState(tagTree),
    formTree: convertFormTreeState(formTree),
    componentTree: convertComponentTreeState(componentTree),
  };
}

function convertTagTreeState({ root }: TagTreeState): ExternalTagTreeState {
  return { root: convertTagTreeNode(root) };
}

function convertTagTreeNode(node: Node<TagTreeNodeData>): ExternalTagTreeNode {
  const { id, data, children } = node;
  return data.type === "Parent"
    ? { id, data, children: children.map(convertTagTreeNode) }
    : { id, data: data as ExternalTagTreeLeafNodeData };
}

function convertFormTreeState({ root }: FormTreeState): ExternalFormTreeState {
  return { root: convertFormTreeNode(root) };
}

function convertFormTreeNode(node: Node<FormTreeNodeData>): ExternalFormTreeNode {
  const { id, data, children } = node;
  return data.type === "Parent"
    ? { id, data, children: children.map(convertFormTreeNode) }
    : {
        id,
        data: {
          ...data,
          schemaTree: convertFormSchemaTreeState(data.schemaTree),
        },
      };
}

function convertFormSchemaTreeState({ root }: FormSchemaTreeState): ExternalFormSchemaTreeState {
  return { root: convertFormSchemaTreeNode(root) };
}

function convertFormSchemaTreeNode(node: Node<SchemaTreeNodeData>): ExternalFormSchemaTreeNode {
  const { id, data, children } = node;
  return isFormSchemaTreeParentNode(node)
    ? { id, data, children: children.map(convertFormSchemaTreeNode) }
    : { id, data };
}

function isFormSchemaTreeParentNode({ data: { type } }: Node<SchemaTreeNodeData>): boolean {
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

function convertComponentTreeState({ root }: ComponentTreeState): ExternalComponentTreeState {
  return { root: convertComponentTreeNode(root) };
}

function convertComponentTreeNode(node: Node<ComponentTreeNodeData>): ExternalComponentTreeNode {
  const { id, data, children } = node;
  return data.type === "Parent"
    ? { id, data, children: children.map(convertComponentTreeNode) }
    : {
        id,
        data: {
          ...data,
          schemaTree: convertComponentSchemaTreeState(data.schemaTree),
        },
      };
}

function convertComponentSchemaTreeState({
  root,
}: ComponentSchemaTreeState): ExternalComponentSchemaTreeState {
  return { root: convertComponentSchemaTreeNode(root) };
}

function convertComponentSchemaTreeNode(
  node: Node<ComponentSchemaTreeNodeData>,
): ExternalComponentSchemaTreeNode {
  const { id, data, children } = node;
  return isComponentSchemaTreeParentNode(node)
    ? {
        id,
        data,
        children: children.map(convertComponentSchemaTreeNode),
      }
    : { id, data };
}

function isComponentSchemaTreeParentNode({
  data: { type },
}: Node<ComponentSchemaTreeNodeData>): boolean {
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
