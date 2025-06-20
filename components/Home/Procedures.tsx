'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

type Procedure = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'surgical' | 'non-surgical';
};

const procedures: Procedure[] = [
  {
    id: 1,
    title: 'Kırışıklık Tedavisi',
    description:
      'Hızlı ve etkili bir şekilde kırışıklıkları ve ince çizgileri azaltın.',
    image:
      'https://images.pexels.com/photos/7581577/pexels-photo-7581577.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'non-surgical',
  },
  {
    id: 2,
    title: 'Burun Estetiği',
    description:
      'Yüz harmoninizi ve özgüveninizi artırmak için burnunuzu yeniden şekillendirin.',
    image:
      'https://images.pexels.com/photos/30686774/pexels-photo-30686774/free-photo-of-plastik-cerrah-klinikte-hastanin-burnunu-inceliyor.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'surgical',
  },
  {
    id: 3,
    title: 'Dermal Dolgu',
    description:
      'Daha genç bir görünüm için hacim kazandırın ve derin çizgileri yumuşatın.',
    image:
      'https://images.pexels.com/photos/16131210/pexels-photo-16131210/free-photo-of-adam-tedavi-shot-atis.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'non-surgical',
  },
  {
    id: 4,
    title: 'Liposuction',
    description:
      'Diyet ve egzersizle gitmeyen inatçı yağ birikintilerinden kurtulun.',
    image:
      'https://images.pexels.com/photos/7772658/pexels-photo-7772658.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'surgical',
  },
];

const Procedures = () => {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'surgical' | 'non-surgical'
  >('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: 'easeIn',
      },
    },
  };

  return (
    <section className='py-12 md:py-20 bg-muted/30'>
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={containerVariants}
        className='container mx-auto px-4'
      >
        <div className='text-center mb-8 md:mb-12'>
          <motion.h2
            variants={itemVariants}
            className='text-2xl md:text-4xl font-bold font-playfair mb-3 md:mb-4'
          >
            Öne Çıkan Prosedürler
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className='text-muted-foreground max-w-2xl mx-auto text-sm md:text-base'
          >
            En popüler estetik tedavilerimizi ve cerrahi
            prosedürlerimizi keşfedin
          </motion.p>
        </div>
        {/* Mobil için scroll özelliği ekledik */}
        {/* Tab container kısmını güncelleyelim */}
        <motion.div
          variants={itemVariants}
          className='relative flex flex-col items-center mb-12'
        >
          {/* Tab background decoration */}
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent h-14 -z-10' />

          {/* Tabs container */}
          <div className='flex justify-center gap-2 p-1 bg-muted/30 backdrop-blur-sm rounded-full border border-primary/10 shadow-lg'>
            {['all', 'surgical', 'non-surgical'].map((filter) => (
              <motion.button
                key={filter}
                onClick={() =>
                  setActiveFilter(filter as typeof activeFilter)
                }
                className={`relative px-6 py-2.5 rounded-full transition-all duration-500 text-sm md:text-base
          ${
            activeFilter === filter
              ? 'text-primary-foreground'
              : 'text-foreground/70 hover:text-foreground'
          }`}
              >
                {/* Aktif tab için arka plan efekti */}
                {activeFilter === filter && (
                  <motion.div
                    layoutId='activeTab'
                    className='absolute inset-0 bg-primary rounded-full shadow-md'
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}

                {/* Tab text */}
                <span className='relative z-10 font-medium'>
                  {filter === 'all'
                    ? 'Tümü'
                    : filter === 'surgical'
                    ? 'Ameliyatlı'
                    : 'Ameliyatsız'}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          <AnimatePresence mode='wait'>
            {procedures.map((procedure) => (
              <motion.div
                key={procedure.id}
                variants={itemVariants}
                initial='hidden'
                animate={
                  activeFilter === 'all' ||
                  procedure.category === activeFilter
                    ? 'visible'
                    : 'hidden'
                }
                exit='exit'
                className={`group relative bg-background rounded-xl overflow-hidden shadow-md 
                         hover:shadow-xl transition-all duration-300
                         ${
                           activeFilter !== 'all' &&
                           procedure.category !== activeFilter
                             ? 'hidden'
                             : ''
                         }`}
                style={{
                  height:
                    activeFilter !== 'all' &&
                    procedure.category !== activeFilter
                      ? 0
                      : 'auto',
                }}
              >
                <div className='relative h-48 sm:h-56 md:h-64'>
                  <Image
                    src={procedure.image}
                    alt={procedure.title}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                    sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw'
                  />
                  <div className='absolute top-4 right-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm
                      ${
                        procedure.category === 'surgical'
                          ? 'bg-accent/90 text-accent-foreground'
                          : 'bg-secondary/90 text-secondary-foreground'
                      }`}
                    >
                      {procedure.category === 'surgical'
                        ? 'Ameliyatlı'
                        : 'Ameliyatsız'}
                    </span>
                  </div>
                </div>
                <div className='p-4 md:p-6'>
                  <h3 className='text-lg md:text-xl font-semibold font-playfair mb-2'>
                    {procedure.title}
                  </h3>
                  <p className='text-muted-foreground text-sm mb-4 line-clamp-2'>
                    {procedure.description}
                  </p>
                  <button
                    className='text-primary font-medium group-hover:text-primary/80 
                                   transition-colors flex items-center gap-2 text-sm md:text-base'
                  >
                    Daha fazla bilgi
                    <svg
                      className='w-4 h-4 transform group-hover:translate-x-1 transition-transform'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <motion.div
          variants={itemVariants}
          className='text-center mt-8 md:mt-12'
        >
          <button
            className='bg-primary text-primary-foreground px-6 md:px-8 py-2.5 md:py-3 rounded-md 
                           hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl 
                           transform duration-200 text-sm md:text-base'
          >
            Tüm Prosedürleri Görüntüle
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Procedures;
