import { SigninPage } from "@/components/pages/signin/signin_page";
import { Locales } from "@/types/intl";

export default async function Page({
  params,
}: {
  params: { locale: Locales };
}) {
    return (<SigninPage/>)
}
