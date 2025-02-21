import type {
  SchemaTreeNodeData,
  TagTreeLeafNodeData,
  TagTreeNodeData,
  TagTreeParentNodeData,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import type { TagMap } from "../../inspector";
import { buildAutoCompleteMap } from "./buildAutoCompleteMap";

test("buildAutoCompleteMap", () => {
  const tag1: Node<TagTreeLeafNodeData, TagTreeNodeData> = {
    id: "tag1",
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Leaf",
      name: "1",
      label: { en: "1" },
      relations: [],
    },
    children: [],
  };
  const tag2: Node<TagTreeLeafNodeData, TagTreeNodeData> = {
    id: "tag2",
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Leaf",
      name: "2",
      label: { en: "2" },
      relations: [],
    },
    children: [],
  };
  const tag3: Node<TagTreeLeafNodeData, TagTreeNodeData> = {
    id: "tag3",
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Leaf",
      name: "3",
      label: { en: "3" },
      relations: [],
    },
    children: [],
  };
  const tagGropup: Node<TagTreeParentNodeData, TagTreeNodeData> = {
    id: "tagGroup",
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Parent",
      name: "",
      label: { en: "1" },
    },
    children: [tag1, tag2, tag3],
  };
  const tagMap: TagMap = {
    tag1: {
      parent: tagGropup,
      leaf: tag1,
    },
    tag2: {
      parent: tagGropup,
      leaf: tag2,
    },
    tag3: {
      parent: tagGropup,
      leaf: tag3,
    },
  };
  const option1: Node<SchemaTreeNodeData> = {
    id: "option1",
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Option",
      label: {},
      value: "",
      id: "tag1",
    },
    children: [],
  };
  const option2: Node<SchemaTreeNodeData> = {
    id: "option2",
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Option",
      label: {},
      value: "",
      id: "tag2",
    },
    children: [],
  };
  const option3: Node<SchemaTreeNodeData> = {
    id: "option3",
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Option",
      label: {},
      value: "",
      id: "tag3",
    },
    children: [],
  };
  const option4: Node<SchemaTreeNodeData> = {
    id: "option4",
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Option",
      label: { en: "4" },
      value: "4",
    },
    children: [],
  };
  const option5: Node<SchemaTreeNodeData> = {
    id: "option5",
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Option",
      label: { en: "5" },
      value: "5",
    },
    children: [],
  };
  const option6: Node<SchemaTreeNodeData> = {
    id: "option6",
    visible: true,
    collapsible: false,
    collapsed: false,
    data: {
      type: "Option",
      label: { en: "6" },
      value: "6",
    },
    children: [],
  };
  const dropdown1: Node<SchemaTreeNodeData> = {
    id: "dropdown1",
    visible: true,
    collapsible: true,
    collapsed: false,
    data: {
      type: "Dropdown",
      required: true,
      defaultValue: "",
      transferOptionMetaToParent: false,
    },
    children: [option1, option2, option3],
  };
  const dropdown2: Node<SchemaTreeNodeData> = {
    id: "dropdown2",
    visible: true,
    collapsible: true,
    collapsed: false,
    data: {
      type: "Dropdown",
      required: true,
      defaultValue: "",
      transferOptionMetaToParent: false,
    },
    children: [option4, option5, option6],
  };
  const field1: Node<SchemaTreeNodeData> = {
    id: "field1",
    visible: true,
    collapsible: true,
    collapsed: false,
    data: {
      type: "Field",
      key: "a",
      label: {},
    },
    children: [dropdown1],
  };
  const field2: Node<SchemaTreeNodeData> = {
    id: "field2",
    visible: true,
    collapsible: true,
    collapsed: false,
    data: {
      type: "Field",
      key: "c",
      label: {},
    },
    children: [dropdown2],
  };
  const column1: Node<SchemaTreeNodeData> = {
    id: "column1",
    visible: true,
    collapsible: true,
    collapsed: false,
    data: { type: "Column", width: 6, grow: false },
    children: [field1],
  };
  const column3: Node<SchemaTreeNodeData> = {
    id: "column3",
    visible: true,
    collapsible: true,
    collapsed: false,
    data: { type: "Column", width: 6, grow: false },
    children: [field2],
  };
  const row2: Node<SchemaTreeNodeData> = {
    id: "row2",
    visible: true,
    collapsible: true,
    collapsed: false,
    data: { type: "Row" },
    children: [column3],
  };
  const fieldGroupList1: Node<SchemaTreeNodeData> = {
    id: "fieldrGoupList1",
    visible: true,
    collapsible: true,
    collapsed: false,
    data: {
      type: "FieldGroupList",
      key: "b",
      label: {},
      minLength: null,
      maxLength: null,
    },
    children: [row2],
  };
  const column2: Node<SchemaTreeNodeData> = {
    id: "column2",
    visible: true,
    collapsible: true,
    collapsed: false,
    data: { type: "Column", width: 6, grow: false },
    children: [fieldGroupList1],
  };
  const row1: Node<SchemaTreeNodeData> = {
    id: "row1",
    visible: true,
    collapsible: true,
    collapsed: false,
    data: { type: "Row" },
    children: [column1, column2],
  };
  const fieldset: Node<SchemaTreeNodeData> = {
    id: "fieldset",
    visible: true,
    collapsible: true,
    collapsed: false,
    data: { type: "Fieldset", label: {} },
    children: [row1],
  };
  const form: Node<SchemaTreeNodeData> = {
    id: "form",
    visible: true,
    collapsible: true,
    collapsed: false,
    data: { type: "Form" },
    children: [fieldset],
  };

  expect(buildAutoCompleteMap(tagMap, form)).toEqual({
    paths: ["/a", "/b", "/b//c"],
    enums: {
      "/a": ["1", "2", "3"],
      "/b//c": ["4", "5", "6"],
    },
  });
});
