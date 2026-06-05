export type SendMailprexFieldValue = string | number | boolean;

export type SendMailprexOptions = {
  url: string;
  formToken: string;
  webName: string;
  emailDestiny: string;
  fields: Record<string, SendMailprexFieldValue>;
  captchaToken?: string;
  fetchImpl?: typeof fetch;
};

export type SendMailprexResult = {
  ok: boolean;
  status: number;
  data?: unknown;
  error?: string;
};

const DEFAULT_FIELDS = [
  "fullname",
  "email",
  "message",
  "phone",
  "service",
] as const;

export async function sendMailprex(
  options: SendMailprexOptions
): Promise<SendMailprexResult> {
  const fetchFn = options.fetchImpl ?? fetch;
  const payload = {
    ...options.fields,
    webName: options.webName,
    emailDestiny: options.emailDestiny,
    formToken: options.formToken,
    ...(options.captchaToken ? { captchaToken: options.captchaToken } : {}),
  };

  try {
    const response = await fetchFn(options.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: unknown = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const message =
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof (data as { message: unknown }).message === "string"
          ? (data as { message: string }).message
          : `Request failed with status ${response.status}`;

      return { ok: false, status: response.status, data, error: message };
    }

    return { ok: true, status: response.status, data };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

export const defaultMailprexFields = DEFAULT_FIELDS;

export type DefaultFormData = {
  fullname: string;
  email: string;
  message: string;
  phone: string;
  service: string;
};

export function createDefaultFormData(): DefaultFormData {
  return {
    fullname: "",
    email: "",
    message: "",
    phone: "",
    service: "",
  };
}
