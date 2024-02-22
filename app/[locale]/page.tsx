import { HomePage } from "@/components/pages/home/home_page";
import getIntl from "@/components/server/intl/intl";
import { Locales } from "@/types/intl";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locales };
}): Promise<Metadata> {
  const { formatMessage } = await getIntl(params.locale);
  const title = formatMessage({ id: "Main.Lang.Title" });
  const description = formatMessage({ id: "Main.Lang.Description" });

  return {
    title,
    description,
    metadataBase: new URL("https://lamyeeman.com/"),
    alternates: {
      canonical: "https://lamyeeman.com",
      languages: {
        fr: "https://lamyeeman.com/fr",
        en: "https://lamyeeman.com",
      },
    },
    openGraph: {
      title,
      description,
      url: "https://lamyeeman.com",
    },
    twitter: {
      card: "summary_large_image" as any,
      title,
      description,
      site: "@nickauteen",
    },
  };
}

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
