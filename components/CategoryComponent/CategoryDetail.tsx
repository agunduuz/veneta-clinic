// components/CategoryComponent/CategoryDetail.tsx
import Image from 'next/image';
import Link from 'next/link';

type SubCategory = {
  title: string;
  href: string;
  description?: string;
  image?: string;
  badge?: string;
};

export default function CategoryDetail({
  subCategories,
  categoryTitle,
}: {
  subCategories: SubCategory[];
  categoryTitle: string;
}) {
  return (
    <section>
      <h2 className='text-2xl md:text-3xl font-bold mb-8 text-foreground'>
        {categoryTitle} Alt Başlıkları
      </h2>
      <div className='flex flex-col gap-6'>
        {subCategories.map((sub, idx) => (
          <Link
            key={sub.title}
            href={sub.href}
            className='group flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 hover:-translate-y-1 animate-fade-in'
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Görsel veya ikon */}
            <div className='w-24 h-24 mb-4 md:mb-0 md:mr-6 flex-shrink-0 relative'>
              <Image
                src={sub.image || '/images/doctors-team.jpg'}
                alt={sub.title}
                fill
                className='object-cover rounded-xl'
                sizes='96px'
              />
              {/* {sub.badge && (
                <span className='absolute top-2 left-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow'>
                  {sub.badge}
                </span>
              )} */}
            </div>
            {/* Bilgi alanı */}
            <div className='flex-1 text-center md:text-left'>
              <h3 className='text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors'>
                {sub.title}
              </h3>
              {sub.description && (
                <p className='text-muted-foreground mb-2'>
                  {sub.description}
                </p>
              )}
              <span className='inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full group-hover:bg-primary group-hover:text-white transition mt-2'>
                Detayları Gör
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
