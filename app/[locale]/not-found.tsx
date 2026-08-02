"use client";

import { useParams } from "next/navigation";
import { LocalizedLink } from "../components/LocalizedLink";
import { SiteHeader } from "../components/SiteHeader";
import { isLocale } from "../i18n/locales";
import { sharedUi } from "../i18n/ui";

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params.locale) ? params.locale : "en";
  const copy = sharedUi[locale].notFound;

  return (
    <>
      <SiteHeader compact locale={locale} />
      <main className="not-found-page">
        <span>{copy.label}</span>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        <LocalizedLink
          className="button button--dark"
          href="/#beam-roadmap"
          locale={locale}
        >
          {copy.action}
          <span aria-hidden="true">→</span>
        </LocalizedLink>
      </main>
    </>
  );
}
