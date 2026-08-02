import Image from "next/image";
import type { Locale } from "../i18n/locales";
import { sharedUi } from "../i18n/ui";
import { LocalizedLink } from "./LocalizedLink";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = sharedUi[locale].footer;

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Image
            src="/brand-icon.png"
            alt=""
            width={48}
            height={48}
            className="footer-icon"
            unoptimized
          />
          <div>
            <strong>BEAM Path</strong>
            <p>{copy.tagline}</p>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <span>{copy.continue}</span>
            <LocalizedLink href="/from-scratch/elixir" locale={locale}>
              {copy.elixirBasics}
            </LocalizedLink>
            <LocalizedLink href="/from-scratch/erlang" locale={locale}>
              {copy.erlangBasics}
            </LocalizedLink>
            <LocalizedLink href="/learn/start-line" locale={locale}>
              {copy.startLine}
            </LocalizedLink>
            <LocalizedLink
              href="/learn/processes-and-mailboxes"
              locale={locale}
            >
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
          </div>
          <div>
            <span>{copy.official}</span>
            <a href="https://elixir-lang.org/" target="_blank" rel="noreferrer">
              Elixir
            </a>
            <a href="https://www.erlang.org/" target="_blank" rel="noreferrer">
              Erlang/OTP
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{copy.closing}</p>
        <a
          href="https://github.com/ViffyGwaanl/kimi-k3-learn"
          target="_blank"
          rel="noreferrer"
        >
          {copy.reference}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </footer>
  );
}
