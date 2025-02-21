import React from "react";
import { type FormTreeAction, useDispatch, useFormTreeState } from "../../../model";
import {
  type UseDndPropsResult,
  useDndHandler,
  useDndProps as useDndPropsDefault,
} from "../../drag-and-drop";
import { DndContext } from "../contexts/DndContext";
import type { FormTreeDndSubject } from "../state/types";

export function useDndProps(path: string[]): UseDndPropsResult {
  const { root } = useFormTreeState();
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
  dispatch: React.Dispatch<FormTreeAction>,
  source: FormTreeDndSubject,
  target: FormTreeDndSubject,
): void {
  dispatch({
    type: "form-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  dispatch({
    type: "form-tree__remove",
    payload: { path: source.path },
  });
  dispatch({
    type: "form-tree__append",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "form-tree__select",
    payload: { path: target.path.concat(source.node.id) },
  });
}

function moveBefore(
  dispatch: React.Dispatch<FormTreeAction>,
  source: FormTreeDndSubject,
  target: FormTreeDndSubject,
): void {
  dispatch({
    type: "form-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  dispatch({
    type: "form-tree__remove",
    payload: { path: source.path },
  });
  dispatch({
    type: "form-tree__insert-before",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "form-tree__select",
    payload: { path: target.path.slice(0, -1).concat(source.node.id) },
  });
}

function moveAfter(
  dispatch: React.Dispatch<FormTreeAction>,
  source: FormTreeDndSubject,
  target: FormTreeDndSubject,
): void {
  dispatch({
    type: "form-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  dispatch({
    type: "form-tree__remove",
    payload: { path: source.path },
  });
  dispatch({
    type: "form-tree__insert-after",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "form-tree__select",
    payload: { path: target.path.slice(0, -1).concat(source.node.id) },
  });
}

function moveOver(): void {}

function canDrag(): boolean {
  return true;
}

function canMoveIn(source: FormTreeDndSubject, target: FormTreeDndSubject): boolean {
  if (source.node === target.node) {
    return false;
  }
  if (source.ancestors.some((node) => node === target.node)) {
    return false;
  }
  if (target.ancestors.some((node) => node === source.node)) {
    return false;
  }
  if (target.node.data.type !== "Parent") {
    return false;
  }
  return true;
}

function canMoveAround(source: FormTreeDndSubject, target: FormTreeDndSubject): boolean {
  if (source.node === target.node) {
    return false;
  }
  if (target.ancestors.some((node) => node === source.node)) {
    return false;
  }
  if (source.node.data.type === "Leaf" && target.path.length === 1) {
    return false;
  }
  return true;
}

function canMoveOver(): boolean {
  return false;
}
