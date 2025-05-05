// app/(routes)/ameliyatli-estetik/[category]/[slug]/page.tsx
import BlogPost from '@/components/CategoryComponent/BlogPost';
import { navigationItems } from '@/data/navigation';
import { notFound } from 'next/navigation';

interface BlogPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export async function generateStaticParams(): Promise<
  { category: string; slug: string }[]
> {
  const ameliyatli = navigationItems.find(
    (item) => item.title === 'Ameliyatlı Estetik'
  );
  const params: { category: string; slug: string }[] = [];

  ameliyatli?.subMenus?.forEach((sub) => {
    sub.items.forEach((item) => {
      params.push({
        category: sub.href.replace('/ameliyatli-estetik/', ''),
        slug: item.href.split('/').pop() || '',
      });
    });
  });

  return params;
}

export default function BlogPage({ params }: BlogPageProps) {
  const ameliyatli = navigationItems.find(
    (item) => item.title === 'Ameliyatlı Estetik'
  );
  const subMenu = ameliyatli?.subMenus?.find(
    (sub) =>
      sub.href.replace('/ameliyatli-estetik/', '') === params.category
  );
  const post = subMenu?.items.find(
    (item) => item.href.split('/').pop() === params.slug
  );

  if (!post) return notFound();

  // Örnek içerik ve medya
  const content = `
   <header class="mb-10 text-center">
    <p class="text-lg text-muted-foreground">
      ${post.title}, burnun şeklini düzeltmek veya fonksiyonel sorunları gidermek amacıyla yapılan cerrahi bir estetik operasyondur.
    </p>
  </header>

  <section class="mb-8">
    <h2 class="text-2xl font-bold text-primary mb-3">${post.title} Neden Yapılır?</h2>
    <ul class="list-disc list-inside space-y-2 text-foreground">
      <li>Burun şeklinden memnun olmayan bireyler</li>
      <li>Travma sonrası burun deformasyonları</li>
      <li>Doğumsal burun şekil bozuklukları</li>
      <li>Nefes alma problemleri (deviasyon, burun eti büyümesi vb.)</li>
    </ul>
  </section>

  <section class="mb-8">
    <h2 class="text-2xl font-bold text-primary mb-3">${post.title} Nasıl Yapılır?</h2>
    <p class="text-foreground leading-relaxed">
      Burun estetiği operasyonları genellikle genel anestezi altında gerçekleştirilir. Açık veya kapalı teknikle yapılabilir. Cerrah, burnun kemik ve kıkırdak yapısını yeniden şekillendirerek hem estetik hem de fonksiyonel açıdan daha dengeli bir görünüm sağlar. Ameliyat süresi genellikle 1-2 saat arasında değişir.
    </p>
  </section>

  <section class="mb-8">
    <h2 class="text-2xl font-bold text-primary mb-3">${post.title} Sonrası İyileşme Süreci</h2>
    <ul class="list-decimal list-inside space-y-2 text-foreground">
      <li>İlk 1 hafta içinde şişlik ve morluklar görülebilir.</li>
      <li>7. günde tampon ve alçı çıkarılır.</li>
      <li>2 hafta içinde çoğu hasta günlük yaşantısına dönebilir.</li>
      <li>Burnun tam şeklini alması 6-12 ay sürebilir.</li>
    </ul>
  </section>

  <section class="mb-8">
    <h2 class="text-2xl font-bold text-primary mb-3">${post.title}'nin Avantajları</h2>
    <ul class="list-disc list-inside space-y-2 text-foreground">
      <li>Yüz hatlarıyla orantılı burun görünümü</li>
      <li>Artan özgüven ve psikolojik rahatlama</li>
      <li>Daha rahat nefes alma</li>
    </ul>
  </section>
  `;
  const featuredImage = '/images/burun-estetigi.jpg';
  const videoUrl =
    'https://www.youtube.com/embed/dyNpojnbNT4?si=dOj2Kf7eqT511lEd';
  const beforeAfterImages = [
    {
      before: '/images/burun-estetigi-before-after-1.jpg',
      after: '/images/burun-estetigi-before-after-2.jpg',
      label: 'Hasta 1',
    },
    {
      before: '/images/burun-estetigi-before-after-1.jpg',
      after: '/images/burun-estetigi-before-after-2.jpg',
      label: 'Hasta 2',
    },
  ];

  return (
    <main className='container py-12'>
      <BlogPost
        title={post.title}
        content={content}
        featuredImage={featuredImage}
        videoUrl={videoUrl}
        beforeAfterImages={beforeAfterImages}
      />
    </main>
  );
}
