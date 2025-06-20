// app/(routes)/ameliyatli-estetik/[category]/page.tsx
import { navigationItems } from '@/data/navigation';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Award,
  Users,
  Clock,
  Shield,
  Star,
  CheckCircle,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Zap,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import PhoneButton from '@/components/Header/PhoneButton';
import WhatsAppButton from '@/components/WhatsAppButton';

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

  const stats = [
    { icon: Users, value: '15,000+', label: 'Mutlu Hasta' },
    { icon: Award, value: '15+', label: 'Yıllık Deneyim' },
    { icon: Star, value: '4.9/5', label: 'Hasta Puanı' },
    { icon: Shield, value: '100%', label: 'Güvenlik' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Modern Teknoloji',
      description: 'En son teknolojik cihazlar ve yöntemler',
    },
    {
      icon: Heart,
      title: 'Hasta Odaklı',
      description: 'Her hastanın özel ihtiyaçlarına göre planlama',
    },
    {
      icon: Clock,
      title: 'Hızlı İyileşme',
      description: 'Minimal invaziv yöntemlerle hızlı toparlanma',
    },
    {
      icon: TrendingUp,
      title: 'Kanıtlanmış Sonuçlar',
      description: 'Bilimsel araştırmalarla desteklenen yöntemler',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden'>
        <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
        <div className='container py-16 md:py-24 relative z-10'>
          <div className='flex flex-col lg:flex-row items-center gap-12'>
            <div className='flex-1 space-y-6'>
              <div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-fade-in'>
                <Award className='h-4 w-4' />
                Türkiye&apos;nin En İyi Estetik Kliniği
              </div>

              <h1 className='text-4xl md:text-6xl font-bold leading-tight animate-title-slide-up'>
                {operationInfo?.title || subMenu.title}
                <span className='block text-primary'>
                  Uzman Doktorlar
                </span>
              </h1>

              <p className='text-xl text-muted-foreground leading-relaxed animate-fade-up'>
                15+ yıllık deneyimimiz ve modern teknolojimizle{' '}
                {operationInfo?.title || subMenu.title.toLowerCase()}{' '}
                konusunda Türkiye&apos;nin lider kliniği olarak hizmet
                veriyoruz. Güvenli, etkili ve doğal sonuçlar için
                uzman ekibimizle tanışın.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 animate-fade-up'>
                <Link
                  href='tel:+902125612322'
                  target='_blank'
                  className='bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg'
                >
                  <Phone className='h-5 w-5 inline mr-2' />
                  Ücretsiz Konsültasyon
                </Link>
                <Link
                  href='https://wa.me/905309153488'
                  target='_blank'
                  className='border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300'
                >
                  <Calendar className='h-5 w-5 inline mr-2' />
                  Randevu Al
                </Link>
              </div>
            </div>

            <div className='flex-1 flex justify-center'>
              <div className='relative'>
                <Image
                  src={
                    operationInfo?.image || '/images/doctors-team.jpg'
                  }
                  alt={`${
                    operationInfo?.title || subMenu.title
                  } - Veneta Clinic Uzman Doktorları`}
                  width={500}
                  height={400}
                  className='rounded-2xl shadow-2xl object-cover animate-float'
                  priority
                />
                <div className='absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg animate-slide-in-right'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                      <Star className='h-6 w-6 text-primary' />
                    </div>
                    <div>
                      <p className='font-bold text-lg'>4.9/5</p>
                      <p className='text-sm text-muted-foreground'>
                        Hasta Puanı
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-muted/30'>
        <div className='container'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className='stats-card text-center animate-fade-in'
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <stat.icon className='h-8 w-8 text-primary mx-auto mb-2' />
                <div className='text-2xl font-bold text-foreground'>
                  {stat.value}
                </div>
                <div className='text-sm text-muted-foreground'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Neden Veneta Clinic?
            </h2>
            <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
              Türkiye&apos;nin en güvenilir estetik kliniği olarak,
              her hastamıza en yüksek kalitede hizmet sunuyoruz.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className='feature-card bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in'
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className='icon-container w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 transition-transform duration-300'>
                  <feature.icon className='h-8 w-8 text-primary' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>
                  {feature.title}
                </h3>
                <p className='text-muted-foreground'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className='py-16 bg-gradient-to-r from-primary/5 to-secondary/5'>
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6'>
              <h2 className='text-3xl md:text-4xl font-bold'>
                {operationInfo?.title || subMenu.title} Konusunda
                Neden Bizi Seçmelisiniz?
              </h2>
              <p className='text-lg text-muted-foreground'>
                Uzman doktorlarımız, modern teknolojimiz ve hasta
                odaklı yaklaşımımızla en güvenli ve etkili tedavi
                yöntemlerini uyguluyoruz.
              </p>

              <div className='space-y-4'>
                {[
                  'Uzman ve deneyimli doktor kadrosu',
                  'Modern ve güvenli teknoloji',
                  'Kişiselleştirilmiş tedavi planları',
                  'Hızlı iyileşme süreçleri',
                  'Sürekli hasta takibi',
                  'Uygun fiyat garantisi',
                ].map((item, idx) => (
                  <div
                    key={item}
                    className='flex items-center gap-3 animate-fade-in'
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <CheckCircle className='h-5 w-5 text-primary flex-shrink-0' />
                    <span className='text-foreground'>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className='relative'>
              <Image
                src='/images/klinik-resimleri.jpeg'
                alt='Veneta Clinic Modern Klinik Ortamı'
                width={600}
                height={400}
                className='rounded-2xl shadow-xl object-cover'
              />
              <div className='absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg'>
                <div className='flex items-center gap-3'>
                  <MapPin className='h-5 w-5 text-primary' />
                  <div>
                    <p className='font-semibold'>
                      İstanbul, Nişantaşı
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      Merkezi Konum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className='py-16 bg-gradient-to-r from-primary/5 to-secondary/5'>
        <div className='container'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-3xl md:text-4xl font-bold mb-8 text-center'>
              {operationInfo?.title || subMenu.title} -
              Türkiye&apos;nin En İyi Estetik Kliniği
            </h1>

            <div className='prose prose-lg max-w-none'>
              <h2 className='text-2xl md:text-3xl font-bold mb-6 text-primary'>
                {operationInfo?.title || subMenu.title} Nedir?
              </h2>
              <p className='text-lg text-muted-foreground mb-8 leading-relaxed'>
                {operationInfo?.description ||
                  `${subMenu.title}, modern tıbbi teknolojiler ve uzman doktor kadromuzla gerçekleştirilen 
                güvenli ve etkili estetik cerrahi işlemlerinden biridir. 15+ yıllık deneyimimizle, 
                her hastanın özel ihtiyaçlarına göre kişiselleştirilmiş tedavi planları hazırlıyoruz.`}
              </p>

              <h2 className='text-2xl md:text-3xl font-bold mb-6 text-primary'>
                {operationInfo?.title || subMenu.title} Avantajları
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                {operationInfo?.advantages?.map((advantage, idx) => (
                  <div
                    key={idx}
                    className='bg-white rounded-xl p-6 shadow-lg'
                  >
                    <h3 className='text-xl font-semibold mb-3 text-foreground'>
                      {advantage}
                    </h3>
                    <p className='text-muted-foreground'>
                      {operationInfo?.title || subMenu.title} ile elde
                      edilen önemli faydalardan biridir.
                    </p>
                  </div>
                )) || [
                  <div
                    key='1'
                    className='bg-white rounded-xl p-6 shadow-lg'
                  >
                    <h3 className='text-xl font-semibold mb-3 text-foreground'>
                      Güvenli Teknoloji
                    </h3>
                    <p className='text-muted-foreground'>
                      En son teknolojik cihazlar ve minimal invaziv
                      yöntemlerle güvenli operasyonlar.
                    </p>
                  </div>,
                  <div
                    key='2'
                    className='bg-white rounded-xl p-6 shadow-lg'
                  >
                    <h3 className='text-xl font-semibold mb-3 text-foreground'>
                      Uzman Doktorlar
                    </h3>
                    <p className='text-muted-foreground'>
                      Alanında uzman ve deneyimli cerrahlarımızla
                      profesyonel hizmet.
                    </p>
                  </div>,
                ]}
              </div>

              <h2 className='text-2xl md:text-3xl font-bold mb-6 text-primary'>
                {operationInfo?.title || subMenu.title} Süreci
              </h2>
              <div className='space-y-6 mb-8'>
                {operationInfo?.process?.map((step, idx) => (
                  <div key={idx} className='flex items-start gap-4'>
                    <div className='w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1'>
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold mb-2'>
                        {step.step}
                      </h3>
                      <p className='text-muted-foreground'>
                        {step.description}
                      </p>
                    </div>
                  </div>
                )) || [
                  <div key='1' className='flex items-start gap-4'>
                    <div className='w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1'>
                      1
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold mb-2'>
                        İlk Konsültasyon
                      </h3>
                      <p className='text-muted-foreground'>
                        Uzman doktorumuzla detaylı görüşme ve
                        kişiselleştirilmiş tedavi planı hazırlama.
                      </p>
                    </div>
                  </div>,
                ]}
              </div>

              <h2 className='text-2xl md:text-3xl font-bold mb-6 text-primary'>
                {operationInfo?.title || subMenu.title} Fiyatları
              </h2>
              <p className='text-lg text-muted-foreground mb-6'>
                {operationInfo?.title || subMenu.title} fiyatları,
                hastanın özel durumuna ve işlemin kapsamına göre
                değişiklik gösterebilir. Detaylı bilgi ve fiyat
                teklifi için ücretsiz konsültasyon randevusu
                alabilirsiniz.
              </p>

              <div className='bg-primary/10 rounded-xl p-6 mb-8'>
                <h3 className='text-xl font-semibold mb-3 text-primary'>
                  Neden Veneta Clinic&apos;i Seçmelisiniz?
                </h3>
                <ul className='space-y-2 text-muted-foreground'>
                  <li className='flex items-center gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary flex-shrink-0' />
                    15+ yıllık deneyim ve uzman kadro
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary flex-shrink-0' />
                    Modern teknoloji ve güvenli ortam
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary flex-shrink-0' />
                    Kişiselleştirilmiş tedavi planları
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary flex-shrink-0' />
                    Sürekli hasta takibi ve destek
                  </li>
                </ul>
              </div>

              <h2 className='text-2xl md:text-3xl font-bold mb-6 text-primary'>
                {operationInfo?.title || subMenu.title} Hakkında Sık
                Sorulan Sorular
              </h2>
              <div className='space-y-4 mb-8'>
                {operationInfo?.faqs?.map((faq, idx) => (
                  <div
                    key={idx}
                    className='bg-white rounded-xl p-6 shadow-lg'
                  >
                    <h3 className='text-xl font-semibold mb-2 text-foreground'>
                      {faq.question}
                    </h3>
                    <p className='text-muted-foreground'>
                      {faq.answer}
                    </p>
                  </div>
                )) || [
                  <div
                    key='1'
                    className='bg-white rounded-xl p-6 shadow-lg'
                  >
                    <h3 className='text-xl font-semibold mb-2 text-foreground'>
                      {operationInfo?.title || subMenu.title} ne kadar
                      sürer?
                    </h3>
                    <p className='text-muted-foreground'>
                      Operasyon süresi hastanın durumuna göre 1-3 saat
                      arasında değişmektedir.
                    </p>
                  </div>,
                ]}
              </div>

              <div className='text-center bg-primary text-primary-foreground rounded-2xl p-8'>
                <h2 className='text-2xl md:text-3xl font-bold mb-4'>
                  {operationInfo?.title || subMenu.title} İçin Hemen
                  İletişime Geçin
                </h2>
                <p className='text-lg mb-6 opacity-90'>
                  Uzman doktorlarımızla ücretsiz konsültasyon için
                  hemen arayın veya WhatsApp&apos;tan mesaj gönderin.
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Link
                    href='tel:+902125612322'
                    className='bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300'
                  >
                    <Phone className='h-5 w-5 inline mr-2' />
                    Hemen Ara
                  </Link>
                  <Link
                    href='https://wa.me/905309153488'
                    target='_blank'
                    className='border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300'
                  >
                    WhatsApp&apos;tan Mesaj
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
