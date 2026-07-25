import getIntl from "@/components/server/intl/intl";
import { Locales } from "@/types/intl";
import { Typography } from "@mui/material";
import Link from "next/link";

export const Footer: React.FC<{ locale: Locales }> = async ({ locale }) => {
  const { formatMessage } = await getIntl(locale);

  return (
    <div className="flex items-center w-full py-6 bg-stone-800">
      <div className="flex items-center justify-center w-full">
        <Typography className="flex flex-col gap-2 text-center sm:flex-row text-stone-50">
          {formatMessage({ id: "Main.Footer.Copyright" })}
          <span className="hidden sm:flex">{"-"}</span>
          <Link href={"/legalnotes"} className="text-stone-50">
            <span>{formatMessage({ id: "Main.Footer.LegalNotes" })}</span>
          </Link>
        </Typography>
      </div>
    </div>
  );
};
