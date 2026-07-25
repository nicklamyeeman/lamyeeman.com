import { LotoquinePage } from "@/components/pages/projects/lotoquine/lotoquine_page";
import { Locales } from "@/types/intl";

export default async function Page({
  params,
}: {
  params: { locale: Locales };
}) {
  return (
    <div className="text-2xl font-bold">
      <LotoquinePage />
    </div>
  );
}
