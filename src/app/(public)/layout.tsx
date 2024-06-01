import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/assets/styles/globals.scss";

const vazirmatn = Vazirmatn({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Carros Usados para Comprar no Brasil | NextCar",
  description:
    "Encontre o carro dos seus sonhos aqui na NEXTCar. Explore uma vasta seleção de veículos usados com fotos, descrições detalhadas e preços competitivos que cabem no seu bolso. Compre seu próximo carro de forma fácil e segura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={vazirmatn.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
