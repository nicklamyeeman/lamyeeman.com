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
    <div className="flex flex-col w-full">
      <Typography
        component="h1"
        className="w-full my-2 text-2xl font-bold text-center"
      >
        {formatMessage({ id: "Main.Footer.LegalNotes" })}
      </Typography>
      <Typography className="w-full my-4 text-sm leading-tight text-left">
        {formatMessage(
          { id: "Main.Footer.LegalNotes.Content" },
          { br: (<br />) as any },
        )}
      </Typography>
    </div>
  );
}
