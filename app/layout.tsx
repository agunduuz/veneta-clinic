// app/layout.tsx - GÜNCELLENMİŞ
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/context";
import { translations } from "@/lib/i18n/translations";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://venetaclinic.com"),
  title: {
    default: "Veneta Clinic - Estetik ve Plastik Cerrahi Merkezi",
    template: "%s | Veneta Clinic",
  },
  description:
    "İstanbul'da estetik ve plastik cerrahi alanında uzmanlaşmış Veneta Clinic. Saç ekimi, lazer epilasyon, ameliyatlı estetik ve daha fazlası için güvenilir çözümler.",
  keywords: [
    "Veneta Clinic",
    "İstanbul estetik",
    "plastik cerrahi",
    "saç ekimi",
    "lazer epilasyon",
    "ameliyatlı estetik",
    "burun estetiği",
    "göz estetiği",
    "meme estetiği",
    "liposuction",
    "dermatoloji",
    "estetik cerrahi",
  ],
  authors: [{ name: "Veneta Clinic" }],
  creator: "Veneta Clinic",
  publisher: "Veneta Clinic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      tr: "/",
      en: "/en",
    },
  },
  icons: {
    icon: [
      { url: "/veneta-logo.ico", sizes: "any" },
      { url: "/veneta-logo.svg", type: "image/svg+xml" },
    ],
    apple: [
      {
        url: "/veneta-logo.ico",
        sizes: "180x180",
        type: "image/x-icon",
      },
    ],
    shortcut: "/veneta-logo.ico",
  },
  openGraph: {
    type: "website",
    url: "https://venetaclinic.com",
    siteName: "Veneta Clinic",
    title: "Veneta Clinic - Estetik ve Plastik Cerrahi Merkezi",
    description:
      "İstanbul'da estetik ve plastik cerrahi alanında uzmanlaşmış Veneta Clinic. Saç ekimi, lazer epilasyon, ameliyatlı estetik ve daha fazlası için güvenilir çözümler.",
    locale: "tr_TR",
    images: [
      {
        url: "/images/veneta-clinic-og.jpg",
        width: 1200,
        height: 630,
        alt: "Veneta Clinic - Estetik ve Plastik Cerrahi Merkezi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veneta Clinic - Estetik ve Plastik Cerrahi Merkezi",
    description:
      "İstanbul'da estetik ve plastik cerrahi alanında uzmanlaşmış Veneta Clinic.",
    images: ["/images/veneta-clinic-og.jpg"],
  },
  verification: {
    google: "2fWravjTYZWg5oYbC1-8JoEh3kv_zBHEz_-ZoVNzdKc",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased`}
      >
        <I18nProvider translations={translations}>
          <ConditionalLayout>{children}</ConditionalLayout>
        </I18nProvider>
      </body>
    </html>
  );
}
