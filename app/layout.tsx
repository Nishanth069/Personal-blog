import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Roboto_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import { getAllPosts } from "@/lib/posts";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: { default: "Nishanth", template: "%s — Nishanth" },
  description: "Personal writing by Nishanth.",
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getAllPosts();
  
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${robotoMono.variable}`}>
      <body className="font-sans antialiased text-primary bg-base">
        <Nav posts={posts} />
        {children}
      </body>
    </html>
  );
}
