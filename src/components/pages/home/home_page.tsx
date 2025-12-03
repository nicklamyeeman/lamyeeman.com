import { Locales } from "@/types/intl";
import { Typography } from "@mui/material";
import { HomePageProjects } from "./projects/home_page_projects";

export const HomePage: React.FC<{ locale: Locales }> = ({ locale }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Typography>About</Typography>
      <HomePageProjects locale={locale} />
      <Typography>Testimonials</Typography>
      <Typography>Contact</Typography>
      {/* <Typography className="my-20">This site is under construct</Typography> */}
    </div>
  );
};
