'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const AboutHeader = () => {
  return (
    <>
      <section className='w-full max-w-7xl mx-auto lg:px-4 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        {/* Sol Kolon - Metin İçeriği */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-6'
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-4xl md:text-6xl font-bold font-playfair text-foreground'
          >
            Veneta Klinik{' '}
            <span className='text-primary'>Hakkında</span> ✨
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='text-xl md:text-2xl text-muted-foreground font-montserrat'
          >
            2010&apos;dan beri estetikte mükemmelliğin öncüsü
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='text-lg text-muted-foreground leading-relaxed'
          >
            Veneta Klinik&apos;te, sanatsal vizyonu tıbbi uzmanlıkla
            birleştirerek doğal güzelliğinizi ön plana çıkarıyoruz.
            Modern tesisimiz ve alanında uzman ekibimizle, kişiye özel
            bakım ve hem cerrahi hem de cerrahi olmayan estetik
            uygulamalarda üstün sonuçlar sunmaya kendimizi adadık.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='flex gap-4 pt-4'
          >
            <Button size='lg'>Hizmetlerimiz</Button>
            <Button size='lg' variant='secondary'>
              İletişim
            </Button>
          </motion.div>
        </motion.div>

        {/* Sağ Kolon - Görsel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='relative aspect-[4/3] rounded-3xl overflow-hidden'
        >
          <Image
            src='https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000'
            alt='Veneta Klinik Modern Tedavi Odası'
            fill
            className='object-cover hover:scale-105 transition-transform duration-500'
            sizes='(max-width: 1024px) 100vw, 50vw'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className='absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg'
          >
            <div className='flex items-center gap-2'>
              <span className='text-primary text-4xl font-bold'>
                13+
              </span>
              <span className='text-sm text-muted-foreground'>
                Yıllık
                <br />
                Deneyim
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default AboutHeader;
