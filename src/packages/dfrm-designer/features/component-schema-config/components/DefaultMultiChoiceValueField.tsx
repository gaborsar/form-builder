import React from "react";
import { Field, MultiSelect, ValidationError } from "../../../../dfrm-components";
import {
  type SchemaTreeCheckboxGroupNodeData,
  type SchemaTreeMultiSelectNodeData,
  type SchemaTreeOptionNodeData,
  type SchemaTreeSwitchGroupNodeData,
  useDispatch,
  useIntlState,
  useTagTreeState,
} from "../../../model";
import { type Node, findNodeById } from "../../../utils/tree";

interface DefaultMultiChoiceValueFieldProps {
  path: string[];
  node: Node<
    SchemaTreeMultiSelectNodeData | SchemaTreeCheckboxGroupNodeData | SchemaTreeSwitchGroupNodeData,
    SchemaTreeOptionNodeData
  >;
}

export const DefaultMultiChoiceValueField: React.FunctionComponent<DefaultMultiChoiceValueFieldProps> =
  React.memo(({ path, node }) => {
    const { locale } = useIntlState();
    const { root: tagTreeRoot } = useTagTreeState();
    const dispatch = useDispatch();

    const { data } = node;
    const { defaultValue } = data;

    // TODO extract
    const options = React.useMemo(
      () =>
        node.children.map((child, i) => {
          if (child.data.type !== "Option") {
            throw new Error();
          }
          let label = `${i + 1}. Option`;
          if (child.data.id !== undefined) {
            const tag = findNodeById(tagTreeRoot, child.data.id || "");
            if (tag.data.type !== "Leaf") {
              throw new Error();
            }
            const tagLabel = tag.data.label[locale] || "";
            if (tagLabel !== "") {
              label = tagLabel;
            }
            const nodeLabel = child.data.label[locale] || "";
            if (nodeLabel !== "") {
              label = nodeLabel;
            }
          }
          return { label, value: child.id };
        }),
      [tagTreeRoot, node, locale],
    );

    const onChangeValue = React.useCallback(
      (value: string[]) => {
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

    React.useEffect(() => {
      if (defaultValue.length === 0) {
        return;
      }
      const nextDefaultValue = defaultValue.filter((value) =>
        node.children.some((child) => child.id === value),
      );
      if (nextDefaultValue.length === defaultValue.length) {
        return;
      }
      dispatch({
        type: "component-schema-tree__replace",
        payload: {
          path,
          node: {
            ...node,
            data: { ...data, defaultValue: nextDefaultValue },
          },
        },
      });
    }, [dispatch, path, node, data, defaultValue]);

    return (
      <Field>
        <label htmlFor="defaultValue">Default value</label>
        <MultiSelect
          name="defaultValue"
          options={options}
          value={defaultValue || []}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  });
