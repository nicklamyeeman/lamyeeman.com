import getIntl from "@/components/server/intl/intl";
import { Locales } from "@/types/intl";
import { Typography } from "@mui/material";
import Link from "next/link";

export const Footer: React.FC<{ locale: Locales }> = async ({ locale }) => {
  const { formatMessage } = await getIntl(locale);

  return (
    <div className="w-full flex items-center py-6 bg-stone-800">
      <div className="w-full flex items-center justify-center">
        <Typography className="flex text-center gap-2 text-stone-50">
          {formatMessage({ id: "Main.Lang.Copyright" })}
          <span>{"-"}</span>
          <Link href={"/legalnotes"} className="text-stone-50">
            <span>{formatMessage({ id: "Main.Lang.LegalNotes" })}</span>
          </Link>
        </Typography>
      </div>
    </div>
  );
};
