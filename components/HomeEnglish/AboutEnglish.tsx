'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const AboutEnglish = () => {
  // Loading state for client-side rendering
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

  // Show simple placeholder during loading
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
              src='/images/operasyon-odasi.jpeg'
              alt='Veneta Clinic Operating Room'
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
            <Link
              href='https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=lassarium+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2'
              target='_blank'
              className='text-xs md:text-sm  mt-1 text-primary underline'
            >
              Based on 200+ verified patient reviews
            </Link>
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
            About Veneta Clinic
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className='text-muted-foreground text-sm md:text-base'
          >
            Since 2010, we have been enhancing natural beauty with
            expert aesthetic care
          </motion.p>
          <motion.p
            variants={itemVariants}
            className='text-muted-foreground text-sm md:text-base'
          >
            At Veneta Clinic, we are dedicated to helping you achieve
            your best look and feel through our comprehensive surgical
            and non-surgical aesthetic procedures. Our
            state-of-the-art facility provides a comfortable and
            welcoming environment where your transformation journey
            begins.
          </motion.p>
          <motion.p
            variants={itemVariants}
            className='text-muted-foreground text-sm md:text-base'
          >
            Every member of our expert team is committed to providing
            personalized care, understanding your unique goals, and
            delivering results that will enhance your natural beauty
            while boosting your confidence.
          </motion.p>
          <Link
            href='https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=lassarium+ni%C5%9Fanta%C5%9F%C4%B1&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2'
            target='_blank'
            className='bg-primary text-primary-foreground px-6 py-3 rounded-md 
                     hover:bg-primary/90 transition-colors shadow-lg 
                     hover:shadow-xl transform duration-200'
          >
            ★ Customer Reviews ★
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutEnglish;
