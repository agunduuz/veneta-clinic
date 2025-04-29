'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
  {
    id: '01',
    title: 'İleri Teknoloji',
    description:
      'En son teknolojik cihazlar ve yöntemler ile estetik tedavilerinizi gerçekleştiriyoruz. Amacımız doğru teşhis, etkili tedavi ve hasta konforu sağlamak.',
    image:
      'https://images.unsplash.com/photo-1612776572997-76cc42e058c3?q=80&w=1200',
  },
  {
    id: '02',
    title: 'Uzman Ekip',
    description:
      'Alanında uzman doktorlarımız ve deneyimli ekibimiz ile size özel tedavi planları oluşturuyor ve en iyi sonuçları elde etmeyi hedefliyoruz.',
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400',
  },
  {
    id: '03',
    title: 'Kişiye Özel Bakım',
    description:
      'Kliniğimiz kişiye özel bakım hizmeti sunar. Ekibimiz, detaylı muayene ve görüşmeler sonrasında size özel tedavi planları oluşturmakta uzmanlaşmıştır.',
    image:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000',
  },
];

const AboutFeatures = () => {
  return (
    <section className='relative w-full bg-primary/5 py-24 md:py-32 overflow-hidden'>
      <div className='absolute inset-0 bg-grid-white/10' />

      <div className='relative w-full max-w-7xl mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-3xl mx-auto mb-16 md:mb-24'
        >
          <h2 className='text-3xl md:text-5xl font-bold font-playfair text-foreground mb-6'>
            Bizi Farklı Kılan{' '}
            <span className='text-primary'>Özelliklerimiz</span>
          </h2>
          <p className='text-lg md:text-xl text-muted-foreground'>
            Modern teknoloji ve uzman kadromuz ile size en iyi
            deneyimi sunuyoruz
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className='group relative bg-card hover:bg-card/80 rounded-3xl p-6 md:p-8 overflow-hidden'
            >
              <div className='relative z-10'>
                <span className='inline-block text-5xl font-bold text-primary/20 mb-4 font-playfair'>
                  {feature.id}
                </span>
                <h3 className='text-2xl font-semibold text-foreground mb-4'>
                  {feature.title}
                </h3>
                <p className='text-muted-foreground leading-relaxed mb-6'>
                  {feature.description}
                </p>
              </div>

              <motion.div
                className='absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500'
                initial={{ scale: 1.2 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 33vw'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent' />
              </motion.div>

              <div className='absolute bottom-0 left-0 w-full h-1 bg-primary/20 group-hover:bg-primary transition-colors duration-300' />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutFeatures;
