import React from "react";
import { Field, ValidationError } from "../../dfrm-components";
import type { RenderFieldResult } from "../../dfrm-schema";
import { FieldContext } from "../contexts/FieldContext";
import { FormContext } from "../contexts/FormContext";
import { InputRenderer } from "./Input";

interface FieldRendererProps<Meta> extends Omit<RenderFieldResult<Meta>, "key"> {
  keyProp: string;
  onChangeProperty(key: string, value: unknown): unknown;
}

export const FieldRenderer = React.memo(function FieldRenderer<Meta>({
  keyProp: key,
  label,
  child,
  onChangeProperty,
}: FieldRendererProps<Meta>): React.ReactElement {
  if (child === undefined) {
    throw new Error();
  }

  const { isSubmitted } = React.useContext(FormContext);
  const { onBlur } = React.useContext(FieldContext);

  const { name, errors = [] } = child;

  const errorMessage = React.useMemo(
    () => (errors.length === 0 ? "" : errors[0].message),
    [errors],
  );

  const [isTouched, setTouched] = React.useState(false);

  const onBlurInner = React.useCallback(() => {
    setTouched(true);
    onBlur();
  }, [onBlur]);

  const onChangeValue = React.useCallback(
    (value: unknown) => {
      onChangeProperty(key, value);
    },
    [key, onChangeProperty],
  );

  return (
    <Field>
      <label htmlFor={name}>
        {label}
        {"required" in child && child.required && " *"}
      </label>
      <FieldContext.Provider value={{ onBlur: onBlurInner }}>
        <InputRenderer {...child} name={name} onChangeValue={onChangeValue} />
      </FieldContext.Provider>
      <ValidationError content={isSubmitted || isTouched ? errorMessage : ""} />
    </Field>
  );
});
