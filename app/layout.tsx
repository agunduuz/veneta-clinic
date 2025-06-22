import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

// Turkish metadata
const trMetadata = {
  title: {
    default: 'Veneta Clinic - Estetik ve Plastik Cerrahi Merkezi',
    template: '%s | Veneta Clinic',
  },
  description:
    "İstanbul'da estetik ve plastik cerrahi alanında uzmanlaşmış Veneta Clinic. Saç ekimi, lazer epilasyon, ameliyatlı estetik ve daha fazlası için güvenilir çözümler.",
  keywords: [
    'Veneta Clinic',
    'İstanbul estetik',
    'plastik cerrahi',
    'saç ekimi',
    'lazer epilasyon',
    'ameliyatlı estetik',
    'burun estetiği',
    'göz estetiği',
    'meme estetiği',
    'liposuction',
    'dermatoloji',
    'estetik cerrahi',
  ],
  openGraph: {
    title: 'Veneta Clinic - Estetik ve Plastik Cerrahi Merkezi',
    description:
      "İstanbul'da estetik ve plastik cerrahi alanında uzmanlaşmış Veneta Clinic. Saç ekimi, lazer epilasyon, ameliyatlı estetik ve daha fazlası için güvenilir çözümler.",
    locale: 'tr_TR',
  },
  twitter: {
    title: 'Veneta Clinic - Estetik ve Plastik Cerrahi Merkezi',
    description:
      "İstanbul'da estetik ve plastik cerrahi alanında uzmanlaşmış Veneta Clinic.",
  },
};

// English metadata
const enMetadata = {
  title: {
    default: 'Veneta Clinic - Aesthetic and Plastic Surgery Center',
    template: '%s | Veneta Clinic',
  },
  description:
    'Veneta Clinic specializes in aesthetic and plastic surgery in Istanbul. Reliable solutions for hair transplantation, laser hair removal, surgical aesthetics and more.',
  keywords: [
    'Veneta Clinic',
    'Istanbul aesthetic',
    'plastic surgery',
    'hair transplant',
    'laser hair removal',
    'surgical aesthetics',
    'rhinoplasty',
    'eye surgery',
    'breast surgery',
    'liposuction',
    'dermatology',
    'aesthetic surgery',
  ],
  openGraph: {
    title: 'Veneta Clinic - Aesthetic and Plastic Surgery Center',
    description:
      'Veneta Clinic specializes in aesthetic and plastic surgery in Istanbul. Reliable solutions for hair transplantation, laser hair removal, surgical aesthetics and more.',
    locale: 'en_US',
  },
  twitter: {
    title: 'Veneta Clinic - Aesthetic and Plastic Surgery Center',
    description:
      'Veneta Clinic specializes in aesthetic and plastic surgery in Istanbul.',
  },
};

// Function to generate metadata based on language
function generateMetadata(lang: 'tr' | 'en' = 'tr'): Metadata {
  const baseMetadata = lang === 'tr' ? trMetadata : enMetadata;

  return {
    ...baseMetadata,
    authors: [{ name: 'Veneta Clinic' }],
    creator: 'Veneta Clinic',
    publisher: 'Veneta Clinic',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://venetaclinic.com'),
    alternates: {
      canonical: '/',
      languages: {
        tr: '/',
        en: '/en',
      },
    },
    icons: {
      icon: [
        { url: '/veneta-logo.ico', sizes: 'any' },
        { url: '/veneta-logo.svg', type: 'image/svg+xml' },
      ],
      apple: [
        {
          url: '/veneta-logo.ico',
          sizes: '180x180',
          type: 'image/x-icon',
        },
      ],
      shortcut: '/veneta-logo.ico',
    },
    openGraph: {
      type: 'website',
      url: 'https://venetaclinic.com',
      siteName: 'Veneta Clinic',
      images: [
        {
          url: '/images/veneta-clinic-og.jpg',
          width: 1200,
          height: 630,
          alt:
            lang === 'tr'
              ? 'Veneta Clinic - Estetik ve Plastik Cerrahi Merkezi'
              : 'Veneta Clinic - Aesthetic and Plastic Surgery Center',
        },
      ],
      ...baseMetadata.openGraph,
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   images: ['/images/veneta-clinic-og.jpg'],
    //   ...baseMetadata.twitter,
    // },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // verification: {
    //   google: 'your-google-verification-code',
    //   yandex: 'your-yandex-verification-code',
    // },
  };
}

// Default to Turkish metadata
export const metadata: Metadata = generateMetadata('tr');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='tr' className=''>
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased`}
      >
        <Header />
        <main className='flex-grow'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
