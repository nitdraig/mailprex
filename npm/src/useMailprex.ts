import { useState } from "react";
import { createDefaultFormData, DefaultFormData, sendMailprex } from "./core";

type FormData = DefaultFormData;

type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type UseMailprexProps = {
  url: string;
  webName: string;
  emailDestiny: string;
  formToken: string;
  captchaToken?: string;
};

/** @deprecated Use `useMailprexForm` for custom fields or keep this for v1 compatibility */
const useMailprex = ({
  url,
  webName,
  emailDestiny,
  formToken,
  captchaToken,
}: UseMailprexProps) => {
  const [formData, setFormData] = useState<FormData>(createDefaultFormData());

  const [response, setResponse] = useState<ApiResponse<unknown>>({
    data: null,
    loading: false,
    error: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse({ data: null, loading: true, error: null });

    const result = await sendMailprex({
      url,
      webName,
      emailDestiny,
      formToken,
      fields: formData,
      captchaToken,
    });

    setResponse({
      data: result.ok ? result.data : null,
      loading: false,
      error: result.ok ? null : result.error ?? "Request failed",
    });
  };

  return { formData, handleChange, handleSubmit, response };
};

export default useMailprex;
