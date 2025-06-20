import Image from 'next/image';
import { Phone, Zap, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import PhoneButton from '@/components/Header/PhoneButton';
import WhatsAppButton from '@/components/Header/WhatsAppButton';
export default function LazerEpilasyonPage() {
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
              Lazer Epilasyon İstanbul
              <span className='block text-primary mt-2'>
                ALMA SOPRANO ile Garantili Sonuç
              </span>
            </h1>
            <p className='text-lg text-muted-foreground animate-fade-up'>
              İstanbul&apos;da lazer epilasyon tedavisi için Veneta
              Klinik&apos;i tercih edin. Dünya&apos;nın en gelişmiş
              ALMA SOPRANO lazer cihazı, uzman doktorlar ve uygun
              fiyatlarla kalıcı sonuçlar elde edin.
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
              src='/images/alma-soprano.webp'
              alt='ALMA SOPRANO Lazer Epilasyon Cihazı - Veneta Klinik'
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
              <Zap className='w-8 h-8 text-primary' />
            </div>
            <h3 className='text-xl font-bold mb-3 text-foreground'>
              ALMA SOPRANO Lazer
            </h3>
            <p className='text-muted-foreground'>
              Dünya&apos;nın en gelişmiş lazer epilasyon cihazı ile
              güvenli ve etkili tedavi
            </p>
          </div>
          <div className='feature-card bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 rounded-xl border border-secondary/20'>
            <div className='icon-container w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4 transition-transform duration-300'>
              <Users className='w-8 h-8 text-secondary-foreground' />
            </div>
            <h3 className='text-xl font-bold mb-3 text-foreground'>
              Uzman Doktorlar
            </h3>
            <p className='text-muted-foreground'>
              15+ yıl deneyimli dermatologlar tarafından uygulanan
              tedaviler
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
              %95 başarı oranı ile kalıcı kıl azaltma garantisi
            </p>
          </div>
        </section>

        {/* Detaylı İçerik */}
        <section className='max-w-6xl mx-auto space-y-12'>
          {/* ALMA SOPRANO Cihazı */}
          <div className='bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in'>
            <h2 className='mb-6'>
              ALMA SOPRANO Lazer Epilasyon Cihazı
            </h2>
            <p className='text-muted-foreground mb-8'>
              Veneta Klinik&apos;te kullanılan ALMA SOPRANO lazer
              epilasyon cihazı, dünya standartlarında en gelişmiş
              teknolojiye sahiptir. FDA onaylı bu cihaz, tüm cilt
              tipleri ve kıl renkleri için güvenle kullanılabilir.
            </p>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20'>
                <h4 className='font-semibold text-lg mb-4 text-foreground'>
                  ALMA SOPRANO Özellikleri
                </h4>
                <ul className='space-y-3 text-muted-foreground'>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    755nm, 810nm, 1064nm dalga boyları
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    Tüm cilt tipleri için uygun
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    Minimal ağrı ve yan etki
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-primary rounded-full'></span>
                    FDA ve CE onaylı
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
                    %95 başarı oranı
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-secondary rounded-full'></span>
                    Daha az seans sayısı
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-secondary rounded-full'></span>
                    Kalıcı sonuç garantisi
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-secondary rounded-full'></span>
                    Tüm mevsimlerde uygulanabilir
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nasıl Yapılır */}
          <div className='bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in'>
            <h2 className='mb-8 text-center'>
              Lazer Epilasyon Nasıl Yapılır?
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
                  Cilt tipiniz ve kıl yapınız analiz edilir, kişiye
                  özel tedavi planı hazırlanır.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <span className='text-3xl font-bold text-secondary-foreground'>
                    2
                  </span>
                </div>
                <h4 className='font-semibold mb-4 text-foreground'>
                  Lazer Uygulaması
                </h4>
                <p className='text-muted-foreground'>
                  ALMA SOPRANO cihazı ile hedef bölgeye lazer ışını
                  uygulanır, işlem 15-60 dakika sürer.
                </p>
              </div>
              <div className='text-center'>
                <div className='w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <span className='text-3xl font-bold text-accent-foreground'>
                    3
                  </span>
                </div>
                <h4 className='font-semibold mb-4 text-foreground'>
                  Takip ve Sonuç
                </h4>
                <p className='text-muted-foreground'>
                  6-8 seans sonrası kalıcı kıl azalması elde edilir,
                  düzenli takip yapılır.
                </p>
              </div>
            </div>
          </div>

          {/* Sonrası Bakım */}
          <div className='bg-card rounded-2xl p-8 shadow-lg border border-border animate-fade-in'>
            <h2 className='mb-8'>Lazer Epilasyon Sonrası Bakım</h2>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-800'>
                <h4 className='font-semibold text-lg mb-4 text-green-800 dark:text-green-200'>
                  Yapılması Gerekenler
                </h4>
                <ul className='space-y-3 text-green-700 dark:text-green-300'>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    Güneş koruyucu kullanın (SPF 30+)
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    Soğuk kompres uygulayın
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    Nemlendirici kullanın
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                    Bol su için
                  </li>
                </ul>
              </div>
              <div className='bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-xl border border-red-200 dark:border-red-800'>
                <h4 className='font-semibold text-lg mb-4 text-red-800 dark:text-red-200'>
                  Kaçınılması Gerekenler
                </h4>
                <ul className='space-y-3 text-red-700 dark:text-red-300'>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-red-500 rounded-full'></span>
                    Güneşe maruz kalmayın
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-red-500 rounded-full'></span>
                    Sıcak duş almayın
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-red-500 rounded-full'></span>
                    Kıl çekme işlemi yapmayın
                  </li>
                  <li className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-red-500 rounded-full'></span>
                    Ağır egzersiz yapmayın
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
                  <svg
                    className='w-8 h-8 text-primary'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <h4 className='font-semibold mb-2 text-foreground'>
                  15+ Yıl Deneyim
                </h4>
                <p className='text-muted-foreground text-sm'>
                  Binlerce başarılı vaka
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-secondary-foreground'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 10V3L4 14h7v7l9-11h-7z'
                    />
                  </svg>
                </div>
                <h4 className='font-semibold mb-2 text-foreground'>
                  ALMA SOPRANO
                </h4>
                <p className='text-muted-foreground text-sm'>
                  Dünya&apos;nın en gelişmiş lazer cihazı
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-accent-foreground'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                    />
                  </svg>
                </div>
                <h4 className='font-semibold mb-2 text-foreground'>
                  Uygun Fiyat
                </h4>
                <p className='text-muted-foreground text-sm'>
                  Taksit imkanı
                </p>
              </div>
              <div className='text-center'>
                <div className='w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg
                    className='w-8 h-8 text-destructive'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                    />
                  </svg>
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
                  Lazer epilasyon kaç seans sürer?
                </h4>
                <p className='text-muted-foreground'>
                  Genellikle 6-8 seans yeterlidir. Kıl yoğunluğu ve
                  cilt tipine göre değişebilir.
                </p>
              </div>
              <div className='border-b border-border pb-6'>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Lazer epilasyon ağrılı mı?
                </h4>
                <p className='text-muted-foreground'>
                  ALMA SOPRANO cihazı sayesinde minimal ağrı
                  hissedilir. Soğutma sistemi ile rahat bir deneyim
                  sunuyoruz.
                </p>
              </div>
              <div className='border-b border-border pb-6'>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Hangi lazer cihazını kullanıyorsunuz?
                </h4>
                <p className='text-muted-foreground'>
                  ALMA SOPRANO lazer epilasyon cihazı kullanıyoruz. Bu
                  cihaz dünya&apos;nın en gelişmiş teknolojisine sahip
                  olup, tüm cilt tipleri için güvenle uygulanabilir.
                </p>
              </div>
              <div className='border-b border-border pb-6'>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Hangi bölgeler için uygundur?
                </h4>
                <p className='text-muted-foreground'>
                  Yüz, bacak, koltuk altı, bikini, sırt, göğüs ve
                  kollar için güvenle uygulanabilir.
                </p>
              </div>
              <div className='border-b border-border pb-6'>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Sonuçlar ne kadar kalıcı?
                </h4>
                <p className='text-muted-foreground'>
                  Tamamlanan tedavi sonrası %80-90 oranında kalıcı kıl
                  azalması elde edilir.
                </p>
              </div>
              <div>
                <h4 className='font-semibold text-lg mb-3 text-foreground'>
                  Fiyatlar taksitli mi?
                </h4>
                <p className='text-muted-foreground'>
                  Evet, tüm tedavilerimiz için taksit imkanı
                  sunuyoruz. Detaylı bilgi için bizi arayın.
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
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
