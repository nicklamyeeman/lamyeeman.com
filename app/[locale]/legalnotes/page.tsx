import getIntl from "@/components/server/intl/intl";
import { Locales } from "@/types/intl";
import { Typography } from "@mui/material";

export default async function LegalNotesPage({
  params,
}: {
  params: { locale: Locales };
}) {
  const { formatMessage } = await getIntl(params.locale);

  return (
    <div className="w-full flex flex-col">
      <Typography
        component="h1"
        className="w-full text-center text-2xl font-bold my-2"
      >
        {formatMessage({ id: "Main.Lang.LegalNotes" })}
      </Typography>
      <Typography className="w-full text-left text-sm leading-tight my-4">
        {formatMessage(
          { id: "Main.Lang.LegalNotes.Content" },
          { br: (<br />) as any }
        )}
      </Typography>
    </div>
  );
}
