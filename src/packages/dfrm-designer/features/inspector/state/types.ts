import type {
  ComponentTreeLeafNodeData,
  ComponentTreeNodeData,
  TagTreeLeafNodeData,
  TagTreeNodeData,
  TagTreeParentNodeData,
} from "../../../model";
import type { Node } from "../../../utils/tree";

export interface TagMap {
  [id: string]: {
    parent: Node<TagTreeParentNodeData, TagTreeNodeData>;
    leaf: Node<TagTreeLeafNodeData, TagTreeNodeData>;
  };
}

export interface ComponentMap {
  [id: string]: Node<ComponentTreeLeafNodeData, ComponentTreeNodeData>;
}

export interface TagReferenceMap {
  [id: string]: TagReference[];
}

export type TagReference =
  | RelationTagReference
  | FormSchemaIdTagReference
  | FormSchemaTagTagReference
  | ComponentSchemaIdTagReference
  | ComponentSchemaTagTagReference;

export interface RelationTagReference {
  type: "relation";
  path: string[];
}

export interface FormSchemaIdTagReference {
  type: "form-schema-id";
  formTreePath: string[];
  schemaTreePath: string[];
}

export interface FormSchemaTagTagReference {
  type: "form-schema-tag";
  formTreePath: string[];
  schemaTreePath: string[];
}

export interface ComponentSchemaIdTagReference {
  type: "component-schema-id";
  componentTreePath: string[];
  schemaTreePath: string[];
}

export interface ComponentSchemaTagTagReference {
  type: "component-schema-tag";
  componentTreePath: string[];
  schemaTreePath: string[];
}

export interface ComponentReferenceMap {
  [id: string]: ComponentReference[];
}

export interface ComponentReference {
  formTreePath: string[];
  schemaTreePath: string[];
}
