import React from "react";
import { DndMode } from "../../drag-and-drop";
import type { ComponentSchemaTreeDndSubject } from "../state/types";

export const DndContext = React.createContext<{
  source: ComponentSchemaTreeDndSubject | null;
  target: ComponentSchemaTreeDndSubject | null;
  mode: DndMode;
  setSource(subject: ComponentSchemaTreeDndSubject | null): unknown;
  setTarget(target: ComponentSchemaTreeDndSubject | null): unknown;
  setMode(value: DndMode): unknown;
}>({
  source: null,
  target: null,
  mode: DndMode.MoveBefore,
  setSource() {},
  setTarget() {},
  setMode() {},
});
