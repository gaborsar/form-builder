import React from "react";
import { ExplorerTree } from "../../../components/ExplorerTree";
import { useFormTreeState, useIntlState } from "../../../model";
import { DndMode } from "../../drag-and-drop";
import { DndContext } from "../contexts/DndContext";
import { filterRoot } from "../state/filtering";
import type { FormTreeDndSubject } from "../state/types";
import { AppendGroupMenuItem } from "./AppendGroupMenuItem";
import { NodeRenderer } from "./NodeRenderer";

const emptyPath: string[] = [];

export const FormTreeRenderer: React.FunctionComponent = React.memo(() => {
  const { locale } = useIntlState();
  const { query, root } = useFormTreeState();

  const filteredRoot = React.useMemo(() => filterRoot(root, locale, query), [root, locale, query]);

  const [source, setSource] = React.useState<FormTreeDndSubject | null>(null);
  const [target, setTarget] = React.useState<FormTreeDndSubject | null>(null);
  const [mode, setMode] = React.useState(DndMode.MoveBefore);

  const menu = <AppendGroupMenuItem path={emptyPath} />;

  return (
    <ExplorerTree menu={menu}>
      <DndContext.Provider value={{ source, target, mode, setSource, setTarget, setMode }}>
        {filteredRoot.children.map((child, index) => (
          <NodeRenderer
            key={child.id}
            level={0}
            parentPath={emptyPath}
            node={child}
            canMoveUp={index !== 0}
            canMoveDown={index !== filteredRoot.children.length - 1}
          />
        ))}
      </DndContext.Provider>
    </ExplorerTree>
  );
});
