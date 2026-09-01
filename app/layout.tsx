import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://seusite.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jeovanna Isabel | Portfolio",
    template: "%s | Jeovanna Isabel",
  },
  description:
    "Fotografia e produção audiovisual especializada em social media, marketing imobiliário e filmes de casamento. Transformando momentos em arte.",
  keywords: [
    "fotografia",
    "vídeo",
    "produção audiovisual",
    "social media",
    "marketing imobiliário",
    "filme de casamento",
  ],
  authors: [{ name: "Jeovanna Isabel" }],
  creator: "Jeovanna Isabel",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Jeovanna Isabel",
    title: "Jeovanna Isabel | Fotografia & Vídeo",
    description:
      "Fotografia e produção audiovisual especializada em social media, marketing imobiliário e filmes de casamento.",
    images: [{ url: "/hero.jpg", width: 1200, height: 630, alt: "Jeovanna Isabel — Fotografia & Vídeo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeovanna Isabel | Fotografia & Vídeo",
    description:
      "Fotografia e produção audiovisual especializada em social media, marketing imobiliário e filmes de casamento.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
