import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NotesVaults — Remember Everything. Forget Nothing.",
  description:
    "NotesVaults automatically resurfaces your notes at the exact moment you're about to forget them. Built for students, developers, and lifelong learners.",
  keywords: [
    "spaced repetition",
    "note taking",
    "learning",
    "memory",
    "recall",
    "study tool",
    "knowledge management",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-dm-sans)]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
