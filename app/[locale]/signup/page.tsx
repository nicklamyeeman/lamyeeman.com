import { SignupPage } from "@/components/pages/signup/signup_page";
import { Locales } from "@/types/intl";

export default async function Page({
  params,
}: {
  params: { locale: Locales };
}) {
    return (<SignupPage/>)
}
