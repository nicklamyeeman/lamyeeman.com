import { HomePage } from "@/components/pages/home/home_page";
import { Locales } from "@/types/intl";

export default async function Page({
  params,
}: {
  params: { locale: Locales };
}) {
  return (
    <div className="text-2xl font-bold">
      <HomePage locale={params.locale} />
    </div>
  );
}
