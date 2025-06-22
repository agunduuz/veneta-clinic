// app/(routes)/ameliyatli-estetik/[category]/page.tsx
import { navigationItems } from '@/data/navigation';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CategoryPageContent from '@/components/CategoryComponent/CategoryPageContent';
import PhoneButton from '@/components/Header/PhoneButton';
import WhatsAppButton from '@/components/Header/WhatsAppButton';

// Her operasyon için özel SEO verileri
const operationData = {
  yuz: {
    title: 'Yüz Estetiği',
    description:
      'Yüz estetiği, yüz hatlarını gençleştirmek ve daha dengeli bir görünüm elde etmek için yapılan cerrahi işlemlerdir.',
    advantages: [
      'Gençleşmiş yüz görünümü',
      'Daha dengeli yüz hatları',
      'Artırılmış özgüven',
      'Doğal sonuçlar',
    ],
    process: [
      {
        step: 'İlk Konsültasyon',
        description:
          'Uzman doktorumuzla yüz analizi ve kişiselleştirilmiş tedavi planı hazırlama.',
      },
      {
        step: 'Operasyon Günü',
        description:
          'Modern ameliyathane koşullarında güvenli yüz estetiği operasyonu.',
      },
      {
        step: 'İyileşme Süreci',
        description:
          'Düzenli kontroller ve profesyonel takip ile hızlı iyileşme süreci.',
      },
    ],
    faqs: [
      {
        question: 'Yüz estetiği ne kadar sürer?',
        answer: 'Operasyon süresi 2-4 saat arasında değişmektedir.',
      },
      {
        question: 'İyileşme süreci nasıl geçer?',
        answer:
          'İlk 1-2 hafta şişlik ve morluklar görülebilir, 3-4 hafta içinde normal yaşantıya dönülebilir.',
      },
      {
        question: 'Sonuçlar kalıcı mı?',
        answer: 'Evet, yüz estetiği sonuçları uzun yıllar kalıcıdır.',
      },
    ],
    image: '/images/goz-kapagi.jpeg',
    images: [],
  },
  'burun-estetigi': {
    title: 'Burun Estetiği',
    description:
      'Burun estetiği, burnun şeklini düzeltmek ve fonksiyonel sorunları gidermek amacıyla yapılan cerrahi işlemdir.',
    advantages: [
      'Daha dengeli burun görünümü',
      'İyileştirilmiş nefes alma',
      'Yüz ile uyumlu burun',
      'Artırılmış özgüven',
    ],
    process: [
      {
        step: 'İlk Konsültasyon',
        description:
          'Burun analizi, 3D görüntüleme ve kişiselleştirilmiş tedavi planı.',
      },
      {
        step: 'Operasyon Günü',
        description:
          'Açık veya kapalı teknikle güvenli burun estetiği operasyonu.',
      },
      {
        step: 'İyileşme Süreci',
        description:
          '7. günde tampon çıkarılır, 2 hafta içinde normal yaşantıya dönülebilir.',
      },
    ],
    faqs: [
      {
        question: 'Burun estetiği ne kadar sürer?',
        answer: 'Operasyon süresi 1-2 saat arasında değişmektedir.',
      },
      {
        question: 'Burnun tam şeklini alması ne kadar sürer?',
        answer: 'Burnun tam şeklini alması 6-12 ay sürebilir.',
      },
      {
        question: 'Açık mı kapalı mı teknik daha iyi?',
        answer:
          'Her iki teknik de etkilidir, hastanın durumuna göre doktor karar verir.',
      },
    ],
    image: '/images/burun-estetigi.jpg',
    images: [],
  },
  'yuz-germe': {
    title: 'Yüz Germe',
    description:
      'Yüz germe, yaşlanma belirtilerini azaltmak ve daha genç bir görünüm elde etmek için yapılan cerrahi işlemdir.',
    advantages: [
      'Belirgin gençleşme etkisi',
      'Sarkık dokuların düzeltilmesi',
      'Daha sıkı yüz hatları',
      'Uzun süreli sonuçlar',
    ],
    process: [
      {
        step: 'İlk Konsültasyon',
        description:
          'Yüz analizi ve yaşlanma belirtilerinin değerlendirilmesi.',
      },
      {
        step: 'Operasyon Günü',
        description: 'Minimal kesi ile güvenli yüz germe operasyonu.',
      },
      {
        step: 'İyileşme Süreci',
        description:
          '2-3 hafta içinde şişlikler azalır, 1 ay içinde normal yaşantıya dönülebilir.',
      },
    ],
    faqs: [
      {
        question: 'Yüz germe ne kadar sürer?',
        answer: 'Operasyon süresi 2-3 saat arasında değişmektedir.',
      },
      {
        question: 'Sonuçlar ne kadar sürer?',
        answer: 'Yüz germe sonuçları 5-10 yıl sürebilir.',
      },
      {
        question: 'İz kalır mı?',
        answer: 'Kesiler saç çizgisinde gizlenir, minimal iz kalır.',
      },
    ],
    image: '/images/yuz-germe.jpg',
    images: [],
  },
  'goz-kapagi-estetigi': {
    title: 'Göz Kapak Estetiği',
    description:
      'Göz kapak estetiği, göz çevresini daha çekici hale getirmek için yapılan cerrahi işlemdir.',
    advantages: [
      'Daha çekici göz görünümü',
      'Göz çevresi gençleşmesi',
      'Daha büyük göz efekti',
      'Doğal sonuçlar',
    ],
    process: [
      {
        step: 'İlk Konsültasyon',
        description:
          'Göz çevresi analizi ve kişiselleştirilmiş tedavi planı.',
      },
      {
        step: 'Operasyon Günü',
        description: 'Hassas teknikle güvenli göz kapak estetiği.',
      },
      {
        step: 'İyileşme Süreci',
        description:
          '1 hafta içinde dikişler alınır, 2-3 hafta içinde normal görünüm.',
      },
    ],
    faqs: [
      {
        question: 'Göz kapak estetiği ne kadar sürer?',
        answer: 'Operasyon süresi 1-1.5 saat arasında değişmektedir.',
      },
      {
        question: 'İyileşme süreci nasıl geçer?',
        answer:
          'İlk günlerde şişlik ve morluklar görülebilir, 1 hafta içinde azalır.',
      },
      {
        question: 'Sonuçlar kalıcı mı?',
        answer: 'Evet, göz kapak estetiği sonuçları kalıcıdır.',
      },
    ],
    image: '/images/goz-kapagi-1.jpeg',
    images: [
      '/images/goz-kapagi-1.jpeg',
      '/images/goz-kapagi-2.jpeg',
      '/images/goz-kapagi-3.jpeg',
      '/images/goz-kapagi-4.jpeg',
      '/images/goz-kapagi-5.jpeg',
      '/images/goz-kapagi-6.jpeg',
    ],
  },
  vucut: {
    title: 'Vücut Estetiği',
    description:
      'Vücut estetiği, vücut şeklini iyileştirmek ve daha dengeli bir görünüm elde etmek için yapılan cerrahi işlemlerdir.',
    advantages: [
      'İyileştirilmiş vücut şekli',
      'Daha dengeli oranlar',
      'Artırılmış özgüven',
      'Uzun süreli sonuçlar',
    ],
    process: [
      {
        step: 'İlk Konsültasyon',
        description:
          'Vücut analizi ve hedef belirleme ile kişiselleştirilmiş plan.',
      },
      {
        step: 'Operasyon Günü',
        description:
          'Modern tekniklerle güvenli vücut estetiği operasyonu.',
      },
      {
        step: 'İyileşme Süreci',
        description:
          '2-4 hafta içinde normal aktivitelere dönülebilir.',
      },
    ],
    faqs: [
      {
        question: 'Vücut estetiği ne kadar sürer?',
        answer: 'Operasyon süresi 2-4 saat arasında değişmektedir.',
      },
      {
        question: 'Spor yapabilir miyim?',
        answer: '2-3 ay sonra hafif sporlara başlanabilir.',
      },
      {
        question: 'Sonuçlar ne kadar sürer?',
        answer: 'Sağlıklı yaşam tarzı ile sonuçlar kalıcıdır.',
      },
    ],
    image: '/images/vucut-estetigi.jpg',
    images: [],
  },
  'karin-germe': {
    title: 'Karın Germe',
    description:
      'Karın germe, karın bölgesindeki fazla deri ve yağ dokusunu alarak daha sıkı bir görünüm elde etmek için yapılan işlemdir.',
    advantages: [
      'Sıkılaşmış karın bölgesi',
      'Düzleşmiş karın',
      'İyileştirilmiş duruş',
      'Artırılmış özgüven',
    ],
    process: [
      {
        step: 'İlk Konsültasyon',
        description:
          'Karın bölgesi analizi ve kişiselleştirilmiş tedavi planı.',
      },
      {
        step: 'Operasyon Günü',
        description:
          'Güvenli karın germe operasyonu ile fazla deri ve yağ alınması.',
      },
      {
        step: 'İyileşme Süreci',
        description:
          '3-4 hafta içinde normal aktivitelere dönülebilir.',
      },
    ],
    faqs: [
      {
        question: 'Karın germe ne kadar sürer?',
        answer: 'Operasyon süresi 2-3 saat arasında değişmektedir.',
      },
      {
        question: 'İz kalır mı?',
        answer:
          'Kesi kasık çizgisinde gizlenir, zamanla belirginliği azalır.',
      },
      {
        question: 'Hamilelik sonrası yapılabilir mi?',
        answer: 'Evet, doğumdan 6 ay sonra yapılabilir.',
      },
    ],
    image: '/images/karin-germe.jpg',
    images: [],
  },
  liposuction: {
    title: 'Liposuction',
    description:
      'Liposuction, vücudun belirli bölgelerindeki fazla yağ dokusunu alarak daha dengeli bir vücut şekli elde etmek için yapılan işlemdir.',
    advantages: [
      'Hedefli yağ alma',
      'Daha dengeli vücut şekli',
      'Hızlı sonuç',
      'Minimal iz',
    ],
    process: [
      {
        step: 'İlk Konsültasyon',
        description:
          'Vücut analizi ve hedef bölgelerin belirlenmesi.',
      },
      {
        step: 'Operasyon Günü',
        description:
          'Modern liposuction teknikleri ile güvenli yağ alma.',
      },
      {
        step: 'İyileşme Süreci',
        description:
          '1-2 hafta içinde normal aktivitelere dönülebilir.',
      },
    ],
    faqs: [
      {
        question: 'Liposuction ne kadar sürer?',
        answer: 'Operasyon süresi 1-3 saat arasında değişmektedir.',
      },
      {
        question: 'Yağ geri gelir mi?',
        answer: 'Sağlıklı yaşam tarzı ile yağ geri gelmez.',
      },
      {
        question: 'Hangi bölgelere uygulanabilir?',
        answer:
          'Karın, bel, kalça, bacak, kol gibi bölgelere uygulanabilir.',
      },
    ],
    image: '/images/liposuction.jpeg',
    images: [],
  },
  meme: {
    title: 'Meme Estetiği',
    description:
      'Meme estetiği, memelerin şeklini, boyutunu ve simetrisini iyileştirmek için yapılan cerrahi işlemlerdir.',
    advantages: [
      'İyileştirilmiş meme şekli',
      'Daha dengeli oranlar',
      'Artırılmış özgüven',
      'Doğal görünüm',
    ],
    process: [
      {
        step: 'İlk Konsültasyon',
        description:
          'Meme analizi ve kişiselleştirilmiş tedavi planı.',
      },
      {
        step: 'Operasyon Günü',
        description: 'Güvenli meme estetiği operasyonu.',
      },
      {
        step: 'İyileşme Süreci',
        description:
          '2-3 hafta içinde normal aktivitelere dönülebilir.',
      },
    ],
    faqs: [
      {
        question: 'Meme estetiği ne kadar sürer?',
        answer: 'Operasyon süresi 2-3 saat arasında değişmektedir.',
      },
      {
        question: 'Emzirebilir miyim?',
        answer: 'Çoğu durumda emzirme fonksiyonu korunur.',
      },
      {
        question: 'Sonuçlar kalıcı mı?',
        answer: 'Evet, meme estetiği sonuçları kalıcıdır.',
      },
    ],
    image: '/images/meme-estetigi.jpg',
    images: [],
  },
  buyutme: {
    title: 'Meme Büyütme Ameliyatı',
    description:
      'Meme büyütme, memelerin boyutunu artırmak ve daha dolgun bir görünüm elde etmek için yapılan cerrahi işlemdir.',
    advantages: [
      'Artırılmış meme boyutu',
      'Daha dolgun görünüm',
      'İyileştirilmiş oranlar',
      'Artırılmış özgüven',
    ],
    process: [
      {
        step: 'İlk Konsültasyon',
        description:
          'Meme analizi, implant seçimi ve kişiselleştirilmiş plan.',
      },
      {
        step: 'Operasyon Günü',
        description:
          'Güvenli meme büyütme operasyonu ile implant yerleştirme.',
      },
      {
        step: 'İyileşme Süreci',
        description:
          '2-3 hafta içinde normal aktivitelere dönülebilir.',
      },
    ],
    faqs: [
      {
        question: 'Meme büyütme ne kadar sürer?',
        answer: 'Operasyon süresi 1-2 saat arasında değişmektedir.',
      },
      {
        question: 'Hangi implant türü daha iyi?',
        answer:
          'Her implant türünün avantajları vardır, doktor önerisi önemlidir.',
      },
      {
        question: 'Sonuçlar doğal mı?',
        answer:
          'Evet, modern tekniklerle doğal sonuçlar elde edilir.',
      },
    ],
    image: '/images/meme-buyutme.jpg',
    images: [],
  },
  kucultme: {
    title: 'Meme Küçültme Ameliyatı',
    description:
      'Meme küçültme, büyük memeleri küçültmek ve daha dengeli bir görünüm elde etmek için yapılan cerrahi işlemdir.',
    advantages: [
      'Küçültülmüş meme boyutu',
      'Daha dengeli oranlar',
      'Azaltılmış sırt ağrısı',
      'İyileştirilmiş yaşam kalitesi',
    ],
    process: [
      {
        step: 'İlk Konsültasyon',
        description: 'Meme analizi ve hedef boyut belirleme.',
      },
      {
        step: 'Operasyon Günü',
        description: 'Güvenli meme küçültme operasyonu.',
      },
      {
        step: 'İyileşme Süreci',
        description:
          '3-4 hafta içinde normal aktivitelere dönülebilir.',
      },
    ],
    faqs: [
      {
        question: 'Meme küçültme ne kadar sürer?',
        answer: 'Operasyon süresi 2-3 saat arasında değişmektedir.',
      },
      {
        question: 'Emzirebilir miyim?',
        answer: 'Çoğu durumda emzirme fonksiyonu korunur.',
      },
      {
        question: 'İz kalır mı?',
        answer: 'İzler zamanla belirginliğini kaybeder.',
      },
    ],
    image: '/images/meme-kucultme.jpg',
    images: [],
  },
};

export async function generateStaticParams() {
  const ameliyatli = navigationItems.find(
    (item) => item.title === 'Ameliyatlı Estetik'
  );
  return (
    ameliyatli?.subMenus?.map((sub) => ({
      category: sub.href.replace('/ameliyatli-estetik/', ''),
    })) || []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const ameliyatli = navigationItems.find(
    (item) => item.title === 'Ameliyatlı Estetik'
  );
  const subMenu = ameliyatli?.subMenus?.find(
    (sub) => sub.href.replace('/ameliyatli-estetik/', '') === category
  );

  if (!subMenu) return { title: 'Sayfa Bulunamadı' };

  const operationInfo =
    operationData[category as keyof typeof operationData];
  const title = `${
    operationInfo?.title || subMenu.title
  } | Türkiye'nin En İyi Estetik Kliniği | Veneta Clinic`;
  const description = `${
    operationInfo?.title || subMenu.title
  } konusunda Türkiye'nin lider estetik kliniği. 15+ yıllık deneyim, uzman doktorlar, modern teknoloji. Ücretsiz konsültasyon için hemen arayın!`;

  return {
    title,
    description,
    keywords: [
      operationInfo?.title || subMenu.title,
      'estetik cerrahi',
      'Türkiye estetik kliniği',
      'İstanbul estetik',
      'güvenli estetik',
      'uzman doktor',
      'modern teknoloji',
      'hasta memnuniyeti',
    ].join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'tr_TR',
      siteName: 'Veneta Clinic',
      images: [
        {
          url: operationInfo?.image || '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${
            operationInfo?.title || subMenu.title
          } - Veneta Clinic`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [operationInfo?.image || '/images/og-image.jpg'],
    },
    alternates: {
      canonical: `https://venetaclinic.com/ameliyatli-estetik/${category}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const ameliyatli = navigationItems.find(
    (item) => item.title === 'Ameliyatlı Estetik'
  );
  const subMenu = ameliyatli?.subMenus?.find(
    (sub) => sub.href.replace('/ameliyatli-estetik/', '') === category
  );

  if (!subMenu) return notFound();

  const operationInfo =
    operationData[category as keyof typeof operationData];

  return (
    <>
      <CategoryPageContent
        operationInfo={operationInfo}
        subMenu={subMenu}
      />
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
