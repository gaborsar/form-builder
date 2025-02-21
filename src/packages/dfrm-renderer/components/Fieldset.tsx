import React from "react";
import { Fieldset, FieldsetLabel } from "../../dfrm-components";
import type { RenderFieldsetResult } from "../../dfrm-schema";
import { RowRenderer } from "./Row";

interface FieldsetRendererProps<Meta> extends RenderFieldsetResult<Meta> {
  onChangeProperty(key: string, value: unknown): unknown;
}

export const FieldsetRenderer = React.memo(function FieldsetRenderer<Meta>({
  label,
  children = [],
  onChangeProperty,
}: FieldsetRendererProps<Meta>): React.ReactElement {
  return (
    <Fieldset>
      <FieldsetLabel>{label}</FieldsetLabel>
      {children.map((child, i) => (
        <RowRenderer {...child} key={i} onChangeProperty={onChangeProperty} />
      ))}
    </Fieldset>
  );
});
