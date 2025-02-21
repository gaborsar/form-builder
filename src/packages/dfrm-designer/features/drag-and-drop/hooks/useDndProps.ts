import React from "react";
import type { Node } from "../../../utils/tree";
import { DndMode, type DndSubject } from "../state/types";
import { createSubject } from "../utils/createSubject";
import { hasSameParent } from "../utils/hasSameParent";
import { isSameSubject } from "../utils/isSameSubject";

export interface UseDndPropsOptions<Data> {
  root: Node<Data>;
  path: string[];

  source: DndSubject<Data> | null;
  target: DndSubject<Data> | null;
  mode: DndMode;

  setSource(source: DndSubject<Data> | null): unknown;
  setTarget(target: DndSubject<Data> | null): unknown;
  setMode(mode: DndMode): unknown;

  canDrag(subject: DndSubject<Data>): boolean;
  canMoveAround(source: DndSubject<Data>, target: DndSubject<Data>): boolean;
  canMoveIn(source: DndSubject<Data>, target: DndSubject<Data>): boolean;
  canMoveOver(source: DndSubject<Data>, target: DndSubject<Data>): boolean;

  onMoveIn(source: DndSubject<Data>, target: DndSubject<Data>): unknown;
  onMoveBefore(source: DndSubject<Data>, target: DndSubject<Data>): unknown;
  onMoveAfter(source: DndSubject<Data>, target: DndSubject<Data>): unknown;
  onMoveOver(source: DndSubject<Data>, target: DndSubject<Data>): unknown;
}

export interface UseDndPropsResult {
  isDraggingSomething: boolean;

  isDraggable: boolean;
  isDndSource: boolean;
  isDndTarget: boolean;

  dndMode: DndMode | null;

  onDragStart(event: React.DragEvent): unknown;
  onDragEnd(event: React.DragEvent): unknown;
  onDragOver(event: React.DragEvent): unknown;
  onDrop(event: React.DragEvent): unknown;
}

export function useDndProps<Data>({
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
}: UseDndPropsOptions<Data>): UseDndPropsResult {
  const subject = React.useMemo(() => createSubject(root, path), [root, path]);

  const isDraggingSomething = source !== null;
  const isDraggable = canDrag(subject);
  const isDndSource = source !== null && isSameSubject(source, subject);
  const isDndTarget = target !== null && isSameSubject(target, subject);
  const dndMode = isDndTarget ? mode : null;

  const onDragStart = React.useCallback(
    (event: React.DragEvent) => {
      event.stopPropagation();
      setSource(subject);
    },
    [setSource, subject],
  );

  const onDragEnd = React.useCallback(
    (event: React.DragEvent) => {
      event.stopPropagation();
      setSource(null);
      setTarget(null);
      setMode(DndMode.MoveBefore);
    },
    [setSource, setTarget, setMode],
  );

  const onDragOver = React.useCallback(
    (event: React.DragEvent) => {
      if (source === null) {
        return setTarget(null);
      }
      if (canMoveIn(source, subject)) {
        event.preventDefault();
        event.stopPropagation();
        setTarget(subject);
        setMode(DndMode.MoveIn);
        return;
      }
      if (canMoveAround(source, subject)) {
        event.preventDefault();
        event.stopPropagation();
        setTarget(subject);
        const areSiblings = hasSameParent(source, subject);
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        if (event.pageY < rect.y + rect.height / 2) {
          if (areSiblings && source.index === subject.index - 1) {
            setMode(DndMode.MoveAfter);
          } else {
            setMode(DndMode.MoveBefore);
          }
        } else {
          if (areSiblings && source.index === subject.index + 1) {
            setMode(DndMode.MoveBefore);
          } else {
            setMode(DndMode.MoveAfter);
          }
        }
        return;
      }
      if (canMoveOver(source, subject)) {
        event.preventDefault();
        event.stopPropagation();
        setTarget(subject);
        setMode(DndMode.MoveOver);
        return;
      }
      setTarget(null);
    },
    [source, subject, canMoveIn, canMoveAround, canMoveOver, setTarget, setMode],
  );

  const onDrop = React.useCallback(
    (event: React.DragEvent) => {
      event.stopPropagation();
      setSource(null);
      setTarget(null);
      setMode(DndMode.MoveBefore);
      if (source === null || target === null) {
        return;
      }
      if (mode === DndMode.MoveIn) {
        return onMoveIn(source, target);
      }
      if (mode === DndMode.MoveBefore) {
        return onMoveBefore(source, target);
      }
      if (mode === DndMode.MoveAfter) {
        return onMoveAfter(source, target);
      }
      if (mode === DndMode.MoveOver) {
        return onMoveOver(source, target);
      }
    },
    [
      setSource,
      setTarget,
      setMode,
      source,
      target,
      mode,
      onMoveIn,
      onMoveBefore,
      onMoveAfter,
      onMoveOver,
    ],
  );

  return {
    isDraggingSomething,
    isDraggable,
    isDndSource,
    isDndTarget,
    dndMode,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
  };
}
