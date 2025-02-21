import type { RenderFormResult } from "dfrm-schema";
import { assoc, dissoc } from "ramda";
import React from "react";
import { FormContext } from "../contexts/FormContext";
import { FieldsetRenderer } from "./Fieldset";

interface FormRendererProps<Meta> extends RenderFormResult<Meta> {
  isSubmitted: boolean;
  onChangeValue(value: { [key: string]: unknown }): unknown;
}

export const FormRenderer = React.memo(function FormRenderer<Meta>({
  isSubmitted,
  value: unsafeValue,
  children = [],
  onChangeValue,
}: FormRendererProps<Meta>): React.ReactElement | null {
  const value = unsafeValue as { [key: string]: unknown };

  const onChangeProperty = React.useCallback(
    (childKey: string, property: unknown) => {
      if (property === undefined) {
        onChangeValue(dissoc(childKey, value));
      } else {
        onChangeValue(assoc(childKey, property, value));
      }
    },
    [onChangeValue, value],
  );

  if (children.length === 0) {
    return null;
  }

  return (
    <FormContext.Provider value={{ isSubmitted }}>
      {children.map((child, i) => (
        <FieldsetRenderer {...child} key={i} onChangeProperty={onChangeProperty} />
      ))}
    </FormContext.Provider>
  );
});
