import React from "react";
import { Button, Form, FormBody, FormFooter } from "../../../../dfrm-components";
import { FormRenderer, useFormSchema } from "../../../../dfrm-renderer";
import {
  type FormSchema,
  createSchema,
  flattenFormResult,
  optimizeValue,
} from "../../../../dfrm-schema";
import { type Meta, useDispatch, useFormSchemaTreeStateByPath, useIntlState } from "../../../model";
import { useComponentMap, useTagMap } from "../../inspector";
import { createPreview } from "../utils/createPreview";
import { mapMetaToLogDetails } from "../utils/mapMetaToLogDetails";

const initialValue: { [key: string]: unknown } = {};

interface FormPreviewRendererProps {
  path: string[];
}

export const FormPreviewRenderer: React.FunctionComponent<FormPreviewRendererProps> = React.memo(
  ({ path }) => {
    const { locale } = useIntlState();
    const { root: schemaTreeRoot } = useFormSchemaTreeStateByPath(path);

    const dispatch = useDispatch();

    const tagMap = useTagMap();
    const componentMap = useComponentMap();

    const [isSubmitted, setSubmitted] = React.useState(false);

    const schema = React.useMemo(
      () => createSchema(createPreview(tagMap, componentMap, schemaTreeRoot)) as FormSchema<Meta>,
      [tagMap, componentMap, schemaTreeRoot],
    );

    const { renderResult, onChangeValue } = useFormSchema(schema, initialValue, locale);

    const onSubmit = React.useCallback(() => {
      setSubmitted(true);
    }, []);

    React.useEffect(() => {
      if (renderResult === null) {
        return;
      }
      const optimizedValue = optimizeValue(renderResult.value);
      const flatResult = flattenFormResult(renderResult, mapMetaToLogDetails);
      dispatch({
        type: "form-tree__update-preview-state",
        payload: {
          path,
          previewState: {
            optimizedValue,
            renderResult,
            flatResult,
          },
        },
      });
    }, [dispatch, path, renderResult]);

    if (renderResult === null) {
      return null;
    }

    if (renderResult.children === undefined || renderResult.children.length === 0) {
      return null;
    }

    return (
      <Form>
        <FormBody>
          <FormRenderer {...renderResult} isSubmitted={isSubmitted} onChangeValue={onChangeValue} />
        </FormBody>
        <FormFooter>
          <Button onClick={onSubmit}>Save</Button>
        </FormFooter>
      </Form>
    );
  },
);
