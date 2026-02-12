import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import SideBarPage from "@/app/sidebar/page";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Livres entre amis",
  description: "Partagez vos livres avec vos amis et découvrez de nouvelles lectures grâce à notre plateforme de prêt de livres entre particuliers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col`}
      >
          <div className='container mx-auto flex flex-col flex-grow'>
            <Header />
            <div className='flex flex-row flex-grow'>
              <div className='basis-1/5'>
                <SideBarPage />
              </div>
              <div className='basis-4/5'>
                {children}
              </div>
            </div>
            <Footer />
          </div>
      </body>
    </html>
  );
}
