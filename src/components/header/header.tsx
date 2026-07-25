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
    <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-12 py-1 bg-stone-900 drop-shadow-md">
      <div className="px-10 w-full max-w-[1440px] flex items-center justify-between">
        <Link href={"/"} className="relative w-10 h-10">
          <Image
            alt="logo"
            src={Logo}
            className="object-contain w-full h-full"
          />
        </Link>
        <div className="items-center justify-end hidden w-full gap-8 sm:flex">
          <Link href="/" className="no-underline text-stone-50">
            <Typography
              color="whitesmoke"
              className="font-semibold tracking-wider"
            >
              {formatMessage({ id: "Main.Header.Menu.Home" })}
            </Typography>
          </Link>
          {/* <Link href="/" className="no-underline text-stone-50">
            <Typography
              color="whitesmoke"
              className="font-semibold tracking-wider"
            >
              {formatMessage({ id: "Main.Header.Menu.About" })}
            </Typography>
          </Link> */}
          <Link href="/projects" className="no-underline text-stone-50">
            <Typography
              color="whitesmoke"
              className="font-semibold tracking-wider"
            >
              {formatMessage({ id: "Main.Header.Menu.Projects" })}
            </Typography>
          </Link>
          {/* <Link href="/" className="no-underline text-stone-50">
            <Typography
              color="whitesmoke"
              className="font-semibold tracking-wider"
            >
              {formatMessage({ id: "Main.Header.Menu.Contact" })}
            </Typography>
          </Link> */}
        </div>
      </div>
    </div>
  );
};
