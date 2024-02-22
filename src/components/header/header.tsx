import Image from "next/image";

// @ts-ignore
import Logo from "@/assets/logo-light.png";

import { Locales } from "@/types/intl";
import { Typography } from "@mui/material";
import Link from "next/link";
import getIntl from "../server/intl/intl";

export const Header: React.FC<{ locale: Locales }> = async ({ locale }) => {
  const { formatMessage } = await getIntl(locale);
  return (
    <div className="w-full h-12 fixed top-0 left-0 flex items-center justify-center bg-stone-900 z-10 py-1 drop-shadow-md">
      <div className="w-full max-w-[1440px] flex items-center justify-between">
        <Link href={"/"} className="relative w-10 h-10">
          <Image
            alt="logo"
            src={Logo}
            className="w-full h-full object-contain"
          />
        </Link>
        <div className="flex w-full gap-8 items-center justify-end">
          <Link href="/" className="text-stone-50 no-underline">
            <Typography
              color="whitesmoke"
              className="font-semibold tracking-wider"
            >
              {formatMessage({ id: "Main.Lang.Menu.Home" })}
            </Typography>
          </Link>
          <Link href="/" className="text-stone-50 no-underline">
            <Typography
              color="whitesmoke"
              className="font-semibold tracking-wider"
            >
              {formatMessage({ id: "Main.Lang.Menu.About" })}
            </Typography>
          </Link>
          <Link href="/" className="text-stone-50 no-underline">
            <Typography
              color="whitesmoke"
              className="font-semibold tracking-wider"
            >
              {formatMessage({ id: "Main.Lang.Menu.Projects" })}
            </Typography>
          </Link>
          <Link href="/" className="text-stone-50 no-underline">
            <Typography
              color="whitesmoke"
              className="font-semibold tracking-wider"
            >
              {formatMessage({ id: "Main.Lang.Menu.Contact" })}
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
};
