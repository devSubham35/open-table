import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import AppProviders from "@/providers/AppProviders";
import TanstackProvider from "@/providers/TanstackProvider";
import { Toaster } from "sonner";

const outFit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open Table",
  description: "Resturant booking management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outFit.variable} antialiased`}>
        <TanstackProvider>
          <AppProviders>
            {children}
          </AppProviders>
          <Toaster richColors position="bottom-right" />
        </TanstackProvider>
      </body>
    </html>
  );
}
