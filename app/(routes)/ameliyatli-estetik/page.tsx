// app/(routes)/ameliyatli-estetik/page.tsx
import CategoryList from '@/components/CategoryComponent/CategoryList';
import { navigationItems } from '@/data/navigation';
import Image from 'next/image';

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
    <main className='container py-12'>
      {/* Hero Section */}
      <section className='flex flex-col-reverse md:flex-row items-center gap-8 mb-12'>
        <div className='flex-1'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 animate-title-slide-up'>
            Ameliyatlı Estetik Kategorileri
          </h1>
          <p className='text-muted-foreground text-lg mb-6 animate-fade-up'>
            Yüz, vücut ve meme estetiğinde en güncel teknikler, uzman
            doktorlar ve gerçek hasta deneyimleriyle ameliyatlı
            estetik dünyasını keşfedin. Aşağıdaki kategorilerden
            ilginizi çeken başlığa tıklayarak detaylı bilgi ve örnek
            vakalara ulaşabilirsiniz.
          </p>
          <a
            href='#categories'
            className='inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full shadow hover:bg-primary/80 transition animate-float'
          >
            Kategorileri Keşfet
          </a>
        </div>
        <div className='flex-1 flex justify-center'>
          <Image
            src='/images/doctors-team.jpg'
            alt='Ameliyatlı Estetik'
            width={480}
            height={320}
            className='rounded-2xl shadow-lg object-cover animate-float'
            priority
          />
        </div>
      </section>

      {/* Kategori Kartları */}
      <section id='categories'>
        <CategoryList categories={categories} />
      </section>

      {/* SEO Açıklama Alanı */}
      <section className='mt-16 max-w-3xl mx-auto bg-muted rounded-2xl p-8 shadow animate-fade-in'>
        <h2 className='text-2xl md:text-3xl font-bold mb-4 text-foreground'>
          Ameliyatlı Estetikte Doğru Bilgi, Güvenli Sonuç
        </h2>
        <p className='text-muted-foreground text-lg mb-4'>
          Ameliyatlı estetik uygulamaları, kişiye özel planlama ve
          uzman cerrahlar eşliğinde gerçekleştirildiğinde hem doğal
          hem de kalıcı sonuçlar sunar. Yüz, vücut ve meme estetiği
          gibi farklı alanlarda, en güncel teknikler ve bilimsel
          yaklaşımlar ile hastalarımızın beklentilerini en üst düzeyde
          karşılıyoruz.
        </p>
        <p className='text-muted-foreground text-base'>
          Sitemizde yer alan tüm içerikler, alanında uzman
          doktorlarımız tarafından hazırlanmakta ve sürekli
          güncellenmektedir. Gerçek hasta deneyimleri, öncesi-sonrası
          görselleri ve detaylı bilgilendirme yazıları ile ameliyatlı
          estetik hakkında merak ettiğiniz her şeye ulaşabilirsiniz.
          Sağlığınız ve memnuniyetiniz bizim için önceliklidir.
        </p>
      </section>
    </main>
  );
}
