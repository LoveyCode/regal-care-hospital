
import type { Metadata } from "next";
import { Roboto, Roboto_Condensed, Plus_Jakarta_Sans} from "next/font/google"
import "./globals.css";
import {cn} from "./lib/utils"
import { ThemeProvider } from "@/components/ui/theme-provider";
import LayoutShell from "@/components/LayoutShell";
import { AuthProvider } from "@/context/AuthContext";
import ClientProviders from "@/providers/ClientProviders";
import { ToasterProvider } from "@/providers/ToasterProvider";


export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['400', '700'], 
  variable: '--font-roboto-condensed',
});

const fontSans = Plus_Jakarta_Sans({
subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-sans"
});




export const metadata: Metadata = {
  title: "Regal Care",
  description: "Official website of a modern hospital offering trusted healthcare services, appointment and patient support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

// bg-dark-300 

    <html lang="en">
  <body className={cn('min-h-screen font-sans antialias', fontSans.variable, roboto.variable, robotoCondensed.variable)}>

       
      <ClientProviders>
            <LayoutShell>{children}</LayoutShell>
        </ClientProviders>
        <ToasterProvider />
      </body>
    </html>



  );
}
