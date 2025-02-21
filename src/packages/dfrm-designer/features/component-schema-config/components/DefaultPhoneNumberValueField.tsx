import React from "react";
import { Field, PhoneNumber, ValidationError } from "../../../../dfrm-components";
import {
  type ComponentSchemaTreeNodeData,
  type SchemaTreePhoneNumberNodeData,
  useDispatch,
  useIntlState,
} from "../../../model";
import type { Node } from "../../../utils/tree";

interface DefaultPhoneNumberValueFieldProps {
  path: string[];
  node: Node<SchemaTreePhoneNumberNodeData, ComponentSchemaTreeNodeData>;
}

export const DefaultPhoneNumberValueField: React.FunctionComponent<DefaultPhoneNumberValueFieldProps> =
  React.memo(({ path, node }) => {
    const { locale } = useIntlState();
    const dispatch = useDispatch();

    const { data } = node;
    const { defaultValue } = data;

    const onChangeValue = React.useCallback(
      (value: string) => {
        dispatch({
          type: "component-schema-tree__replace",
          payload: {
            path,
            node: {
              ...node,
              data: { ...data, defaultValue: value },
            },
          },
        });
      },
      [dispatch, path, node, data],
    );

    return (
      <Field>
        <label htmlFor="defaultValue">Default value</label>
        <PhoneNumber
          locale={locale}
          name="defaultValue"
          value={defaultValue}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  });
