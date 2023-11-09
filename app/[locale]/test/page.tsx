"use client";

import { Locales } from "@/types/intl";
import { useIntl } from "react-intl";

export default async function Page({
  params,
}: {
  params: { locale: Locales };
}) {
  const { formatMessage } = useIntl();

  return (
    <div className="text-2xl font-bold">{formatMessage({ id: "test2" })}</div>
  );
}
