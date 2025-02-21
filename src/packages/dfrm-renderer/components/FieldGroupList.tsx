import { assoc, dissoc, insert, remove, update } from "ramda";
import React from "react";
import {
  Button,
  Field,
  FieldGroupList,
  FieldGroupListAddButton,
  FieldGroupListItem,
  FieldGroupListItemBody,
  FieldGroupListItemFooter,
  FieldGroupListRemoveButton,
  ValidationError,
} from "../../dfrm-components";
import type { RenderFieldGroupListItemResult, RenderFieldGroupListResult } from "../../dfrm-schema";
import { FieldContext } from "../contexts/FieldContext";
import { FormContext } from "../contexts/FormContext";
import { useKeys } from "../hooks/useKeys";
import { RowRenderer } from "./Row";

interface FieldGroupListRendererProps<Meta> extends Omit<RenderFieldGroupListResult<Meta>, "key"> {
  keyProp: string;
  onChangeProperty(key: string, value: unknown): unknown;
}

export const FieldGroupListRenderer = React.memo(function FieldGroupListRenderer<Meta>({
  minLength = 0,
  maxLength = Number.POSITIVE_INFINITY,
  keyProp: key,
  emptyLabel,
  appendMessage,
  value: unsafeValue,
  errors = [],
  children = [],
  onChangeProperty,
}: FieldGroupListRendererProps<Meta>): React.ReactElement {
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
      onChangeValue(insert(index + 1, {}, value));
    },
    [insertKey, onChangeValue, value],
  );

  const onInsertFirstItem = React.useCallback(() => {
    onInsertItem(0);
  }, [onInsertItem]);

  return (
    <FieldGroupList>
      <FieldContext.Provider value={{ onBlur: onBlurInner }}>
        {children.length === 0 ? (
          <>
            <Field>
              <label>{emptyLabel}</label>
              <Button onClick={onInsertFirstItem}>{appendMessage}</Button>
            </Field>
          </>
        ) : (
          children.map((child, i) => (
            <ItemRenderer
              {...child}
              key={keys[i] || `${i}`}
              canRemove={canRemove}
              canInsert={canInsert}
              isListTouched={isTouched && i === children.length - 1}
              listErrorMessage={i === children.length - 1 ? errorMessage : ""}
              value={value[i] as { [key: string]: unknown }}
              onChangeItem={onChangeItem}
              onRemoveItem={onRemoveItem}
              onInsertItem={onInsertItem}
            />
          ))
        )}
      </FieldContext.Provider>
    </FieldGroupList>
  );
});

interface ItemRendererProps<Meta> extends RenderFieldGroupListItemResult<Meta> {
  canRemove: boolean;
  canInsert: boolean;
  isListTouched: boolean;
  listErrorMessage: string;
  value: { [key: string]: unknown } | undefined;
  onChangeItem(index: number, value: unknown): unknown;
  onRemoveItem(index: number): unknown;
  onInsertItem(index: number): unknown;
}

const ItemRenderer = React.memo(function ItemRenderer<Meta>({
  index,
  label,
  canRemove,
  canInsert,
  isListTouched,
  listErrorMessage,
  value = {},
  children = [],
  onChangeItem,
  onRemoveItem,
  onInsertItem,
}: ItemRendererProps<Meta>): React.ReactElement {
  const { isSubmitted } = React.useContext(FormContext);

  const onChangeValue = React.useCallback(
    (value: unknown) => {
      onChangeItem(index, value);
    },
    [index, onChangeItem],
  );

  const onChangeProperty = React.useCallback(
    (key: string, property: unknown) => {
      if (property === undefined) {
        onChangeValue(dissoc(key, value));
      } else {
        onChangeValue(assoc(key, property, value));
      }
    },
    [onChangeValue, value],
  );

  const onRemove = React.useCallback(() => {
    onRemoveItem(index);
  }, [index, onRemoveItem]);

  const onInsert = React.useCallback(() => {
    onInsertItem(index);
  }, [index, onInsertItem]);

  return (
    <Field>
      <label>{label}</label>
      <FieldGroupListItem>
        <FieldGroupListItemBody>
          {children.map((child, i) => (
            <RowRenderer {...child} key={i} onChangeProperty={onChangeProperty} />
          ))}
        </FieldGroupListItemBody>
        <FieldGroupListItemFooter>
          <FieldGroupListRemoveButton disabled={!canRemove} onClick={onRemove} />
          <FieldGroupListAddButton disabled={!canInsert} onClick={onInsert} />
        </FieldGroupListItemFooter>
      </FieldGroupListItem>
      <ValidationError content={isSubmitted || isListTouched ? listErrorMessage : ""} />
    </Field>
  );
});
