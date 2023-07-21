import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navigation from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";
import SWRConfigContext from "@/context/SWRConfigContext";
import { Metadata } from "next";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Instaclone",
    template: "Instaclone | %s ",
  },
  description: "Instaclone photos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full overflow-auto bg-neutral-50">
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <div className="max-w-screen-xl mx-auto">
              <Navigation />
            </div>
          </header>
          <main className="w-full flex justify-center max-w-screen-xl mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
