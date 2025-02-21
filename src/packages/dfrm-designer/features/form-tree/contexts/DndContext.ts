import React from "react";
import { DndMode } from "../../drag-and-drop";
import type { FormTreeDndSubject } from "../state/types";

export const DndContext = React.createContext<{
  source: FormTreeDndSubject | null;
  target: FormTreeDndSubject | null;
  mode: DndMode;
  setSource(subject: FormTreeDndSubject | null): unknown;
  setTarget(target: FormTreeDndSubject | null): unknown;
  setMode(value: DndMode): unknown;
}>({
  source: null,
  target: null,
  mode: DndMode.MoveBefore,
  setSource() {},
  setTarget() {},
  setMode() {},
});
