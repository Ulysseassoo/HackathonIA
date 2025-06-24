import type { Metadata } from "next";
import { Oswald, Lato, Varela_Round } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
});

const varelaRound = Varela_Round({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-varela",
});

export const metadata: Metadata = {
  title: "Sérénité - Plateforme Intelligente",
  description: "La plateforme intelligente qui connecte vos besoins business avec des prestataires experts et des agents IA avancés",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${oswald.variable} ${lato.variable} ${varelaRound.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
