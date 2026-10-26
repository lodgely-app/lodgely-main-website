// api-gateway's csrf.middleware.ts requires every state-changing request
// (anything but GET/HEAD/OPTIONS) made with an active session to echo the
// `lodgely_csrf` cookie back as an `x-csrf-token` header — a double-submit
// check. The cookie is deliberately not httpOnly (see identity-service's
// setCsrfCookie()) specifically so this read is possible. Same pattern as
// facility-web/developer-web/account-portal-web's own csrf helpers.
const CSRF_COOKIE_NAME = 'lodgely_csrf';

export function getCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CSRF_COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

/** Adds the CSRF header for any method other than GET/HEAD/OPTIONS, when the cookie is present (no session yet means nothing to protect). */
export function withCsrfHeader(method: string | undefined, headers: Record<string, string> = {}): Record<string, string> {
  const normalized = (method ?? 'GET').toUpperCase();
  if (normalized === 'GET' || normalized === 'HEAD' || normalized === 'OPTIONS') return headers;

  const token = getCsrfToken();
  return token ? { ...headers, 'x-csrf-token': token } : headers;
}
