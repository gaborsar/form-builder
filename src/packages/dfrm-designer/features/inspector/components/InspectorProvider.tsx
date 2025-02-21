import React from "react";
import { useComponentTreeState, useFormTreeState, useTagTreeState } from "../../../model";
import { ComponentMapContext } from "../contexts/ComponentMapContext";
import { ComponentReferenceMapContext } from "../contexts/ComponentReferenceMapContext";
import { TagMapContext } from "../contexts/TagMapContext";
import { TagReferenceMapContext } from "../contexts/TagReferenceMapContext";
import { useBuildComponentMap } from "../hooks/useBuildComponentMap";
import { useBuildComponentReferenceMap } from "../hooks/useBuildComponentReferenceMap";
import { useBuildTagMap } from "../hooks/useBuildTagMap";
import { useBuildTagReferenceMap } from "../hooks/useBuildTagReferenceMap";

export const InspectorProvider: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => {
    let out = <>{children}</>;
    out = <TagMapProvider>{out}</TagMapProvider>;
    out = <ComponentMapProvider>{out}</ComponentMapProvider>;
    out = <TagReferenceMapProvider>{out}</TagReferenceMapProvider>;
    out = <ComponentReferenceMapProvider>{out}</ComponentReferenceMapProvider>;
    return out;
  },
);

const TagMapProvider: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => {
    const { root } = useTagTreeState();
    const value = useBuildTagMap(root);
    return <TagMapContext.Provider value={value}>{children}</TagMapContext.Provider>;
  },
);

const ComponentMapProvider: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => {
    const { root } = useComponentTreeState();
    const value = useBuildComponentMap(root);
    return <ComponentMapContext.Provider value={value}>{children}</ComponentMapContext.Provider>;
  },
);

const TagReferenceMapProvider: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => {
    const { root: tagTreeRoot } = useTagTreeState();
    const { root: formTreeRoot } = useFormTreeState();
    const { root: componentTreeRoot } = useComponentTreeState();
    const value = useBuildTagReferenceMap(tagTreeRoot, formTreeRoot, componentTreeRoot);
    return (
      <TagReferenceMapContext.Provider value={value}>{children}</TagReferenceMapContext.Provider>
    );
  },
);

const ComponentReferenceMapProvider: React.FunctionComponent<React.PropsWithChildren> = React.memo(
  ({ children }) => {
    const { root } = useFormTreeState();
    const value = useBuildComponentReferenceMap(root);
    return (
      <ComponentReferenceMapContext.Provider value={value}>
        {children}
      </ComponentReferenceMapContext.Provider>
    );
  },
);
