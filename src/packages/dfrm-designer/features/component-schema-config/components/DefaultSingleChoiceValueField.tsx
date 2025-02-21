import React from "react";
import { Dropdown, Field, ValidationError } from "../../../../dfrm-components";
import {
  type SchemaTreeButtonGroupNodeData,
  type SchemaTreeDropdownNodeData,
  type SchemaTreeOptionNodeData,
  type SchemaTreeRadioGroupNodeData,
  type SchemaTreeSliderNodeData,
  useDispatch,
  useIntlState,
  useTagTreeState,
} from "../../../model";
import { type Node, findNodeById } from "../../../utils/tree";

interface DefaultSingleChoiceValueFieldProps {
  path: string[];
  node: Node<
    | SchemaTreeDropdownNodeData
    | SchemaTreeButtonGroupNodeData
    | SchemaTreeSliderNodeData
    | SchemaTreeRadioGroupNodeData,
    SchemaTreeOptionNodeData
  >;
}

export const DefaultSingleChoiceValueField: React.FunctionComponent<DefaultSingleChoiceValueFieldProps> =
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

    React.useEffect(() => {
      if (defaultValue === "" || node.children.some((child) => child.id === defaultValue)) {
        return;
      }
      dispatch({
        type: "component-schema-tree__replace",
        payload: {
          path,
          node: {
            ...node,
            data: { ...data, defaultValue: "" },
          },
        },
      });
    }, [dispatch, path, node, data, defaultValue]);

    return (
      <Field>
        <label htmlFor="defaultValue">Default value</label>
        <Dropdown
          name="defaultValue"
          options={options}
          value={defaultValue}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  });
