import type { CreateFormOptions } from "dfrm-schema";
import type { Meta, SchemaTreeNodeData } from "../../../model";
import type { Node } from "../../../utils/tree";
import type { ComponentMap, TagMap } from "../../inspector";
import { convertNode } from "./convertNode";

const messages = {
  now: { en: "Now" },
  select: { en: "Please select..." },
  search: { en: "Search" },
  noOptions: { en: "No options" },
  append: { en: "Append" },
};

const errorMessages = {
  Required: { en: "This value is required." },
  MinLength: { en: "The min length is {minLength}." },
  MaxLength: { en: "The max length is {maxLength}." },
  Pattern: { en: "Must match pattern." },
  InvalidFormat: { en: "Must match format." },
  Precision: { en: "The max number of decimal places is {precision}." },
  MultipleOf: { en: "Must be a multiple of {multipleOf}." },
  Min: { en: "The min is {min}." },
  Max: { en: "The max is {max}." },
  MinExclusive: { en: "The min is >{minExclusive}." },
  MaxExclusive: { en: "The max is <{maxExclusive}." },
};

export function createPreview(
  tagMap: TagMap,
  componentMap: ComponentMap,
  schemaTreeRoot: Node<SchemaTreeNodeData>,
): CreateFormOptions<Meta> {
  const options = convertNode(tagMap, componentMap, schemaTreeRoot);
  if (options === null) {
    throw new Error();
  }
  return {
    ...options,
    messages,
    errorMessages,
  } as CreateFormOptions<Meta>;
}
