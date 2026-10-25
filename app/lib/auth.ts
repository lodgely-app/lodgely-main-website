export function getAccountAppUrl(): string {
  return process.env.NEXT_PUBLIC_ACCOUNT_APP_URL || 'http://localhost:5179';
}

export function getSignInUrl(appId?: string): string {
  if (!appId || appId === 'marketing') {
    return `${getAccountAppUrl()}/login`;
  }
  const resolvedApp = appId === 'owner' ? 'landlord' : appId;
  return `${getAccountAppUrl()}/login?app=${resolvedApp}`;
}

export function getSignUpUrl(appId?: string): string {
  if (!appId || appId === 'marketing') {
    return `${getAccountAppUrl()}/register`;
  }
  const resolvedApp = appId === 'owner' ? 'landlord' : appId;
  return `${getAccountAppUrl()}/register?app=${resolvedApp}`;
}

// Matches facility-web's redirectToLogin() pattern — every migrated product
// page routes its CTAs through account-portal-web rather than a local form.
export function redirectToLogin(appId?: string): void {
  window.location.href = getSignInUrl(appId);
}

