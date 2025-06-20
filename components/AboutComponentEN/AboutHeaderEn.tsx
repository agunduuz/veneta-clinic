'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const AboutHeaderEnglish = () => {
  return (
    <>
      <section className='w-full max-w-7xl mx-auto lg:px-4 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        {/* Left Column - Text Content */}
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
            About <span className='text-primary'>Veneta Clinic</span>{' '}
            ✨
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='text-xl md:text-2xl text-muted-foreground font-montserrat'
          >
            Pioneer of excellence in aesthetics since 2010
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='text-lg text-muted-foreground leading-relaxed'
          >
            At Veneta Clinic, we bring out your natural beauty by
            combining artistic vision with medical expertise. With our
            modern facility and expert team, we are dedicated to
            providing personalized care and delivering superior
            results in both surgical and non-surgical aesthetic
            procedures.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='flex gap-4 pt-4'
          >
            <Button size='lg'>Our Services</Button>
            <Button size='lg' variant='secondary'>
              Contact
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='relative aspect-[4/3] rounded-3xl overflow-hidden'
        >
          <Image
            src='/images/batibey-batmaci-1.jpg'
            alt='Veneta Clinic Modern Treatment Room'
            fill
            className='object-cover hover:scale-105 transition-transform duration-500'
            sizes='(max-width: 768px) 100vw, 50vw'
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
                Years of
                <br />
                Experience
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default AboutHeaderEnglish;
