import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import MobileOrderBar from "@/components/MobileOrderBar";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Hot Tacos Restaurant",
  description:
    "Authentic Mexican food in Leamington and Windsor. Order online, visit our locations, and enjoy party in every bite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileOrderBar />
      </body>
    </html>
  );
}