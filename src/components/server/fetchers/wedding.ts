import { getFirebaseValue } from "@/components/server/firebase/firebase_utils";
import { WeddingInvitationDetails } from "@/types/wedding";

export const fetchWeddingInvitationCode = (code: string) =>
  getFirebaseValue<string>(`lamyeeman/wedding/invitations/codes/${code}`).then((snapshot) => snapshot.val());

export const fetchWeddingInvitationDetails = (invitationId: string) =>
  getFirebaseValue<WeddingInvitationDetails>(`lamyeeman/wedding/invitations/details/${invitationId}`).then((snapshot) => snapshot.val());
