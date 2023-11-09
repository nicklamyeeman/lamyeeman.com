import getIntl from "@/components/server/intl/intl";
import { Locales } from "@/types/intl";

export default async function Page({
  params,
}: {
  params: { locale: Locales };
}) {
  const { formatMessage } = await getIntl(params.locale);
  return (
    <div className="text-2xl font-bold">{formatMessage({ id: "test" })}</div>
  );
}
