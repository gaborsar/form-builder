import React from "react";
import { useIntlState, useTagTreeState } from "../../../model";

export function useTagGroupOptions(): { value: string; label: string }[] {
  const { locale } = useIntlState();
  const { root } = useTagTreeState();
  return React.useMemo(() => {
    const options: { label: string; value: string }[] = [];
    for (const group of root.children) {
      if (group.data.type === "Parent") {
        options.push({
          value: group.id,
          label: group.data.label[locale] || group.data.name,
        });
      }
    }
    return options;
  }, [root, locale]);
}
