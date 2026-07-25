import { Locales } from "@/types/intl";
import { ProjectsPageCards } from "./cards/projects_page_cards";

export const ProjectsPage: React.FC<{ locale: Locales }> = ({ locale }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* <Typography>About</Typography> */}
      <ProjectsPageCards locale={locale} />
      {/* <Typography>Testimonials</Typography> */}
      {/* <Typography>Contact</Typography> */}
      {/* <Typography className="my-20">This site is under construct</Typography> */}
    </div>
  );
};
