import React from "react";
import { ExplorerTree } from "../../../components/ExplorerTree";
import {
  type ComponentSchemaTreeNodeData,
  useComponentSchemaTreeState,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { DndMode } from "../../drag-and-drop";
import { filterRoot } from "../../schema-tree";
import { DndContext } from "../contexts/DndContext";
import type { ComponentSchemaTreeDndSubject } from "../state/types";
import { ComponentSchemaTreeNodeRenderer } from "./ComponentSchemaTreeNodeRenderer";

export const ComponentSchemaTreeRenderer: React.FunctionComponent = React.memo(() => {
  const { locale } = useIntlState();
  const { query, root } = useComponentSchemaTreeState();

  const filteredRoot = React.useMemo(() => filterRoot(root, locale, query), [root, locale, query]);

  const [source, setSource] = React.useState<ComponentSchemaTreeDndSubject | null>(null);
  const [target, setTarget] = React.useState<ComponentSchemaTreeDndSubject | null>(null);
  const [mode, setMode] = React.useState(DndMode.MoveBefore);

  return (
    <ExplorerTree>
      <DndContext.Provider
        value={{
          source,
          target,
          mode,
          setSource,
          setTarget,
          setMode,
        }}
      >
        <ComponentSchemaTreeNodeRenderer node={filteredRoot as Node<ComponentSchemaTreeNodeData>} />
      </DndContext.Provider>
    </ExplorerTree>
  );
});
