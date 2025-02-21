export interface EditorState {
  tabs: EditorTab[];
  index: number;
}

export interface EditorTab {
  type: EditorTabType;
  path: string[];
}

export enum EditorTabType {
  Tag = "tag",
  Form = "form",
  Component = "component",
}
