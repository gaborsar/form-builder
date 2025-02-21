import React from "react";
import {
  type FormSchemaTreeAction,
  type SchemaTreeNodeData,
  useDispatch,
  useFormSchemaTreeState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import {
  type UseDndPropsResult,
  useDndHandler,
  useDndProps as useDndPropsDefault,
} from "../../drag-and-drop";
import { createEmptyNode } from "../../schema-tree";
import { DndContext } from "../contexts/DndContext";
import type { FormSchemaTreeDndSubject } from "../state/types";

export function useDndProps(path: string[]): UseDndPropsResult {
  const { root } = useFormSchemaTreeState();
  const dispatch = useDispatch();

  const { source, target, mode, setSource, setTarget, setMode } = React.useContext(DndContext);

  const onMoveIn = useDndHandler(dispatch, moveIn);
  const onMoveBefore = useDndHandler(dispatch, moveBefore);
  const onMoveAfter = useDndHandler(dispatch, moveAfter);
  const onMoveOver = useDndHandler(dispatch, moveOver);

  return useDndPropsDefault({
    root,
    path,
    source,
    target,
    mode,
    setSource,
    setTarget,
    setMode,
    canDrag,
    canMoveIn,
    canMoveAround,
    canMoveOver,
    onMoveIn,
    onMoveBefore,
    onMoveAfter,
    onMoveOver,
  });
}

function moveIn(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  source: FormSchemaTreeDndSubject,
  target: FormSchemaTreeDndSubject,
): void {
  dispatch({
    type: "form-schema-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  if (shouldCreatePlaceholder(source)) {
    dispatch({
      type: "form-schema-tree__replace",
      payload: { path: source.path, node: createEmptyNode() },
    });
  } else {
    dispatch({
      type: "form-schema-tree__remove",
      payload: { path: source.path },
    });
  }
  dispatch({
    type: "form-schema-tree__append",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "form-schema-tree__select",
    payload: { path: target.path.concat(source.node.id) },
  });
}

function moveBefore(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  source: FormSchemaTreeDndSubject,
  target: FormSchemaTreeDndSubject,
): void {
  dispatch({
    type: "form-schema-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  if (shouldCreatePlaceholder(source)) {
    dispatch({
      type: "form-schema-tree__replace",
      payload: { path: source.path, node: createEmptyNode() },
    });
  } else {
    dispatch({
      type: "form-schema-tree__remove",
      payload: { path: source.path },
    });
  }
  dispatch({
    type: "form-schema-tree__insert-before",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "form-schema-tree__select",
    payload: { path: target.path.slice(0, -1).concat(source.node.id) },
  });
}

function moveAfter(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  source: FormSchemaTreeDndSubject,
  target: FormSchemaTreeDndSubject,
): void {
  dispatch({
    type: "form-schema-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  if (shouldCreatePlaceholder(source)) {
    dispatch({
      type: "form-schema-tree__replace",
      payload: { path: source.path, node: createEmptyNode() },
    });
  } else {
    dispatch({
      type: "form-schema-tree__remove",
      payload: { path: source.path },
    });
  }
  dispatch({
    type: "form-schema-tree__insert-after",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "form-schema-tree__select",
    payload: { path: target.path.slice(0, -1).concat(source.node.id) },
  });
}

function moveOver(
  dispatch: React.Dispatch<FormSchemaTreeAction>,
  source: FormSchemaTreeDndSubject,
  target: FormSchemaTreeDndSubject,
): void {
  dispatch({
    type: "form-schema-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  if (shouldCreatePlaceholder(source)) {
    dispatch({
      type: "form-schema-tree__replace",
      payload: { path: source.path, node: createEmptyNode() },
    });
  } else {
    dispatch({
      type: "form-schema-tree__remove",
      payload: { path: source.path },
    });
  }
  dispatch({
    type: "form-schema-tree__replace",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "form-schema-tree__select",
    payload: { path: target.path.slice(0, -1).concat(source.node.id) },
  });
}

function canDrag(subject: FormSchemaTreeDndSubject): boolean {
  return subject.node.data.type !== "Form";
}

function canMoveIn(source: FormSchemaTreeDndSubject, target: FormSchemaTreeDndSubject): boolean {
  if (source.node === target.node) {
    return false;
  }
  if (source.ancestors.some((node) => node === target.node)) {
    return false;
  }
  if (target.ancestors.some((node) => node === source.node)) {
    return false;
  }

  const {
    data: { type: tA },
  } = findNonConditionalParent(source);
  const {
    data: { type: tB },
  } = source.node;
  const {
    data: { type: tC },
  } = target.node;

  if (tA === "Form" && tC === "Form") {
    return true;
  }

  if (tA === "Fieldset" && tC === "Fieldset") {
    return true;
  }
  if (tA === "Fieldset" && tC === "Object") {
    return true;
  }
  if (tA === "Fieldset" && tC === "FieldGroupList") {
    return true;
  }

  if (tA === "Object" && tC === "Fieldset") {
    return true;
  }
  if (tA === "Object" && tC === "Object") {
    return true;
  }
  if (tA === "Object" && tC === "FieldGroupList") {
    return true;
  }

  if (tA === "FieldGroupList" && tC === "Fieldset") {
    return true;
  }
  if (tA === "FieldGroupList" && tC === "Object") {
    return true;
  }
  if (tA === "FieldGroupList" && tC === "FieldGroupList") {
    return true;
  }

  if (tA === "Row" && tC === "Row") {
    return true;
  }

  if (tB === "Option" && tC === "Dropdown") {
    return true;
  }
  if (tB === "Option" && tC === "ButtonGroup") {
    return true;
  }
  if (tB === "Option" && tC === "RadioGroup") {
    return true;
  }
  if (tB === "Option" && tC === "Slider") {
    return true;
  }
  if (tB === "Option" && tC === "MultiSelect") {
    return true;
  }
  if (tB === "Option" && tC === "CheckboxGroup") {
    return true;
  }
  if (tB === "Option" && tC === "SwitchGroup") {
    return true;
  }

  return false;
}

function canMoveAround(
  source: FormSchemaTreeDndSubject,
  target: FormSchemaTreeDndSubject,
): boolean {
  if (source.node === target.node) {
    return false;
  }
  if (target.ancestors.some((node) => node === source.node)) {
    return false;
  }

  const {
    data: { type: tA },
  } = findNonConditionalParent(source);
  const {
    data: { type: tB },
  } = source.node;
  const {
    data: { type: tC },
  } = findParent(target);

  if (tA === "Form" && tC === "Form") {
    return true;
  }

  if (tA === "Fieldset" && tC === "Fieldset") {
    return true;
  }
  if (tA === "Fieldset" && tC === "Object") {
    return true;
  }
  if (tA === "Fieldset" && tC === "FieldGroupList") {
    return true;
  }

  if (tA === "Object" && tC === "Fieldset") {
    return true;
  }
  if (tA === "Object" && tC === "Object") {
    return true;
  }
  if (tA === "Object" && tC === "FieldGroupList") {
    return true;
  }

  if (tA === "FieldGroupList" && tC === "Fieldset") {
    return true;
  }
  if (tA === "FieldGroupList" && tC === "Object") {
    return true;
  }
  if (tA === "FieldGroupList" && tC === "FieldGroupList") {
    return true;
  }

  if (tA === "Row" && tC === "Row") {
    return true;
  }

  if (tB === "Option" && tC === "Dropdown") {
    return true;
  }
  if (tB === "Option" && tC === "ButtonGroup") {
    return true;
  }
  if (tB === "Option" && tC === "RadioGroup") {
    return true;
  }
  if (tB === "Option" && tC === "Slider") {
    return true;
  }
  if (tB === "Option" && tC === "MultiSelect") {
    return true;
  }
  if (tB === "Option" && tC === "CheckboxGroup") {
    return true;
  }
  if (tB === "Option" && tC === "SwitchGroup") {
    return true;
  }

  return false;
}

function canMoveOver(source: FormSchemaTreeDndSubject, target: FormSchemaTreeDndSubject): boolean {
  if (source.node === target.node) {
    return false;
  }
  if (target.ancestors.some((node) => node === source.node)) {
    return false;
  }

  const {
    data: { type: tA },
  } = findNonConditionalParent(source);

  const {
    data: { type: tB },
  } = findNonConditionalParent(target);

  if (tA === "Form" && tB === "Form") {
    return true;
  }

  if (tA === "Fieldset" && tB === "Fieldset") {
    return true;
  }
  if (tA === "Fieldset" && tB === "Object") {
    return true;
  }
  if (tA === "Fieldset" && tB === "FieldGroupList") {
    return true;
  }

  if (tA === "Object" && tB === "Fieldset") {
    return true;
  }
  if (tA === "Object" && tB === "Object") {
    return true;
  }
  if (tA === "Object" && tB === "FieldGroupList") {
    return true;
  }

  if (tA === "FieldGroupList" && tB === "Fieldset") {
    return true;
  }
  if (tA === "FieldGroupList" && tB === "Object") {
    return true;
  }
  if (tA === "FieldGroupList" && tB === "FieldGroupList") {
    return true;
  }

  if (tA === "Row" && tB === "Row") {
    return true;
  }

  if (tA === "Column" && tB === "Column") {
    return true;
  }

  if (tA === "Field" && tB === "Field") {
    return true;
  }
  if (tA === "Field" && tB === "FieldList") {
    return true;
  }

  if (tA === "FieldList" && tB === "Field") {
    return true;
  }
  if (tA === "FieldList" && tB === "FieldList") {
    return true;
  }

  return false;
}

function shouldCreatePlaceholder(source: FormSchemaTreeDndSubject): boolean {
  const {
    data: { type: t },
  } = findParent(source);

  return t === "Column" || t === "Field" || t === "FieldList" || t === "Conditional";
}

function findNonConditionalParent({
  ancestors,
}: FormSchemaTreeDndSubject): Node<SchemaTreeNodeData> {
  let out: Node<SchemaTreeNodeData> | null = null;

  for (const node of ancestors) {
    if (node.data.type !== "Conditional") {
      out = node;
    }
  }

  if (out === null) {
    throw new Error();
  }

  return out;
}

function findParent({ ancestors }: FormSchemaTreeDndSubject): Node<SchemaTreeNodeData> {
  if (ancestors.length === 0) {
    throw new Error();
  }
  return ancestors[ancestors.length - 1];
}
