import Image from 'next/image';

type BlogPostProps = {
  title: string;
  content: string; // HTML string
  featuredImage?: string;
  videoUrl?: string;
  beforeAfterImages?: {
    before: string;
    after: string;
    label?: string;
  }[];
};

export default function BlogPost({
  title,
  content,
  featuredImage,
  videoUrl,
  beforeAfterImages,
}: BlogPostProps) {
  return (
    <article className='max-w-full mx-auto bg-white rounded-2xl shadow p-6 md:p-12 mb-12'>
      <header className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold mb-4 text-foreground'>
          {title}
        </h1>
      </header>

      {/* İçerik ve medya blokları */}
      <div className='prose prose-lg max-w-none text-foreground mb-8'>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* Before & After Alanı */}
      {beforeAfterImages && beforeAfterImages.length > 0 && (
        <section className='my-12'>
          <h2 className='text-2xl font-bold mb-6 text-foreground'>
            Before & After
          </h2>
          <div className='grid md:grid-cols-2 gap-8'>
            {beforeAfterImages.map((img, i) => (
              <div
                key={i}
                className='flex flex-col md:flex-row items-center bg-muted rounded-xl p-4 shadow'
              >
                <div className='flex-1 flex flex-col items-center mb-4 md:mb-0 md:mr-4'>
                  <Image
                    width={200}
                    height={200}
                    src={img.before}
                    alt='Önce'
                    className='rounded-xl shadow mb-2'
                  />
                  <span className='text-sm text-muted-foreground mb-2'>
                    {img.label ? `${img.label} Önce` : 'Önce'}
                  </span>
                </div>
                <div className='flex-1 flex flex-col items-center'>
                  <Image
                    width={200}
                    height={200}
                    src={img.after}
                    alt='Sonra'
                    className='rounded-xl shadow'
                  />
                  <span className='text-sm text-muted-foreground'>
                    {img.label ? `${img.label} Sonra` : 'Sonra'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-8'>
            {featuredImage && (
              <div className='w-full h-64 md:h-80 relative mb-6 rounded-xl overflow-hidden'>
                <Image
                  src={featuredImage}
                  alt={title}
                  fill
                  className='object-cover'
                  priority
                  sizes='(max-width: 768px) 100vw, 700px'
                />
              </div>
            )}
            {videoUrl && (
              <div className='w-full aspect-video mb-6 rounded-xl overflow-hidden'>
                <iframe
                  src={videoUrl}
                  title='Video'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  className='w-full h-full'
                />
              </div>
            )}
          </div>
        </section>
      )}
    </article>
  );
}
