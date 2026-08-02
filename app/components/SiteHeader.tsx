import Image from "next/image";
import type { Locale } from "../i18n/locales";
import { sharedUi } from "../i18n/ui";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";
import { ThemeSwitcher } from "./ThemeSwitcher";

type SiteHeaderProps = {
  compact?: boolean;
  locale: Locale;
};

export function SiteHeader({ compact = false, locale }: SiteHeaderProps) {
  const copy = sharedUi[locale].header;

  return (
    <header className={`site-header${compact ? " site-header--compact" : ""}`}>
      <div className="header-inner">
        <LocalizedLink
          className="brand"
          href="/"
          locale={locale}
          aria-label={copy.homeLabel}
        >
          <Image
            className="brand-icon"
            src="/brand-icon.png"
            alt=""
            width={42}
            height={42}
            priority
            unoptimized
          />
          <span className="brand-copy">
            <strong>BEAM Path</strong>
            <small>Erlang + Elixir</small>
          </span>
        </LocalizedLink>

        <nav className="main-nav" aria-label={copy.navLabel}>
          <LocalizedLink href="/from-scratch" locale={locale}>
            {copy.basics}
          </LocalizedLink>
          <LocalizedLink href="/#beam-roadmap" locale={locale}>
            {copy.mainline}
          </LocalizedLink>
          <LocalizedLink href="/#lab" locale={locale}>
            {copy.messageLab}
          </LocalizedLink>
          <LocalizedLink href="/playground" locale={locale}>
            {copy.playground}
          </LocalizedLink>
          <LocalizedLink href="/keywords" locale={locale}>
            {copy.keywords}
          </LocalizedLink>
          <LocalizedLink href="/resources" locale={locale}>
            {copy.resources}
          </LocalizedLink>
        </nav>

        <div className="header-utilities">
          <LocaleSwitcher locale={locale} />
          <ThemeSwitcher locale={locale} />
        </div>

        <LocalizedLink
          className="header-cta"
          href="/from-scratch"
          locale={locale}
        >
          {copy.start}
          <span aria-hidden="true">→</span>
        </LocalizedLink>
      </div>
    </header>
  );
}
