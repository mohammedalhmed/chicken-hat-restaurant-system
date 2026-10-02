import { QueryClient, type QueryFunctionContext } from "@tanstack/react-query";

const ADMIN_TOKEN_KEY = "chicken-hat-admin-token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  }
}

export function clearAdminToken(): void {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  }
}

function buildHeaders(headers?: HeadersInit): Headers {
  const result = new Headers(headers);
  const adminToken = getAdminToken();

  if (adminToken) {
    result.set("Authorization", `Bearer ${adminToken}`);
  }

  return result;
}

async function defaultQueryFn({ queryKey }: QueryFunctionContext) {
  const url = String(queryKey[0]);
  const response = await fetch(url, { headers: buildHeaders() });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown,
  options: RequestInit = {},
) {
  const headers = buildHeaders(options.headers);

  if (data !== undefined && !(data instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    method,
    headers,
    body:
      data === undefined
        ? options.body
        : data instanceof FormData
          ? data
          : JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  return contentType.includes("application/json") ? response.json() : response.text();
}

export default queryClient;
