import {
  Column,
  Field,
  FieldGroupList,
  FieldGroupListAddButton,
  FieldGroupListItem,
  FieldGroupListItemBody,
  FieldGroupListItemFooter,
  FieldGroupListRemoveButton,
  Row,
  ValidationError,
} from "dfrm-components";
import React from "react";
import type { TagTreeRelation } from "../../../model";
import { RelationIdField } from "./RelationIdField";
import { RelationTypeField } from "./RelationTypeField";

interface RelationsFieldItemProps {
  index: number;
  relation: TagTreeRelation;
  canRemove?: boolean;
  onRemove(index: number): unknown;
  onInsert(index: number): unknown;
  onUpdate(index: number, relation: TagTreeRelation): unknown;
}

export const RelationsFieldItem: React.FunctionComponent<RelationsFieldItemProps> = React.memo(
  ({ index, relation, canRemove, onRemove, onInsert, onUpdate }) => {
    const onClickRemove = React.useCallback(() => {
      onRemove(index);
    }, [onRemove, index]);

    const onClickInsert = React.useCallback(() => {
      onInsert(index);
    }, [onInsert, index]);

    return (
      <FieldGroupList>
        <Field key={index}>
          <label>{index + 1}. Related Tag</label>
          <FieldGroupListItem>
            <FieldGroupListItemBody>
              <Row>
                <Column width={12}>
                  <RelationTypeField index={index} relation={relation} onUpdate={onUpdate} />
                </Column>
              </Row>
              <Row>
                <Column width={12}>
                  <RelationIdField index={index} relation={relation} onUpdate={onUpdate} />
                </Column>
              </Row>
            </FieldGroupListItemBody>
            <FieldGroupListItemFooter>
              <FieldGroupListRemoveButton disabled={!canRemove} onClick={onClickRemove} />
              <FieldGroupListAddButton onClick={onClickInsert} />
            </FieldGroupListItemFooter>
          </FieldGroupListItem>
          <ValidationError />
        </Field>
      </FieldGroupList>
    );
  },
);
