import getIntl from "@/components/server/intl/intl";
import { Locales } from "@/types/intl";
import { Card, Typography } from "@mui/material";
import Link from "next/link";

const ProjectsPageCardWrapper: React.FC<{
  link: string;
  img: React.ReactNode | null;
  title: string;
  description: string;
}> = ({ link, img, title, description }) => {
  return (
    <Link href={link} className="no-underline group">
      <Card className="w-full h-[250px] max-w-xs flex flex-col rounded-lg p-6 gap-1 shadow-md group-hover:shadow-xl cursor-pointer">
        {!!img ? (
          <div className="relative w-full max-h-[150px] rounded-md border border-solid border-stone-300">
            {img}
          </div>
        ) : (
          <div className="relative w-full h-[150px] rounded-md border border-solid border-stone-300 flex items-center justify-center bg-amber-700">
            <Typography className="font-mono text-4xl font-black tracking-widest uppercase text-amber-50 whitespace-nowrap">
              {title}
            </Typography>
          </div>
        )}
        <div className="flex flex-col w-full h-full gap-1 mt-6">
          <Typography
            component="h4"
            className="text-lg font-semibold text-stone-900"
          >
            {title}
          </Typography>
          <Typography className="text-sm text-stone-500">
            {description}
          </Typography>
        </div>
      </Card>
    </Link>
  );
};

export const ProjectsPageCards: React.FC<{ locale: Locales }> = async ({
  locale,
}) => {
  const { formatMessage } = await getIntl(locale);

  return (
    <div className="flex items-center justify-center w-full gap-10">
      <ProjectsPageCardWrapper
        link="/projects/lotoquine"
        img={null}
        title={formatMessage({ id: "Projects.Lotoquine.Title" })}
        description={formatMessage({
          id: "Projects.Lotoquine.Description",
        })}
      />
    </div>
  );
};
