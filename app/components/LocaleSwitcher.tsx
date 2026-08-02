"use client";

import { localeCookieName, localePathname, type Locale } from "../i18n/locales";
import { sharedUi } from "../i18n/ui";

type LocaleSwitcherProps = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const copy = sharedUi[locale].language;

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;

    document.cookie = `${localeCookieName}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    const nextPath = localePathname(window.location.pathname, nextLocale);
    window.location.assign(`${nextPath}${window.location.search}${window.location.hash}`);
  }

  return (
    <label className="locale-switcher" title={copy.label}>
      <span className="sr-only">{copy.label}</span>
      <select
        value={locale}
        aria-label={copy.label}
        onChange={(event) => switchLocale(event.target.value as Locale)}
      >
        <option value="zh">{copy.zh}</option>
        <option value="en">{copy.en}</option>
      </select>
    </label>
  );
}
