import { ProjectsPage } from "@/components/pages/projects/projects_page";
import { Locales } from "@/types/intl";

export default async function Page({
  params,
}: {
  params: { locale: Locales };
}) {
  return (
    <div className="text-2xl font-bold">
      <ProjectsPage locale={params.locale} />
    </div>
  );
}
