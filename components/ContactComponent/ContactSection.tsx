import Image from 'next/image';

const avatars = [
  '/images/avatar1.png',
  '/images/avatar2.png',
  '/images/avatar3.png',
  '/images/avatar4.png',
  '/images/avatar5.png',
];

export default function ContactSection() {
  return (
    <section className='container py-12'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Sol Bilgi Alanı */}
        <div className='flex-1'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Sağlık İhtiyaçlarınız İçin Bizimle İletişime Geçin
          </h2>
          <p className='mb-6 text-muted-foreground'>
            Destek, geri bildirim veya randevu için bize ulaşın. Formu
            doldurun, ziyaretinizi onaylayalım ve sağlık
            profesyonellerimizle buluşun.
          </p>
          <div className='flex items-center gap-2 mb-4 flex-col lg:flex-row'>
            <div className='flex -space-x-2'>
              {avatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt='Doktor'
                  width={40}
                  height={40}
                  className='rounded-full border-2 border-white shadow'
                />
              ))}
            </div>
            <span className='ml-4 bg-secondary px-4 py-2 rounded-full font-medium text-foreground'>
              215+ doktor ile konuşun
            </span>
          </div>
          <div className='flex items-center mb-2'>
            <span className='text-yellow-400 text-xl mr-2'>★</span>
            <span className='font-bold'>(4.8)</span>
            <span className='ml-2 text-muted-foreground'>
              12.000+ Google değerlendirmesi
            </span>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
            <div className='stats-card'>
              <span className='text-cyan-500 text-2xl mr-3'>📍</span>
              <div>
                <div className='font-semibold'>Adres</div>
                <div className='text-sm text-muted-foreground'>
                  234 Meşe Sokak, Şehir, Türkiye
                </div>
              </div>
            </div>
            <div className='stats-card'>
              <span className='text-cyan-500 text-2xl mr-3'>📞</span>
              <div>
                <div className='font-semibold'>Telefon</div>
                <div className='text-sm text-muted-foreground'>
                  +90 555 555 55 55
                </div>
              </div>
            </div>
            <div className='stats-card'>
              <span className='text-cyan-500 text-2xl mr-3'>✉️</span>
              <div>
                <div className='font-semibold'>E-posta</div>
                <div className='text-sm text-muted-foreground'>
                  info@domain.com
                </div>
              </div>
            </div>
            <div className='stats-card'>
              <span className='text-cyan-500 text-2xl mr-3'>⏰</span>
              <div>
                <div className='font-semibold'>Çalışma Saatleri</div>
                <div className='text-sm text-muted-foreground'>
                  Pzt-Per: 08:00-17:00
                  <br />
                  Cuma: 08:00-13:00
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sağ Form Alanı */}
        <div className='flex-1 bg-primary rounded-2xl p-8 shadow-lg flex flex-col justify-center'>
          <h3 className='text-white text-2xl font-bold mb-2'>
            İletişim Formu
          </h3>
          <p className='text-white/80 mb-6'>
            Bize dilediğiniz zaman ulaşabilirsiniz
          </p>
          <form className='space-y-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <input
                type='text'
                placeholder='Adınız'
                className='flex-1 p-3 rounded-lg bg-input border focus:ring-2 focus:ring-primary outline-none'
              />
              <input
                type='text'
                placeholder='Soyadınız'
                className='flex-1 p-3 rounded-lg bg-input border focus:ring-2 focus:ring-primary outline-none'
              />
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
              <input
                type='email'
                placeholder='E-posta'
                className='flex-1 p-3 rounded-lg bg-input border focus:ring-2 focus:ring-primary outline-none'
              />
              <input
                type='tel'
                placeholder='Telefon'
                className='flex-1 p-3 rounded-lg bg-input border focus:ring-2 focus:ring-primary outline-none'
              />
            </div>
            <textarea
              placeholder='Mesajınız'
              rows={4}
              className='w-full p-3 rounded-lg bg-input border focus:ring-2 focus:ring-primary outline-none'
            />
            <button
              type='submit'
              className='w-full md:w-auto bg-white text-primary font-bold px-8 py-3 rounded-full shadow hover:bg-primary hover:text-white transition'
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
