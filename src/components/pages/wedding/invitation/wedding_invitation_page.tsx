import { fetchWeddingInvitationDetails } from "@/components/server/fetchers/wedding";
import { Locales } from "@/types/intl";

export const WeddingInvitationPage: React.FC<{
    locale: Locales;
    invitationId: string;
}> = async ({
    locale,
    invitationId
}) => {
    const invitationDetails = await fetchWeddingInvitationDetails(invitationId);

    return (
        <div className="w-full flex flex-col">
            <span className="text-9xl">Bienvenue au mariage de Naomi et Nick</span>
            <span>Invitation: {invitationDetails?.code}</span>
        </div>
    );
}