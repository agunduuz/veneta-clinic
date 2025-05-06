// app/(routes)/ameliyatli-estetik/[category]/page.tsx
import CategoryDetail from '@/components/CategoryComponent/CategoryDetail';
import { navigationItems } from '@/data/navigation';
import { notFound } from 'next/navigation';
import Image from 'next/image';

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

export default async function BlogPage({
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

  // Her alt başlık için örnek görsel ve badge ekleyelim
  const subCategories = subMenu.items.map((item, idx) => ({
    title: item.title,
    href: `/ameliyatli-estetik/${category}/${item.href
      .split('/')
      .pop()}`,
    description: `${item.title} hakkında detaylı bilgi ve örnek vakalar için tıklayın.`,
    image: `/images/ameliyatli-${idx + 1}.jpeg`, // Her alt başlık için farklı görsel ekleyebilirsin
    badge: idx === 0 ? 'Popüler' : idx === 1 ? 'Yeni' : undefined,
  }));

  return (
    <main className='container py-12'>
      {/* Hero Section */}
      <section className='flex flex-col md:flex-row items-center gap-8 mb-12'>
        <div className='flex-1'>
          <h1 className='text-3xl md:text-4xl font-bold mb-4 animate-title-slide-up'>
            {subMenu.title}
          </h1>
          <p className='text-muted-foreground text-lg mb-6 animate-fade-up'>
            {subMenu.title} ile ilgili tüm alt başlıkları ve detayları
            aşağıda bulabilirsiniz. Her bir başlığa tıklayarak detaylı
            bilgi, hasta deneyimleri ve örnek görsellere
            ulaşabilirsiniz.
          </p>
        </div>
        <div className='flex-1 flex justify-center'>
          <Image
            src='/images/doctors-team.jpg'
            alt={subMenu.title}
            width={400}
            height={260}
            className='rounded-2xl shadow-lg object-cover animate-float'
            priority
          />
        </div>
      </section>

      {/* Alt Başlıklar */}
      <section>
        <CategoryDetail
          subCategories={subCategories}
          categoryTitle={subMenu.title}
        />
      </section>
    </main>
  );
}
