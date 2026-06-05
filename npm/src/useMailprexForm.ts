import { useCallback, useMemo, useState } from "react";
import { sendMailprex, SendMailprexResult } from "./core";

type ApiResponse = {
  data: SendMailprexResult | null;
  loading: boolean;
  error: string | null;
};

export type UseMailprexFormOptions<T extends Record<string, string>> = {
  url: string;
  webName: string;
  emailDestiny: string;
  formToken: string;
  initialFields: T;
  captchaToken?: string;
};

export function useMailprexForm<T extends Record<string, string>>({
  url,
  webName,
  emailDestiny,
  formToken,
  initialFields,
  captchaToken,
}: UseMailprexFormOptions<T>) {
  const [fields, setFields] = useState<T>(initialFields);
  const [response, setResponse] = useState<ApiResponse>({
    data: null,
    loading: false,
    error: null,
  });

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFields((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const setField = useCallback((name: keyof T, value: string) => {
    setFields((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setResponse({ data: null, loading: true, error: null });

      const result = await sendMailprex({
        url,
        webName,
        emailDestiny,
        formToken,
        fields,
        captchaToken,
      });

      setResponse({
        data: result,
        loading: false,
        error: result.ok ? null : result.error ?? "Request failed",
      });

      return result;
    },
    [url, webName, emailDestiny, formToken, fields, captchaToken]
  );

  return useMemo(
    () => ({
      fields,
      setField,
      handleChange,
      handleSubmit,
      response,
    }),
    [fields, setField, handleChange, handleSubmit, response]
  );
}
