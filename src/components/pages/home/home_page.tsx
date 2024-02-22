import { Locales } from "@/types/intl";
import { Typography } from "@mui/material";

export const HomePage: React.FC<{ locale: Locales }> = ({ locale }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* <Typography>About</Typography>
      <Typography>Projects</Typography>
      <Typography>Testimonials</Typography>
      <Typography>Contact</Typography> */}
      <Typography className="my-20">This site is under construct</Typography>
    </div>
  );
};
