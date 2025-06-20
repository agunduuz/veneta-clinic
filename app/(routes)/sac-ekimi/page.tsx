import Image from 'next/image';
import {
  Phone,
  Users,
  CheckCircle,
  Scissors,
  Heart,
  Shield,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import PhoneButton from '@/components/Header/PhoneButton';
import WhatsAppButton from '@/components/Header/WhatsAppButton';

export default function SacEkimiPage() {
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
              Saç Ekimi İstanbul
              <span className='block text-primary mt-2'>
                FUE Tekniği ile Doğal Sonuçlar
              </span>
            </h1>
            <p className='text-lg text-muted-foreground animate-fade-up'>
              İstanbul&apos;da saç ekimi tedavisi için Veneta
              Klinik&apos;i tercih edin. En gelişmiş FUE tekniği,
              uzman cerrahlar ve doğal sonuçlarla kalıcı saç
              restorasyonu elde edin.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 animate-fade-up'>
              <Link
                href='https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=lassarium+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2'
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
              src='/images/hair-transplant.jpg'
              alt='Saç Ekimi - Veneta Klinik'
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
              <Scissors className='w-8 h-8 text-primary' />
            </div>
            <h3 className='text-xl font-bold mb-3 text-foreground'>
              FUE Tekniği
            </h3>
            <p className='text-muted-foreground'>
              En gelişmiş saç ekimi tekniği ile doğal ve kalıcı
              sonuçlar
            </p>
          </div>
          <div className='feature-card bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 rounded-xl border border-secondary/20'>
            <div className='icon-container w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300'>
              <Users className='w-8 h-8 text-secondary-foreground' />
            </div>
            <h3 className='text-xl font-bold mb-3 text-foreground'>
              Uzman Cerrahlar
            </h3>
            <p className='text-muted-foreground'>
              15+ yıl deneyimli plastik cerrahlar tarafından uygulanan
              operasyonlar
            </p>
          </div>
          <div className='feature-card bg-gradient-to-br from-accent/10 to-accent/5 p-8 rounded-xl border border-accent/20'>
            <div className='icon-container w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300'>
              <CheckCircle className='w-8 h-8 text-accent-foreground' />
            </div>
            <h3 className='text-xl font-bold mb-3 text-foreground'>
              %95 Başarı Oranı
            </h3>
            <p className='text-muted-foreground'>
              Binlerce başarılı vaka ile kanıtlanmış sonuçlar
            </p>
          </div>
        </section>

        {/* Detaylı İçerik */}
        <section className='max-w-6xl mx-auto space-y-12'>
          {/* FUE Tekniği */}
          <div className='bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in'>
            <h2 className='mb-6'>
              FUE (Follicular Unit Extraction) Saç Ekimi Tekniği
            </h2>
            <p className='text-muted-foreground mb-8'>
              Veneta Klinik&apos;te kullanılan FUE tekniği, saç ekimi
              alanında en gelişmiş ve güvenli yöntemdir. Bu teknik ile
              saç kökleri tek tek alınarak saçsız bölgelere
              nakledilir, doğal görünüm elde edilir.
            </p>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20'>
                <h4 className='font-semibold text-lg mb-4 text-foreground'>
                  FUE Tekniğinin Avantajları
                </h4>
                <ul className='space-y-3 text-muted-foreground'>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    İz bırakmayan minimal invaziv teknik
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    Doğal saç çizgisi oluşturma
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    Hızlı iyileşme süreci
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    Yüksek saç kökü canlılığı
                  </li>
                </ul>
              </div>
              <div className='bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 rounded-xl border border-secondary/20'>
                <h4 className='font-semibold text-lg mb-4 text-foreground'>
                  Uygulama Alanları
                </h4>
                <ul className='space-y-3 text-muted-foreground'>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-secondary rounded-full'></span>
                    Erkek tipi saç dökülmesi
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-secondary rounded-full'></span>
                    Kadın tipi saç dökülmesi
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-secondary rounded-full'></span>
                    Kaş ve sakal ekimi
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-secondary rounded-full'></span>
                    Yara izi ve yanık tedavisi
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nasıl Yapılır */}
          <div className='bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in'>
            <h2 className='mb-8 text-center'>
              Saç Ekimi Nasıl Yapılır?
            </h2>
            <div className='grid md:grid-cols-4 gap-8'>
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
                  Saç dökülme tipi analiz edilir, kişiye özel tedavi
                  planı hazırlanır.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <span className='text-3xl font-bold text-secondary-foreground'>
                    2
                  </span>
                </div>
                <h4 className='font-semibold mb-4 text-foreground'>
                  Saç Kökü Alma
                </h4>
                <p className='text-muted-foreground'>
                  FUE tekniği ile saç kökleri tek tek alınır, özel
                  solüsyonlarda korunur.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <span className='text-3xl font-bold text-accent-foreground'>
                    3
                  </span>
                </div>
                <h4 className='font-semibold mb-4 text-foreground'>
                  Saç Kökü Ekimi
                </h4>
                <p className='text-muted-foreground'>
                  Mikroskop altında saç kökleri doğal açılarla ekilir.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <span className='text-3xl font-bold text-destructive'>
                    4
                  </span>
                </div>
                <h4 className='font-semibold mb-4 text-foreground'>
                  Takip ve Sonuç
                </h4>
                <p className='text-muted-foreground'>
                  6-12 ay sonra doğal saçlar çıkar, düzenli takip
                  yapılır.
                </p>
              </div>
            </div>
          </div>

          {/* Sonrası Bakım */}
          <div className='bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in'>
            <h2 className='mb-8'>Saç Ekimi Sonrası Bakım</h2>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
                <h4 className='font-semibold text-lg mb-4 text-green-800 dark:text-green-200'>
                  İlk 7 Gün
                </h4>
                <ul className='space-y-3 text-green-700 dark:text-green-300'>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    Başı yüksekte tutun
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    Soğuk kompres uygulayın
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    Reçeteli ilaçları kullanın
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    Saçları yıkamayın
                  </li>
                </ul>
              </div>
              <div className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800'>
                <h4 className='font-semibold text-lg mb-4 text-blue-800 dark:text-blue-200'>
                  1-3 Ay Sonrası
                </h4>
                <ul className='space-y-3 text-blue-700 dark:text-blue-300'>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                    Özel şampuan kullanın
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                    Güneşten koruyun
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                    Saç kökleri çıkmaya başlar
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                    Düzenli kontroller
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Neden Biz */}
          <div className='bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/20 animate-fade-in'>
            <h2 className='mb-8 text-center'>Neden Veneta Klinik?</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <div className='text-center'>
                <div className='w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Heart className='w-8 h-8 text-primary' />
                </div>
                <h4 className='font-semibold mb-2 text-foreground'>
                  15+ Yıl Deneyim
                </h4>
                <p className='text-muted-foreground text-sm'>
                  Binlerce başarılı saç ekimi
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Scissors className='w-8 h-8 text-secondary-foreground' />
                </div>
                <h4 className='font-semibold mb-2 text-foreground'>
                  FUE Tekniği
                </h4>
                <p className='text-muted-foreground text-sm'>
                  En gelişmiş saç ekimi yöntemi
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
                  Steril ameliyathane
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Clock className='w-8 h-8 text-destructive' />
                </div>
                <h4 className='font-semibold mb-2 text-foreground'>
                  Ömür Boyu Garanti
                </h4>
                <p className='text-muted-foreground text-sm'>
                  Kalıcı sonuç garantisi
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
                  Saç ekimi ağrılı bir işlem mi?
                </h4>
                <p className='text-muted-foreground'>
                  Lokal anestezi altında yapıldığı için ağrı
                  hissedilmez. Sadece hafif bir baskı hissi olabilir.
                </p>
              </div>
              <div className='border-b border-border pb-6'>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Saç ekimi sonrası ne kadar sürede sonuç alınır?
                </h4>
                <p className='text-muted-foreground'>
                  İlk 3 ay saç kökleri çıkmaya başlar, 6-12 ay sonra
                  tam sonuç elde edilir.
                </p>
              </div>
              <div className='border-b border-border pb-6'>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Hangi yaş grubu için uygundur?
                </h4>
                <p className='text-muted-foreground'>
                  25-65 yaş arası erkekler ve kadınlar için uygundur.
                  Saç dökülme durumuna göre değerlendirme yapılır.
                </p>
              </div>
              <div className='border-b border-border pb-6'>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Kaç saç kökü ekilebilir?
                </h4>
                <p className='text-muted-foreground'>
                  Kişinin saç yoğunluğuna göre 2000-5000 saç kökü tek
                  seansında ekilebilir.
                </p>
              </div>
              <div className='border-b border-border pb-6'>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Saç ekimi sonrası normal hayata ne zaman dönülür?
                </h4>
                <p className='text-muted-foreground'>
                  1 hafta sonra normal aktivitelere dönülebilir, 2-3
                  hafta sonra spor yapılabilir.
                </p>
              </div>
              <div>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Fiyatlar taksitli mi?
                </h4>
                <p className='text-muted-foreground'>
                  Evet, tüm saç ekimi tedavilerimiz için taksit imkanı
                  sunuyoruz. Detaylı bilgi için bizi arayın.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className='bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-center text-primary-foreground animate-fade-in'>
            <h2 className='mb-4'>Hemen Randevu Alın</h2>
            <p className='text-lg mb-8 opacity-90'>
              Ücretsiz muayene ve kişiye özel saç ekimi planı için
              hemen iletişime geçin
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
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
