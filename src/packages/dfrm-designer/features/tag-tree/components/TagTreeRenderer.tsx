import React from "react";
import { ExplorerTree } from "../../../components/ExplorerTree";
import {
  type TagTreeNodeData,
  type TagTreeParentNodeData,
  useIntlState,
  useTagTreeState,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { DndMode } from "../../drag-and-drop";
import { DndContext } from "../contexts/DndContext";
import { filterRoot } from "../state/filtering";
import type { TagTreeDndSubject } from "../state/types";
import { AppendGroupMenuItem } from "./AppendGroupMenuItem";
import { ParentNodeRenderer } from "./ParentNodeRenderer";

const emptyPath: string[] = [];

export const TagTreeRenderer: React.FunctionComponent = React.memo(() => {
  const { locale } = useIntlState();
  const { query = "", root } = useTagTreeState();

  const filteredRoot = React.useMemo(() => filterRoot(root, locale, query), [root, locale, query]);

  const [source, setSource] = React.useState<TagTreeDndSubject | null>(null);
  const [target, setTarget] = React.useState<TagTreeDndSubject | null>(null);
  const [mode, setMode] = React.useState(DndMode.MoveBefore);

  return (
    <ExplorerTree menu={<AppendGroupMenuItem path={emptyPath} />}>
      <DndContext.Provider value={{ source, target, mode, setSource, setTarget, setMode }}>
        {filteredRoot.children.map((child, index) => (
          <ParentNodeRenderer
            key={child.id}
            node={child as Node<TagTreeParentNodeData, TagTreeNodeData>}
            canMoveUp={index !== 0}
            canMoveDown={index !== filteredRoot.children.length - 1}
          />
        ))}
      </DndContext.Provider>
    </ExplorerTree>
  );
});
