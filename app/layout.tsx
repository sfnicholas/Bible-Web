import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Bible Web App",
  description: "A bilingual Bible web application providing both cuv and esv",
  icons: [
    { rel: "icon", url: "/BibleLogo.jpg" },
    { rel: "apple-touch-icon", url: "/BibleLogo.jpg" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/BibleLogo.jpg" />
        <link rel="apple-touch-icon" href="/BibleLogo.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-full flex flex-col">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
