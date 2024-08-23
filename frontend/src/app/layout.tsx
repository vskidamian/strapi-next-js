import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getGlobalPageData, getGlobalPageMetadata } from "@/data/loaders";
import { Header } from "@/components/custom/Header";
import { Footer } from "@/components/custom/Footer";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();
  return {
    title: metadata?.title,
    description: metadata?.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalPageData();

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="relative flex flex-col min-h-screen">
          <Header data={globalData.header} />
          <div className="flex-grow flex-1">{children}</div>
          <Footer data={globalData.footer} />
        </main>
      </body>
    </html>
  );
}
