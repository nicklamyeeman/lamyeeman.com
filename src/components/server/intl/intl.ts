"server-only";

import { Locales } from "@/types/intl";
import { createIntl } from "@formatjs/intl";

export default async function getIntl(locale: Locales) {
  return createIntl({
    locale: locale,
    messages: await import(`src/locales/${locale}.json`),
  });
}
