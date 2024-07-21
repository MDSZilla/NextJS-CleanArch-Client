import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ExampleWrapper } from "@/_context/example";

const poppins = Poppins({ weight: ["100", "300", "400", "500", "700", "900"], subsets: ["latin"] });

//If you want to use Local Fonts use this format, Add ${nougat.variable} to the className below as well
// const nougat = localFont({
//   src: "../public/assets/fonts/nougat-extrablack.ttf",
//   display: 'swap',
//   variable: "--font-nougat",
// });



export const metadata: Metadata = {
  title: "Change in layout.tsx",
  description: "Change in layout.tsx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <ExampleWrapper>
          <body className={`${poppins.className}`}>
            {children}
            <Toaster position="top-right" />
          </body>
        </ExampleWrapper>
    </html>
  );
}
