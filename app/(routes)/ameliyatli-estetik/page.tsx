// app/(routes)/ameliyatli-estetik/page.tsx
import CategoryList from '@/components/CategoryComponent/CategoryList';
import { navigationItems } from '@/data/navigation';
import Image from 'next/image';
import {
  Phone,
  Users,
  Award,
  CheckCircle,
  Shield,
  Clock,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import WhatsAppButton from '@/components/Header/WhatsAppButton';
import PhoneButton from '@/components/Header/PhoneButton';

export default function AmeliyatliEstetikPage() {
  const ameliyatli = navigationItems.find(
    (item) => item.title === 'Ameliyatlı Estetik'
  );
  const categories =
    ameliyatli?.subMenus?.map((sub, i) => ({
      title: sub.title,
      href: `/ameliyatli-estetik/${sub.href.replace(
        '/ameliyatli-estetik/',
        ''
      )}`,
      description: `Alanında uzman doktorlarımızla ${sub.title} hakkında detaylı bilgi ve örnek vakalara ulaşın.`,
      image: `/images/ameliyatli-${i + 1}.jpeg`,
      badge: i === 0 ? 'Popüler' : i === 1 ? 'Yeni' : undefined,
    })) || [];

  return (
    <>
      <main className='container py-12'>
        {/* Hero Section */}
        <section className='flex flex-col-reverse md:flex-row items-center gap-12 mb-16'>
          <div className='flex-1 space-y-6'>
            <h1
              className='animate-title-slide-up'
              style={
                {
                  '--animation-delay': '200ms',
                } as React.CSSProperties
              }
            >
              Ameliyatlı Estetik İstanbul
              <span className='block text-primary mt-2'>
                Uzman Cerrahlarla Garantili Sonuç
              </span>
            </h1>
            <p className='text-lg text-muted-foreground animate-fade-up'>
              İstanbul&apos;da ameliyatlı estetik tedavileri için
              Veneta Klinik&apos;i tercih edin. Yüz, vücut ve meme
              estetiğinde en güncel teknikler, uzman cerrahlar ve
              uygun fiyatlarla doğal ve kalıcı sonuçlar elde edin.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 animate-fade-up'>
              <Link
                href='https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=veneta+klinik+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2'
                target='_blank'
                className='bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold 
                       shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
              >
                Müşteri Yorumları
              </Link>
              <Link
                href='tel:+902125612322'
                className='flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold 
                       shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
              >
                <Phone className='w-6 h-6' />
                0212 561 23 22
              </Link>
            </div>
          </div>
          <div className='flex-1 flex justify-center animate-float'>
            <Image
              src='/images/doctors-team.jpg'
              alt='Ameliyatlı Estetik - Veneta Klinik İstanbul'
              width={500}
              height={350}
              className='rounded-2xl shadow-2xl object-cover'
              priority
            />
          </div>
        </section>

        {/* Ana Özellikler */}
        <section className='grid md:grid-cols-3 gap-8 mb-16'>
          <div className='feature-card bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20'>
            <div className='icon-container w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300'>
              <Users className='w-8 h-8 text-primary' />
            </div>
            <h3 className='text-xl font-bold mb-3 text-foreground'>
              Uzman Cerrahlar
            </h3>
            <p className='text-muted-foreground'>
              15+ yıl deneyimli plastik cerrahlar tarafından uygulanan
              ameliyatlı estetik işlemleri
            </p>
          </div>
          <div className='feature-card bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 rounded-xl border border-secondary/20'>
            <div className='icon-container w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300'>
              <Award className='w-8 h-8 text-secondary-foreground' />
            </div>
            <h3 className='text-xl font-bold mb-3 text-foreground'>
              En Güncel Teknikler
            </h3>
            <p className='text-muted-foreground'>
              Dünya standartlarında ameliyatlı estetik teknikleri ve
              gelişmiş teknoloji
            </p>
          </div>
          <div className='feature-card bg-gradient-to-br from-accent/10 to-accent/5 p-8 rounded-xl border border-accent/20'>
            <div className='icon-container w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300'>
              <CheckCircle className='w-8 h-8 text-accent-foreground' />
            </div>
            <h3 className='text-xl font-bold mb-3 text-foreground'>
              Garantili Sonuç
            </h3>
            <p className='text-muted-foreground'>
              %95 başarı oranı ile doğal ve kalıcı estetik sonuçlar
            </p>
          </div>
        </section>

        {/* Kategori Kartları */}
        <section id='categories' className='mb-16'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4 text-foreground'>
              Ameliyatlı Estetik Kategorileri
            </h2>
            <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
              Yüz, vücut ve meme estetiğinde en güncel teknikler,
              uzman doktorlar ve gerçek hasta deneyimleriyle
              ameliyatlı estetik dünyasını keşfedin.
            </p>
          </div>
          <CategoryList categories={categories} />
        </section>

        {/* Detaylı İçerik */}
        <section className='max-w-6xl mx-auto space-y-12'>
          {/* Ameliyatlı Estetik Hakkında */}
          <div className='bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in'>
            <h2 className='mb-6'>Ameliyatlı Estetik Nedir?</h2>
            <p className='text-muted-foreground mb-8'>
              Ameliyatlı estetik, kişinin görünümünü iyileştirmek ve
              daha genç, daha güzel bir görünüm elde etmek amacıyla
              cerrahi yöntemlerle yapılan estetik işlemlerdir. Bu
              işlemler uzman plastik cerrahlar tarafından güvenli
              ortamlarda gerçekleştirilir.
            </p>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20'>
                <h4 className='font-semibold text-lg mb-4 text-foreground'>
                  Ameliyatlı Estetik Alanları
                </h4>
                <ul className='space-y-3 text-muted-foreground'>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    Yüz estetiği (Rinoplasti, Blefaroplasti)
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    Vücut estetiği (Liposuction, Abdominoplasti)
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    Meme estetiği (Meme büyütme, küçültme)
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    Saç ekimi ve saç estetiği
                  </li>
                </ul>
              </div>
              <div className='bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl border border-secondary/20'>
                <h4 className='font-semibold text-lg mb-4 text-foreground'>
                  Avantajları
                </h4>
                <ul className='space-y-3 text-muted-foreground'>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-secondary rounded-full'></span>
                    Kalıcı ve doğal sonuçlar
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-secondary rounded-full'></span>
                    Uzman cerrahlar tarafından uygulama
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-secondary rounded-full'></span>
                    Güvenli ve kontrollü ortam
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-secondary rounded-full'></span>
                    Kişiye özel tedavi planı
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nasıl Yapılır */}
          <div className='bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in'>
            <h2 className='mb-8 text-center'>
              Ameliyatlı Estetik Süreci Nasıl İşler?
            </h2>
            <div className='grid md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <span className='text-3xl font-bold text-primary'>
                    1
                  </span>
                </div>
                <h4 className='font-semibold mb-4 text-foreground'>
                  Muayene ve Planlama
                </h4>
                <p className='text-muted-foreground'>
                  Detaylı muayene sonrası kişiye özel tedavi planı
                  hazırlanır ve beklentiler belirlenir.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <span className='text-3xl font-bold text-secondary-foreground'>
                    2
                  </span>
                </div>
                <h4 className='font-semibold mb-4 text-foreground'>
                  Ameliyat Süreci
                </h4>
                <p className='text-muted-foreground'>
                  Uzman cerrah tarafından güvenli ortamda ameliyat
                  gerçekleştirilir, işlem süresi tedaviye göre
                  değişir.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <span className='text-3xl font-bold text-accent-foreground'>
                    3
                  </span>
                </div>
                <h4 className='font-semibold mb-4 text-foreground'>
                  İyileşme ve Sonuç
                </h4>
                <p className='text-muted-foreground'>
                  Düzenli kontroller ile iyileşme süreci takip edilir,
                  doğal ve kalıcı sonuçlar elde edilir.
                </p>
              </div>
            </div>
          </div>

          {/* Neden Biz */}
          <div className='bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20 animate-fade-in'>
            <h2 className='mb-8 text-center'>Neden Veneta Klinik?</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Clock className='w-8 h-8 text-primary' />
                </div>
                <h4 className='font-semibold mb-2 text-foreground'>
                  15+ Yıl Deneyim
                </h4>
                <p className='text-muted-foreground text-sm'>
                  Binlerce başarılı ameliyat
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Users className='w-8 h-8 text-secondary-foreground' />
                </div>
                <h4 className='font-semibold mb-2 text-foreground'>
                  Uzman Cerrahlar
                </h4>
                <p className='text-muted-foreground text-sm'>
                  Deneyimli plastik cerrahlar
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Shield className='w-8 h-8 text-accent-foreground' />
                </div>
                <h4 className='font-semibold mb-2 text-foreground'>
                  Güvenli Ortam
                </h4>
                <p className='text-muted-foreground text-sm'>
                  Modern ameliyathane
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Heart className='w-8 h-8 text-destructive' />
                </div>
                <h4 className='font-semibold mb-2 text-foreground'>
                  %100 Memnuniyet
                </h4>
                <p className='text-muted-foreground text-sm'>
                  Garantili sonuç
                </p>
              </div>
            </div>
          </div>

          {/* SSS */}
          <div className='bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in'>
            <h2 className='mb-8'>Sık Sorulan Sorular</h2>
            <div className='space-y-6'>
              <div className='border-b border-border pb-6'>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Ameliyatlı estetik işlemleri güvenli mi?
                </h4>
                <p className='text-muted-foreground'>
                  Evet, uzman cerrahlar tarafından güvenli ortamlarda
                  gerçekleştirilen ameliyatlı estetik işlemleri
                  oldukça güvenlidir.
                </p>
              </div>
              <div className='border-b border-border pb-6'>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  İyileşme süreci ne kadar sürer?
                </h4>
                <p className='text-muted-foreground'>
                  İyileşme süreci yapılan işleme göre değişir.
                  Genellikle 1-3 hafta arasında günlük hayata dönüş
                  sağlanır.
                </p>
              </div>
              <div className='border-b border-border pb-6'>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Hangi alanlarda ameliyatlı estetik yapılır?
                </h4>
                <p className='text-muted-foreground'>
                  Yüz, vücut, meme estetiği ve saç ekimi gibi birçok
                  alanda ameliyatlı estetik işlemleri uygulanabilir.
                </p>
              </div>
              <div className='border-b border-border pb-6'>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Sonuçlar ne kadar kalıcı?
                </h4>
                <p className='text-muted-foreground'>
                  Ameliyatlı estetik işlemlerinin sonuçları genellikle
                  kalıcıdır. Yaşlanma süreci devam eder ancak işlem
                  öncesine göre daha iyi görünüm korunur.
                </p>
              </div>
              <div>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Fiyatlar taksitli mi?
                </h4>
                <p className='text-muted-foreground'>
                  Evet, tüm ameliyatlı estetik işlemlerimiz için
                  taksit imkanı sunuyoruz. Detaylı bilgi için bizi
                  arayın.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className='bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-primary-foreground animate-fade-in'>
            <h2 className='mb-4'>Hemen Randevu Alın</h2>
            <p className='text-lg mb-8 opacity-90'>
              Ücretsiz muayene ve kişiye özel tedavi planı için hemen
              iletişime geçin
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                href='tel:+902125612322'
                className='flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105'
              >
                <Phone className='w-6 h-6' />
                0212 561 23 22
              </Link>
              <Link
                href='https://wa.me/905309153488'
                target='_blank'
                className='flex items-center gap-2 bg-green-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488' />
                </svg>{' '}
                WhatsApp
              </Link>
            </div>
          </div>
        </section>
      </main>
      <WhatsAppButton />
      <PhoneButton />
    </>
  );
}
