import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATICHAT",
  description: "This is my personal website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} antialiased scrollbar-none`}>
      <body className=" antialiased w-full flex flex-col justify-center">
        <main>{children}</main>
      </body>
    </html>
  );
}
