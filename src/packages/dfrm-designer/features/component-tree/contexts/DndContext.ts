import React from "react";
import { DndMode } from "../../drag-and-drop";
import type { ComponentTreeDndSubject } from "../state/types";

export const DndContext = React.createContext<{
  source: ComponentTreeDndSubject | null;
  target: ComponentTreeDndSubject | null;
  mode: DndMode;
  setSource(subject: ComponentTreeDndSubject | null): unknown;
  setTarget(target: ComponentTreeDndSubject | null): unknown;
  setMode(value: DndMode): unknown;
}>({
  source: null,
  target: null,
  mode: DndMode.MoveBefore,
  setSource() {},
  setTarget() {},
  setMode() {},
});
