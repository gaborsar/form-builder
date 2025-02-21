import React from "react";
import { Dropdown, Field, ValidationError } from "../../../../dfrm-components";
import { type TagTreeRelation, TagTreeRelationType } from "../../../model";

const relationTypeOptions = [
  {
    value: TagTreeRelationType.Synonym,
    label: "synonym",
  },
];

interface RelationTypeFieldProps {
  index: number;
  relation: TagTreeRelation;
  onUpdate(index: number, relation: TagTreeRelation): unknown;
}

export const RelationTypeField: React.FunctionComponent<RelationTypeFieldProps> = React.memo(
  ({ index, relation, onUpdate }) => {
    const { type: value } = relation;

    const onChangeValue = React.useCallback(
      (value: string) => {
        onUpdate(index, {
          ...relation,
          type: value === "" ? null : (value as TagTreeRelationType),
        });
      },
      [onUpdate, index, relation],
    );

    return (
      <Field>
        <label htmlFor="type">Type</label>
        <Dropdown
          name="type"
          options={relationTypeOptions}
          value={value || ""}
          onChangeValue={onChangeValue}
        />
        <ValidationError />
      </Field>
    );
  },
);
