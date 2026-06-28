import { defaultLocale, isLocale, localeLabels, locales, type Locale } from './config';
import { ui } from './ui';

export function getLocaleFromPathname(pathname: string): Locale {
  const [, maybeLocale] = pathname.split('/');

  return isLocale(maybeLocale) ? maybeLocale : defaultLocale;
}

export function useTranslations(locale: Locale) {
  return ui[locale];
}

export function getLocalizedPath(locale: Locale, path = '') {
  const normalizedPath = path.replace(/^\//, '').replace(/\/$/, '');
  const suffix = normalizedPath ? `/${normalizedPath}/` : '/';

  if (locale === defaultLocale) {
    return suffix;
  }

  return `/${locale}${suffix}`;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locales.find((candidate) => candidate !== locale) ?? defaultLocale;
}

export function getLanguageOptions(currentLocale: Locale, path = '') {
  return locales.map((locale) => ({
    locale,
    label: localeLabels[locale],
    href: getLocalizedPath(locale, path),
    current: locale === currentLocale,
  }));
}
