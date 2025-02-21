import React from "react";
import { DndMode } from "../../drag-and-drop";
import type { TagTreeDndSubject } from "../state/types";

export const DndContext = React.createContext<{
  source: TagTreeDndSubject | null;
  target: TagTreeDndSubject | null;
  mode: DndMode;
  setSource(subject: TagTreeDndSubject | null): unknown;
  setTarget(target: TagTreeDndSubject | null): unknown;
  setMode(value: DndMode): unknown;
}>({
  source: null,
  target: null,
  mode: DndMode.MoveBefore,
  setSource() {},
  setTarget() {},
  setMode() {},
});
