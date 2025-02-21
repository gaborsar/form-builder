import React from "react";
import { DndMode } from "../../drag-and-drop";
import type { FormSchemaTreeDndSubject } from "../state/types";

export const DndContext = React.createContext<{
  source: FormSchemaTreeDndSubject | null;
  target: FormSchemaTreeDndSubject | null;
  mode: DndMode;
  setSource(subject: FormSchemaTreeDndSubject | null): unknown;
  setTarget(target: FormSchemaTreeDndSubject | null): unknown;
  setMode(value: DndMode): unknown;
}>({
  source: null,
  target: null,
  mode: DndMode.MoveBefore,
  setSource() {},
  setTarget() {},
  setMode() {},
});
