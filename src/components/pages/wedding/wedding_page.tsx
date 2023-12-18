import { Locales } from "@/types/intl";
import { Typography } from "@mui/material";
import { ValidateInvitation } from "./invitation/validate_invitation";

export const WeddingPage: React.FC<{ locale: Locales }> = ({ locale }) => {
  return (
    <div>
      <Typography className="text-9xl">Bienvenue au mariage de Naomi et Nick</Typography>
      <ValidateInvitation/>
    </div>
  );
};
