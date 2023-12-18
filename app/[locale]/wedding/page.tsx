import { WeddingInvitationPage } from "@/components/pages/wedding/invitation/wedding_invitation_page";
import { WeddingPage } from "@/components/pages/wedding/wedding_page";
import { Locales } from "@/types/intl";

export default async function Page({
  params,
  searchParams,
}: {
  params: { locale: Locales };
  searchParams: { [param: string]: string | string[] };
}) {
  const invitationId = searchParams?.invitation as string;
  if (invitationId) {
    return <WeddingInvitationPage locale={params.locale} invitationId={invitationId} />;
  }
  return <WeddingPage locale={params.locale} />;
}
