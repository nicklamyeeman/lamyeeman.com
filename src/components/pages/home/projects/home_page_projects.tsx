import Image from "next/image";

import { Card, Typography } from "@mui/material";

// @ts-ignore
import TechProjectsImage from "@/assets/home/logo-dark.png";

import getIntl from "@/components/server/intl/intl";
import { Locales } from "@/types/intl";
import Link from "next/link";

const HomePageProjectsCardWrapper: React.FC<{
  link: string;
  img: React.ReactNode;
  title: string;
  description: string;
}> = ({ link, img, title, description }) => {
  return (
    <Link href={link} className="no-underline group">
      <Card className="w-full h-[250px] max-w-xs flex flex-col rounded-lg p-6 gap-1 shadow-md group-hover:shadow-xl cursor-pointer">
        <div className="relative w-full max-h-[120px] rounded-md border border-solid border-stone-300">
          {img}
        </div>
        <div className="w-full h-full flex flex-col gap-1 mt-6">
          <Typography
            component="h4"
            className="text-lg text-stone-900 font-semibold"
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

export const HomePageProjects: React.FC<{ locale: Locales }> = async ({
  locale,
}) => {
  const { formatMessage } = await getIntl(locale);

  return (
    <div className="w-full flex items-center justify-center gap-10">
      <HomePageProjectsCardWrapper
        link="/projects/tech"
        img={
          <Image
            src={TechProjectsImage}
            alt="tech projects image"
            className="w-full h-full object-top object-cover"
          />
        }
        title={formatMessage({ id: "Main.Home.Projects.Tech.Title" })}
        description={formatMessage({
          id: "Main.Home.Projects.Tech.Description",
        })}
      />
      <HomePageProjectsCardWrapper
        link="/projects/art"
        img={
          <Image
            src={TechProjectsImage}
            alt="art projects image"
            className="w-full h-full object-top object-cover"
          />
        }
        title={formatMessage({ id: "Main.Home.Projects.Art.Title" })}
        description={formatMessage({
          id: "Main.Home.Projects.Art.Description",
        })}
      />
      <HomePageProjectsCardWrapper
        link="/projects/online"
        img={
          <Image
            src={TechProjectsImage}
            alt="online projects image"
            className="w-full h-full object-top object-cover"
          />
        }
        title={formatMessage({ id: "Main.Home.Projects.Online.Title" })}
        description={formatMessage({
          id: "Main.Home.Projects.Online.Description",
        })}
      />
    </div>
  );
};
