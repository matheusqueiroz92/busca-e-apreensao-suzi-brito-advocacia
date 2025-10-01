import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import GoogleTagManager from "@/components/GoogleTagManager";
import GoogleTagManagerNoScript from "@/components/GoogleTagManagerNoScript";
import { GTM_ID } from "@/config/gtm";

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
        {/* CSP temporariamente removido para teste */}
        <GoogleTagManager gtmId={GTM_ID} />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16960991390"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16960991390');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-white text-gray-900`}
      >
        <GoogleTagManagerNoScript gtmId={GTM_ID} />
        {children}
      </body>
    </html>
  );
}
