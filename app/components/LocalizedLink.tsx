import Link from "next/link";
import type { ComponentProps } from "react";
import { localizeHref, type Locale } from "../i18n/locales";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  locale: Locale;
};

export function LocalizedLink({
  href,
  locale,
  ...props
}: LocalizedLinkProps) {
  return <Link href={localizeHref(locale, href)} {...props} />;
}
