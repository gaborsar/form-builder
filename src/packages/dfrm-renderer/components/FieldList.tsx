import {
  Button,
  Field,
  FieldList,
  FieldListAddButton,
  FieldListInput,
  FieldListItem,
  FieldListRemoveButton,
  ValidationError,
} from "dfrm-components";
import type { RenderFieldListItemResult, RenderFieldListResult } from "dfrm-schema";
import { insert, remove, update } from "ramda";
import React from "react";
import { FieldContext } from "../contexts/FieldContext";
import { FormContext } from "../contexts/FormContext";
import { useKeys } from "../hooks/useKeys";
import { InputRenderer } from "./Input";

interface FieldListRendererProps<Meta> extends Omit<RenderFieldListResult<Meta>, "key"> {
  keyProp: string;
  onChangeProperty(key: string, value: unknown): unknown;
}

export const FieldListRenderer = React.memo(function FieldListRenderer<Meta>({
  minLength = 0,
  maxLength = Number.POSITIVE_INFINITY,
  keyProp: key,
  emptyLabel,
  appendMessage,
  value: unsafeValue,
  errors = [],
  children = [],
  onChangeProperty,
}: FieldListRendererProps<Meta>): React.ReactElement {
  const value = React.useMemo(
    () => (unsafeValue as { [key: string]: unknown[] })[key],
    [unsafeValue, key],
  );

  const errorMessage = React.useMemo(
    () => (errors.length === 0 ? "" : errors[0].message),
    [errors],
  );

  const { keys, removeKey, insertKey } = useKeys(value);

  const { onBlur } = React.useContext(FieldContext);
  const [isTouched, setTouched] = React.useState(false);

  const canRemove = children.length > minLength;
  const canInsert = children.length < maxLength;

  const onBlurInner = React.useCallback(() => {
    setTouched(true);
    onBlur();
  }, [onBlur]);

  const onChangeValue = React.useCallback(
    (value: unknown[]) => {
      setTouched(true);
      onChangeProperty(key, value);
    },
    [key, onChangeProperty],
  );

  const onChangeItem = React.useCallback(
    (index: number, item: unknown) => {
      onChangeValue(update(index, item, value));
    },
    [onChangeValue, value],
  );

  const onRemoveItem = React.useCallback(
    (index: number) => {
      removeKey(index);
      onChangeValue(remove(index, 1, value));
    },
    [removeKey, onChangeValue, value],
  );

  const onInsertItem = React.useCallback(
    (index: number) => {
      insertKey(index);
      onChangeValue(insert(index + 1, undefined, value));
    },
    [insertKey, onChangeValue, value],
  );

  const onInsertFirstItem = React.useCallback(() => {
    onInsertItem(0);
  }, [onInsertItem]);

  return (
    <FieldList>
      <FieldContext.Provider value={{ onBlur: onBlurInner }}>
        {children.length === 0 ? (
          <>
            <Field>
              <label>{emptyLabel}</label>
              <Button onClick={onInsertFirstItem}>{appendMessage}</Button>
            </Field>
          </>
        ) : (
          children.map((item, i) => (
            <ItemRenderer
              {...item}
              key={keys[i] || `${i}`}
              index={i}
              canRemove={canRemove}
              canInsert={canInsert}
              isListTouched={isTouched && i === children.length - 1}
              listErrorMessage={i === children.length - 1 ? errorMessage : ""}
              onChangeItem={onChangeItem}
              onRemoveItem={onRemoveItem}
              onInsertItem={onInsertItem}
            />
          ))
        )}
      </FieldContext.Provider>
    </FieldList>
  );
});

interface ItemRendererProps<Meta> extends RenderFieldListItemResult<Meta> {
  canRemove: boolean;
  canInsert: boolean;
  isListTouched: boolean;
  listErrorMessage: string;
  onChangeItem(index: number, value: unknown): unknown;
  onRemoveItem(index: number): unknown;
  onInsertItem(index: number): unknown;
}

const ItemRenderer = React.memo(function ItemRenderer<Meta>({
  index,
  label,
  child,
  canRemove,
  canInsert,
  isListTouched,
  listErrorMessage,
  onChangeItem,
  onRemoveItem,
  onInsertItem,
}: ItemRendererProps<Meta>): React.ReactElement {
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
      onChangeItem(index, value);
    },
    [index, onChangeItem],
  );

  const onRemove = React.useCallback(() => {
    onRemoveItem(index);
  }, [index, onRemoveItem]);

  const onInsert = React.useCallback(() => {
    onInsertItem(index);
  }, [index, onInsertItem]);

  return (
    <Field>
      <label htmlFor={name}>
        {label}
        {"required" in child && child.required && " *"}
      </label>
      <FieldListItem>
        <FieldListInput>
          <FieldContext.Provider value={{ onBlur: onBlurInner }}>
            <InputRenderer {...child} name={name} onChangeValue={onChangeValue} />
          </FieldContext.Provider>
        </FieldListInput>
        <FieldListRemoveButton disabled={!canRemove} onClick={onRemove} />
        <FieldListAddButton disabled={!canInsert} onClick={onInsert} />
      </FieldListItem>
      <ValidationError
        content={
          isSubmitted
            ? errorMessage || listErrorMessage
            : isTouched
              ? errorMessage
              : isListTouched
                ? listErrorMessage
                : ""
        }
      />
    </Field>
  );
});
