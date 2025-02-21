import React from "react";
import { Column } from "../../dfrm-components";
import type { RenderColumnResult } from "../../dfrm-schema";
import { FieldRenderer } from "./Field";
import { FieldGroupListRenderer } from "./FieldGroupList";
import { FieldListRenderer } from "./FieldList";
import { ObjectRenderer } from "./Object";

interface ColumnRendererProps<Meta> extends RenderColumnResult<Meta> {
  onChangeProperty(key: string, value: unknown): unknown;
}

export const ColumnRenderer = React.memo(function ColumnRenderer<Meta>({
  width,
  child,
  onChangeProperty,
}: ColumnRendererProps<Meta>): React.ReactElement {
  if (child === undefined) {
    throw new Error();
  }
  let content: React.ReactNode = null;
  switch (child.type) {
    case "Object":
      content = (
        <ObjectRenderer {...child} keyProp={child.key} onChangeProperty={onChangeProperty} />
      );
      break;
    case "FieldGroupList":
      content = (
        <FieldGroupListRenderer
          {...child}
          keyProp={child.key}
          onChangeProperty={onChangeProperty}
        />
      );
      break;
    case "FieldList":
      content = (
        <FieldListRenderer {...child} keyProp={child.key} onChangeProperty={onChangeProperty} />
      );
      break;
    case "Field":
      content = (
        <FieldRenderer {...child} keyProp={child.key} onChangeProperty={onChangeProperty} />
      );
      break;
  }
  return <Column width={width}>{content}</Column>;
});
