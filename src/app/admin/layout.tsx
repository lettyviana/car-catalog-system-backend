import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "@/assets/styles/globals.scss";
import AdminNavbar from "@/components/Admin/AdminNavbar";

const vazirmatn = Vazirmatn({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "NextCar | Admin",
  description: "Função do Admin: Deixar tudo em ordem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="admin-html">
      <body className={`${vazirmatn.className} admin-section`}>
        <AdminNavbar />
        {children}
      </body>
    </html>
  );
}
