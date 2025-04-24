'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const About = () => {
  // Client-side rendering için loading state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Loading durumunda basit bir placeholder göster
  if (!isClient) {
    return (
      <section className='container mx-auto px-4 md:px-6 relative z-10 py-8 md:py-16 lg:px-16'>
        <div className='flex flex-col lg:flex-row items-center gap-8'>
          <div className='lg:w-1/2 space-y-6 animate-pulse'>
            <div className='h-8 bg-gray-200 rounded w-3/4'></div>
            <div className='h-4 bg-gray-200 rounded w-full'></div>
            <div className='h-4 bg-gray-200 rounded w-full'></div>
          </div>
          <div className='lg:w-1/2 relative'>
            <div className='relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded-lg'></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
      className='container mx-auto px-4 md:px-6 relative z-10 py-8 md:py-16 lg:px-16'
    >
      <div className='flex flex-col lg:flex-row items-center gap-8'>
        <motion.div
          variants={imageVariants}
          className='lg:w-1/2 relative order-2 lg:order-1 w-full'
        >
          <div className='relative w-full h-[300px] md:h-[400px] lg:h-[500px]'>
            <Image
              src='https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg'
              alt='Veneta Klinik Operasyon Odası'
              fill
              className='object-cover rounded-lg shadow-2xl'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority
            />
          </div>
          <motion.div
            variants={itemVariants}
            className='absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm 
                     p-4 rounded-lg shadow-lg border border-primary/10'
          >
            <div className='flex items-center gap-1'>
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className='text-yellow-400'
                >
                  ★
                </motion.span>
              ))}
              <span className='ml-2 font-bold'>4.9/5</span>
            </div>
            <p className='text-xs md:text-sm text-muted-foreground mt-1'>
              200+ onaylı hasta değerlendirmesine dayalı
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className='lg:w-1/2 space-y-6 text-center lg:text-left order-2 lg:order-1'
        >
          <motion.h2
            variants={itemVariants}
            className='text-2xl md:text-3xl font-bold font-playfair'
          >
            Veneta Klinik Hakkında
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className='text-muted-foreground text-sm md:text-base'
          >
            2010`dan beri uzman estetik bakımıyla doğal güzelliği
            geliştiriyoruz
          </motion.p>
          <motion.p
            variants={itemVariants}
            className='text-muted-foreground text-sm md:text-base'
          >
            Veneta Klinik olarak, kapsamlı cerrahi ve cerrahi olmayan
            estetik prosedürlerimizle en iyi görünümünüze ve hissinize
            kavuşmanıza yardımcı olmaya kendimizi adadık. Son
            teknoloji tesisimiz, dönüşüm yolculuğunuzun başladığı
            rahat ve davetkar bir ortam sunuyor.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className='text-muted-foreground text-sm md:text-base'
          >
            Uzman ekibimizin her üyesi, kişiselleştirilmiş bakım
            sağlamaya, benzersiz hedeflerinizi anlamaya ve doğal
            güzelliğinizi artırırken özgüveninizi yükseltecek sonuçlar
            sunmaya kararlıdır.
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-primary text-primary-foreground px-6 py-3 rounded-md 
                     hover:bg-primary/90 transition-colors shadow-lg 
                     hover:shadow-xl transform duration-200'
          >
            Hakkımızda Daha Fazla Bilgi
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
