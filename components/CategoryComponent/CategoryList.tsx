// components/CategoryComponent/CategoryList.tsx
import Image from 'next/image';

type Category = {
  title: string;
  href: string;
  description?: string;
  image?: string;
  badge?: string;
};

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className='grid md:grid-cols-3 gap-8'>
      {categories.map((cat, idx) => (
        <a
          key={cat.title}
          href={cat.href}
          className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center hover:-translate-y-1 animate-fade-in'
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className='w-full h-40 mb-4 relative'>
            <Image
              src={cat.image || '/images/doctors-team.jpg'}
              alt={cat.title}
              fill
              className='object-cover rounded-xl'
              sizes='(max-width: 768px) 100vw, 33vw'
            />
            {cat.badge && (
              <span className='absolute top-2 left-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow'>
                {cat.badge}
              </span>
            )}
          </div>
          <h2 className='text-xl font-bold mb-2 group-hover:text-primary transition-colors'>
            {cat.title}
          </h2>
          <p className='text-muted-foreground mb-4'>
            {cat.description}
          </p>
          <span className='inline-block mt-auto bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full group-hover:bg-primary group-hover:text-white transition'>
            Detayları Gör
          </span>
        </a>
      ))}
    </div>
  );
}
