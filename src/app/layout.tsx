import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { GA_MEASUREMENT_ID } from "@/config/analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suzy Brito Advocacia - Especialistas em Busca e Apreensão",
  description:
    "Advocacia especializada em defesa do consumidor e ações de busca e apreensão. Protegemos seus direitos e bens com estratégia e eficiência. Consulte gratuitamente.",
  keywords:
    "advocacia, busca e apreensão, defesa do consumidor, direito civil, advogado Salvador, Suzy Brito",
  authors: [{ name: "Suzy Brito" }],
  creator: "Suzy Brito Advocacia",
  publisher: "Suzy Brito Advocacia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://buscaeapreensao.suzibrito.adv.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Suzy Brito Advocacia - Especialistas em Busca e Apreensão",
    description:
      "Advocacia especializada em defesa do consumidor e ações de busca e apreensão. Protegemos seus direitos e bens com estratégia e eficiência.",
    url: "https://buscaeapreensao.suzibrito.adv.br",
    siteName: "Suzy Brito Advocacia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suzy Brito Advocacia - Especialistas em Busca e Apreensão",
    description:
      "Advocacia especializada em defesa do consumidor e ações de busca e apreensão.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "seu-codigo-google-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
