const BASE_URL = '/api';
const REQUEST_TIMEOUT_MS = 10_000;

export type ApiErrorStatus = 'not_found' | 'error';

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: ApiErrorStatus };

export const get = async <T>(
  path: string,
  options?: RequestInit,
): Promise<ApiResult<T>> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
    });

    if (res.status === 404) return { ok: false, status: 'not_found' };
    if (!res.ok) return { ok: false, status: 'error' };

    const data: T = await res.json();
    return { ok: true, data };
  } catch (error) {
    if (__DEV__) {
      console.error(`[api] GET ${path} failed:`, error);
    }
    return { ok: false, status: 'error' };
  } finally {
    clearTimeout(timeout);
  }
};
