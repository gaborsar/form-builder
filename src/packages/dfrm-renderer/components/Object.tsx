import type { RenderObjectResult } from "dfrm-schema";
import { assoc, dissoc } from "ramda";
import React from "react";
import { RowRenderer } from "./Row";

interface ObjectRendererProps<Meta> extends Omit<RenderObjectResult<Meta>, "key"> {
  keyProp: string;
  onChangeProperty(key: string, value: unknown): unknown;
}

export function ObjectRenderer<Meta>({
  keyProp: key,
  value: unsafeValue,
  children = [],
  onChangeProperty,
}: ObjectRendererProps<Meta>): React.ReactElement {
  const value = React.useMemo(
    () => (unsafeValue as { [key: string]: { [key: string]: unknown } })[key],
    [unsafeValue, key],
  );

  const onChangeChildProperty = React.useCallback(
    (childKey: string, property: unknown) => {
      if (property === undefined) {
        onChangeProperty(key, dissoc(childKey, value));
      } else {
        onChangeProperty(key, assoc(childKey, property, value));
      }
    },
    [onChangeProperty, value, key],
  );

  return (
    <>
      {children.map((child, i) => (
        <RowRenderer {...child} key={i} onChangeProperty={onChangeChildProperty} />
      ))}
    </>
  );
}
