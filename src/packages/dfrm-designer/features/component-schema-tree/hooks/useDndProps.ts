import React from "react";
import {
  type ComponentSchemaTreeAction,
  type ComponentSchemaTreeNodeData,
  useComponentSchemaTreeState,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import {
  type UseDndPropsResult,
  useDndHandler,
  useDndProps as useDndPropsDefault,
} from "../../drag-and-drop";
import { DndContext } from "../contexts/DndContext";
import type { ComponentSchemaTreeDndSubject } from "../state/types";

export function useDndProps(path: string[]): UseDndPropsResult {
  const { root } = useComponentSchemaTreeState();
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
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  source: ComponentSchemaTreeDndSubject,
  target: ComponentSchemaTreeDndSubject,
): void {
  dispatch({
    type: "component-schema-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  dispatch({
    type: "component-schema-tree__remove",
    payload: { path: source.path },
  });
  dispatch({
    type: "component-schema-tree__append",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "component-schema-tree__select",
    payload: { path: target.path.concat(source.node.id) },
  });
}

function moveBefore(
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  source: ComponentSchemaTreeDndSubject,
  target: ComponentSchemaTreeDndSubject,
): void {
  dispatch({
    type: "component-schema-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  dispatch({
    type: "component-schema-tree__remove",
    payload: { path: source.path },
  });
  dispatch({
    type: "component-schema-tree__insert-before",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "component-schema-tree__select",
    payload: { path: target.path.slice(0, -1).concat(source.node.id) },
  });
}

function moveAfter(
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  source: ComponentSchemaTreeDndSubject,
  target: ComponentSchemaTreeDndSubject,
): void {
  dispatch({
    type: "component-schema-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  dispatch({
    type: "component-schema-tree__remove",
    payload: { path: source.path },
  });
  dispatch({
    type: "component-schema-tree__insert-after",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "component-schema-tree__select",
    payload: { path: target.path.slice(0, -1).concat(source.node.id) },
  });
}

function moveOver(
  dispatch: React.Dispatch<ComponentSchemaTreeAction>,
  source: ComponentSchemaTreeDndSubject,
  target: ComponentSchemaTreeDndSubject,
): void {
  dispatch({
    type: "component-schema-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  dispatch({
    type: "component-schema-tree__remove",
    payload: { path: source.path },
  });
  dispatch({
    type: "component-schema-tree__replace",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "component-schema-tree__select",
    payload: { path: target.path.slice(0, -1).concat(source.node.id) },
  });
}

function canDrag(): boolean {
  return true;
}

function canMoveIn(
  source: ComponentSchemaTreeDndSubject,
  target: ComponentSchemaTreeDndSubject,
): boolean {
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
    data: { type: tB },
  } = source.node;
  const {
    data: { type: tC },
  } = target.node;

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
  source: ComponentSchemaTreeDndSubject,
  target: ComponentSchemaTreeDndSubject,
): boolean {
  if (source.node === target.node) {
    return false;
  }
  if (target.ancestors.some((node) => node === source.node)) {
    return false;
  }

  const {
    data: { type: tB },
  } = source.node;
  const {
    data: { type: tC },
  } = findParent(target);

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

function canMoveOver(
  source: ComponentSchemaTreeDndSubject,
  target: ComponentSchemaTreeDndSubject,
): boolean {
  if (source.node === target.node) {
    return false;
  }
  if (target.ancestors.some((node) => node === source.node)) {
    return false;
  }
  return false;
}

function findParent({
  ancestors,
}: ComponentSchemaTreeDndSubject): Node<ComponentSchemaTreeNodeData> {
  if (ancestors.length === 0) {
    throw new Error();
  }
  return ancestors[ancestors.length - 1];
}
