import React from "react";
import type { FormSchema, RenderFormResult } from "../../dfrm-schema";

interface UseFormSchemaResult<Meta> {
  renderResult: RenderFormResult<Meta> | null;
  onChangeValue(value: unknown): void;
}

export function useFormSchema<Meta>(
  schema: FormSchema<Meta>,
  initialValue: unknown,
  locale: string,
): UseFormSchemaResult<Meta> {
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const [renderResult, setRenderResult] = React.useState<RenderFormResult<Meta> | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    (async (signal: AbortSignal) => {
      const root = await schema.render({ locale, value: initialValue });
      if (!signal.aborted) {
        setRenderResult(root);
      }
    })(controller.signal);
  }, [schema, initialValue, locale]);

  const onChangeValue = React.useCallback(
    (value: unknown) => {
      const controller = new AbortController();
      abortControllerRef.current = controller;
      (async (value: unknown, signal: AbortSignal) => {
        const root = await schema.render({ locale, value });
        if (!signal.aborted) {
          setRenderResult(root);
        }
      })(value, controller.signal);
    },
    [schema, locale],
  );

  React.useEffect(
    () => () => {
      const { current: controller } = abortControllerRef;
      if (controller !== null) {
        controller.abort();
      }
    },
    [],
  );

  return { renderResult, onChangeValue };
}
