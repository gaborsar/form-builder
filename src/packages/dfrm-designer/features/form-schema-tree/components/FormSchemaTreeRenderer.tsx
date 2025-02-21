import React from "react";
import { ExplorerTree } from "../../../components/ExplorerTree";
import {
  type SchemaTreeFormNodeData,
  type SchemaTreeNodeData,
  useFormSchemaTreeState,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { DndMode } from "../../drag-and-drop";
import { filterRoot } from "../../schema-tree";
import { DndContext } from "../contexts/DndContext";
import type { FormSchemaTreeDndSubject } from "../state/types";
import { AppendFieldsetMenuItem } from "./AppendFieldsetMenuItem";
import { FormNodeRenderer } from "./FormNodeRendrerer";

const emptyPath: string[] = [];

export const FormSchemaTreeRenderer: React.FunctionComponent = React.memo(() => {
  const { locale } = useIntlState();
  const { query, root } = useFormSchemaTreeState();

  const filteredRoot = React.useMemo(() => filterRoot(root, locale, query), [root, locale, query]);

  const [source, setSource] = React.useState<FormSchemaTreeDndSubject | null>(null);
  const [target, setTarget] = React.useState<FormSchemaTreeDndSubject | null>(null);
  const [mode, setMode] = React.useState(DndMode.MoveBefore);

  return (
    <ExplorerTree menu={<AppendFieldsetMenuItem path={emptyPath} />}>
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
        <FormNodeRenderer node={filteredRoot as Node<SchemaTreeFormNodeData, SchemaTreeNodeData>} />
      </DndContext.Provider>
    </ExplorerTree>
  );
});
