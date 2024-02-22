"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { useServerInsertedHTML } from "next/navigation";
import React from "react";
import { IntlProvider } from "react-intl";

import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import { Locales } from "@/types/intl";

const localesMessages = {
  fr,
  en,
};

const theme = createTheme({
  typography: {
    fontFamily: "Segoe UI",
  },
});

const ThemeRegistry = (props: any) => {
  const { options, children } = props;

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: `@layer emotion {${styles}}`,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
};

export function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locales;
}) {
  return (
    <ThemeRegistry options={{ key: "nextmui", prepend: true }}>
      <IntlProvider locale={locale} messages={localesMessages[locale]}>
        <SessionProvider>{children}</SessionProvider>
      </IntlProvider>
    </ThemeRegistry>
  );
}
