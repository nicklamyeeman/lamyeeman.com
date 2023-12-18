export interface WeddingInvitationDetails {
    code: string;
}

export interface WeddingInvitations {
    codes: {
        [code: string]: string;
    };
    details: {
        [invitationId: string] : WeddingInvitationDetails;
    }
}

export interface Wedding {
    invitations: WeddingInvitations;
}