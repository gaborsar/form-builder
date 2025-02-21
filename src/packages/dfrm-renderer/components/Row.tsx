import { Row } from "dfrm-components";
import type { RenderRowResult } from "dfrm-schema";
import React from "react";
import { ColumnRenderer } from "./Column";

interface RowRendererProps<Meta> extends RenderRowResult<Meta> {
  onChangeProperty(key: string, value: unknown): unknown;
}

export const RowRenderer = React.memo(function RowRenderer<Meta>({
  children = [],
  onChangeProperty,
}: RowRendererProps<Meta>): React.ReactElement {
  return (
    <Row>
      {children.map((child, i) => (
        <ColumnRenderer {...child} key={i} onChangeProperty={onChangeProperty} />
      ))}
    </Row>
  );
});
