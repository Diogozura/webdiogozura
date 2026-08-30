export type ConsentValue = 'accepted' | 'rejected';

const STORAGE_KEY = 'dz-cookie-consent';
export const CONSENT_EVENT = 'dz-cookie-consent-change';

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === 'accepted' || value === 'rejected' ? value : null;
}

export function setStoredConsent(value: ConsentValue): void {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
