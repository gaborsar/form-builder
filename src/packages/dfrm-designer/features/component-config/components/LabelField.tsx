import { Field, Input, ValidationError } from "dfrm-components";
import React from "react";
import { type ComponentTreeNodeData, useDispatch, useIntlState } from "../../../model";
import type { Node } from "../../../utils/tree";

interface LabelFieldProps {
  path: string[];
  node: Node<ComponentTreeNodeData>;
}

export const LabelField: React.FunctionComponent<LabelFieldProps> = React.memo(({ path, node }) => {
  const { locale } = useIntlState();
  const dispatch = useDispatch();

  const {
    data: {
      label: { [locale]: value } = {},
    },
  } = node;

  const onChangeValue = React.useCallback(
    (value: string) => {
      const { data } = node;
      const { label } = data;
      dispatch({
        type: "component-tree__replace",
        payload: {
          path,
          node: {
            ...node,
            data: {
              ...data,
              label: { ...label, [locale]: value },
            },
          },
        },
      });
    },
    [dispatch, path, node, locale],
  );

  return (
    <Field>
      <label htmlFor="label">Label</label>
      <Input type="text" name="label" value={value} helper={locale} onChangeValue={onChangeValue} />
      <ValidationError />
    </Field>
  );
});
