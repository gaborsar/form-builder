import React from "react";
import { type TagTreeAction, useDispatch, useTagTreeState } from "../../../model";
import {
  type UseDndPropsResult,
  useDndHandler,
  useDndProps as useDndPropsDefault,
} from "../../drag-and-drop";
import { DndContext } from "../contexts/DndContext";
import type { TagTreeDndSubject } from "../state/types";

export function useDndProps(path: string[]): UseDndPropsResult {
  const { root } = useTagTreeState();
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
  dispatch: React.Dispatch<TagTreeAction>,
  source: TagTreeDndSubject,
  target: TagTreeDndSubject,
): void {
  dispatch({
    type: "tag-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  dispatch({ type: "tag-tree__remove", payload: { path: source.path } });
  dispatch({
    type: "tag-tree__append",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "tag-tree__select",
    payload: { path: target.path.concat(source.node.id) },
  });
}

function moveBefore(
  dispatch: React.Dispatch<TagTreeAction>,
  source: TagTreeDndSubject,
  target: TagTreeDndSubject,
): void {
  dispatch({
    type: "tag-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  dispatch({
    type: "tag-tree__remove",
    payload: { path: source.path },
  });
  dispatch({
    type: "tag-tree__insert-before",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "tag-tree__select",
    payload: { path: target.path.slice(0, -1).concat(source.node.id) },
  });
}

function moveAfter(
  dispatch: React.Dispatch<TagTreeAction>,
  source: TagTreeDndSubject,
  target: TagTreeDndSubject,
): void {
  dispatch({
    type: "tag-tree__select",
    payload: { path: source.path.slice(0, -1) },
  });
  dispatch({
    type: "tag-tree__remove",
    payload: { path: source.path },
  });
  dispatch({
    type: "tag-tree__insert-after",
    payload: { path: target.path, node: source.node },
  });
  dispatch({
    type: "tag-tree__select",
    payload: { path: target.path.slice(0, -1).concat(source.node.id) },
  });
}

function moveOver(): void {}

function canDrag(): boolean {
  return true;
}

function canMoveIn(source: TagTreeDndSubject, target: TagTreeDndSubject): boolean {
  if (source.node === target.node) {
    return false;
  }
  if (source.ancestors.some((node) => node === target.node)) {
    return false;
  }
  if (target.ancestors.some((node) => node === source.node)) {
    return false;
  }
  if (source.node.data.type !== "Leaf" || target.node.data.type !== "Parent") {
    return false;
  }
  return true;
}

function canMoveAround(source: TagTreeDndSubject, target: TagTreeDndSubject): boolean {
  return source.node !== target.node && source.node.data.type === target.node.data.type;
}

function canMoveOver(): boolean {
  return false;
}
