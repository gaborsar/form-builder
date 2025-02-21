import {
  Button,
  Column,
  Dropdown,
  Field,
  Form,
  FormBody,
  FormFooter,
  Input,
  Row,
  ValidationError,
} from "dfrm-components";
import React from "react";
import { type TagTreeNodeData, useDispatch, useIntlState } from "../../../model";
import { createId } from "../../../utils/id";
import type { Node } from "../../../utils/tree";
import { useTagGroupOptions } from "../../tag-tree";

interface CreateTagFormProps {
  value: string;
  onCancel(): unknown;
  onSuccess(id: string): unknown;
}

export const CreateTagForm: React.FunctionComponent<CreateTagFormProps> = React.memo(
  ({ value, onCancel, onSuccess }) => {
    const { locale } = useIntlState();
    const dispatch = useDispatch();

    const groupOptions = useTagGroupOptions();

    const [group, setGroup] = React.useState("");
    const [name, setName] = React.useState("");
    const [label, setLabel] = React.useState<{ [locale: string]: string }>({});

    React.useEffect(() => {
      let words = value.split(" ");
      if (words.length === 0) {
        words = value.split("|");
      }
      if (words.length === 2) {
        const word = words[0].toLowerCase();
        const group = groupOptions.find((group) => group.label.toLowerCase() === word);
        if (group === undefined) {
          setName(value);
        } else {
          setGroup(group.value);
          setName(words[1]);
        }
      } else {
        setName(value);
      }
    }, [groupOptions, value]);

    const onChangeLabel = React.useCallback(
      (value: string) => {
        setLabel((label) => ({ ...label, [locale]: value }));
      },
      [locale],
    );

    const onCreate = React.useCallback(() => {
      const node: Node<TagTreeNodeData> = {
        id: createId(),
        visible: true,
        collapsible: false,
        collapsed: false,
        data: {
          type: "Leaf",
          name,
          label,
          relations: [],
        },
        children: [],
      };
      dispatch({
        type: "tag-tree__append",
        payload: { path: [group], node },
      });
      onSuccess(node.id);
    }, [dispatch, group, name, label, onSuccess]);

    return (
      <Form>
        <FormBody>
          <Row>
            <Column width={12}>
              <Field>
                <label htmlFor="group">Group</label>
                <Dropdown
                  name="group"
                  options={groupOptions}
                  value={group}
                  onChangeValue={setGroup}
                />
                <ValidationError />
              </Field>
            </Column>
          </Row>
          <Row>
            <Column width={12}>
              <Field>
                <label htmlFor="name">Name</label>
                <Input type="text" name="name" value={name} onChangeValue={setName} />
                <ValidationError />
              </Field>
            </Column>
          </Row>
          <Row>
            <Column width={12}>
              <Field>
                <label htmlFor="label">Label</label>
                <Input
                  type="text"
                  name="label"
                  value={label[locale] || ""}
                  helper={locale}
                  onChangeValue={onChangeLabel}
                />
                <ValidationError />
              </Field>
            </Column>
          </Row>
        </FormBody>
        <FormFooter>
          <Button onClick={onCancel}>Cancel</Button>
          <Button disabled={group === "" || name === ""} onClick={onCreate}>
            Save
          </Button>
        </FormFooter>
      </Form>
    );
  },
);
