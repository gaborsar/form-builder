import React from "react";
import { useIntlState, useTagTreeState } from "../../../model";

export function useTagOptions(): { value: string; label: string }[] {
  const { locale } = useIntlState();
  const { root } = useTagTreeState();
  return React.useMemo(() => {
    const options: { label: string; value: string }[] = [];
    for (const group of root.children) {
      if (group.data.type === "Parent") {
        for (const tag of group.children) {
          if (tag.data.type === "Leaf") {
            options.push({
              value: tag.id,
              label: `${group.data.label[locale] || group.data.name} ${tag.data.label[locale] || tag.data.name}`,
            });
          }
        }
      }
    }
    return options;
  }, [root, locale]);
}
