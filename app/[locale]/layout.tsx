import "styles/globals.css";

import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Locales } from "@/types/intl";
import { Providers } from "./providers";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: Locales;
  };
}) {
  return (
    <html lang={params.locale} className="w-full min-h-screen h-full">
      <body className="w-full h-auto m-0 p-0 custom-scrollbar">
        <Providers locale={params.locale}>
          <header>
            <Header locale={params.locale} />
          </header>
          <main className="font-sans min-w-screen w-full min-h-screen h-full relative flex flex-col items-center bg-gradient-to-br from-stone-50 to-rose-50 via-violet-50">
            <div className="flex flex-col max-w-[1440px] w-full py-4 pt-14">
              {children}
            </div>
          </main>
          <footer className="w-full flex flex-col">
            <Footer locale={params.locale} />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
