export const getApiUrl = (): string => {
  const raw = process.env.NEXT_PUBLIC_API_URL ?? "";
  return raw.trim().replace(/\/$/, "");
};

export const authFetch = (
  path: string,
  init: RequestInit = {},
): Promise<Response> => {
  const headers = new Headers(init.headers);

  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  const baseUrl = getApiUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return fetch(`${baseUrl}${normalizedPath}`, {
    ...init,
    headers,
    credentials: "include",
  });
};

export const publicFetch = (
  path: string,
  init: RequestInit = {},
): Promise<Response> => {
  const baseUrl = getApiUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return fetch(`${baseUrl}${normalizedPath}`, {
    ...init,
    credentials: "include",
  });
};
