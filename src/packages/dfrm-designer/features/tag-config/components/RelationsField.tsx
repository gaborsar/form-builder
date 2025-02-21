import { insert, remove, update } from "ramda";
import React from "react";
import { FieldGroupList } from "../../../../dfrm-components";
import {
  type TagTreeLeafNodeData,
  type TagTreeNodeData,
  type TagTreeRelation,
  useDispatch,
} from "../../../model";
import type { Node } from "../../../utils/tree";
import { RelationsFieldItem } from "./RelationsFieldItem";

const emptyRelation: TagTreeRelation = {
  type: null,
  id: "",
};

interface RelationsFieldProps {
  path: string[];
  node: Node<TagTreeLeafNodeData, TagTreeNodeData>;
}

export const RelationsField: React.FunctionComponent<RelationsFieldProps> = React.memo(
  ({ path, node }) => {
    const dispatch = useDispatch();

    const relations = React.useMemo((): TagTreeRelation[] => {
      const { relations } = node.data;
      return relations.length === 0 ? [{ type: null, id: "" }] : relations;
    }, [node]);

    const onRemove = React.useCallback(
      (index: number) => {
        const { data } = node;
        const { relations } = data;
        if (relations.length === 2 && relations.every(isRelationEmpty)) {
          dispatch({
            type: "tag-tree__replace",
            payload: {
              path,
              node: {
                ...node,
                data: { ...data, relations: [] },
              },
            },
          });
        } else {
          dispatch({
            type: "tag-tree__replace",
            payload: {
              path,
              node: {
                ...node,
                data: {
                  ...data,
                  relations: remove(index, 1, relations),
                },
              },
            },
          });
        }
      },
      [dispatch, path, node],
    );

    const onInsert = React.useCallback(
      (index: number) => {
        const { data } = node;
        const { relations } = data;
        if (relations.length === 0) {
          dispatch({
            type: "tag-tree__replace",
            payload: {
              path,
              node: {
                ...node,
                data: {
                  ...data,
                  relations: [emptyRelation, emptyRelation],
                },
              },
            },
          });
        } else {
          dispatch({
            type: "tag-tree__replace",
            payload: {
              path,
              node: {
                ...node,
                data: {
                  ...data,
                  relations: insert(index + 1, emptyRelation, relations),
                },
              },
            },
          });
        }
      },
      [dispatch, path, node],
    );

    const onUpdate = React.useCallback(
      (index: number, relation: TagTreeRelation) => {
        dispatch({
          type: "tag-tree__replace",
          payload: {
            path,
            node: {
              ...node,
              data: {
                ...node.data,
                relations:
                  node.data.relations.length === 0
                    ? [relation]
                    : update(index, relation, node.data.relations),
              },
            },
          },
        });
      },
      [dispatch, path, node],
    );

    return (
      <FieldGroupList>
        {relations.map((relation, index) => (
          <RelationsFieldItem
            key={index}
            index={index}
            relation={relation}
            onRemove={onRemove}
            onInsert={onInsert}
            onUpdate={onUpdate}
            canRemove={relations.length !== 1}
          />
        ))}
      </FieldGroupList>
    );
  },
);

function isRelationEmpty(relation: TagTreeRelation): boolean {
  return relation.type === null && relation.id === "";
}
