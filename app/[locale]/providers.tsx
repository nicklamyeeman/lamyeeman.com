"use client";

import React from "react";
import { IntlProvider } from "react-intl";

import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import { Locales } from "@/types/intl";

const localesMessages = {
  fr,
  en
}

export function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locales;
}) {
  return (
    <IntlProvider locale={locale} messages={localesMessages[locale]}>
      {children}
    </IntlProvider>
  );
}
