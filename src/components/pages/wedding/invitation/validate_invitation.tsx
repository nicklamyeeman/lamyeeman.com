"use client"

import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { fetchWeddingInvitationCode } from "../../../server/fetchers/wedding";

export const ValidateInvitation: React.FC<{ }> = ({ }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleValidateCode = useCallback(() => {
        fetchWeddingInvitationCode(code).then((invitationId) => {
            console.log({code, invitationId})
            if (!invitationId) {
                setError('Code invalide');
            } else {
                setError('');
                router.push(`/wedding?invitation=${invitationId}`);
            }
        });
    }, [code])

    return (
        <div>
            <Typography>
                Entrez le code inscrit sur votre invitation
            </Typography>
            <TextField
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <Button 
                className="text-red-500"
                onClick={handleValidateCode}
            >
                Valider
            </Button>
            <span>
                {error}
            </span>
        </div>
    )
}