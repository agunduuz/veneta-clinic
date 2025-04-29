'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutMission = () => {
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter: HTMLElement) => {
      const target = parseInt(
        counter.getAttribute('data-value') || '0'
      );
      const duration = 2000;
      const steps = 50;
      const stepValue = target / steps;
      let current = 0;

      const updateCounter = () => {
        current += stepValue;
        if (current <= target) {
          counter.textContent = Math.round(current).toString() + '+';
          setTimeout(updateCounter, duration / steps);
        } else {
          counter.textContent = target.toString() + '+';
        }
      };

      updateCounter();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.target instanceof HTMLElement
          ) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => {
      if (counter instanceof HTMLElement) {
        observer.observe(counter);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className='w-full max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12'>
      {/* Sol Kolon - Misyon ve İstatistikler */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='relative bg-primary/10 rounded-2xl p-8 md:p-12 flex flex-col items-center'
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='relative w-48 h-48 mb-8 rounded-full overflow-hidden'
        >
          <Image
            src='https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400'
            alt='Uzman Doktor'
            fill
            className='object-cover hover:scale-105 transition-transform duration-500'
            sizes='(max-width: 768px) 100vw, 192px'
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='relative z-10'
        >
          <blockquote className='text-xl md:text-2xl italic text-foreground mb-6'>
            &ldquo;Mükemmelliğe olan bağlılığımız, hasta bakımından en
            son estetik yeniliklere kadar yaptığımız her şeyi
            yönlendiriyor.&rdquo;
          </blockquote>
          <div className='flex flex-col'>
            <cite className='text-lg font-semibold text-foreground not-italic'>
              Dr. Sarah Mitchell
            </cite>
            <span className='text-sm text-muted-foreground'>
              Medikal Direktör
            </span>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='space-y-8'
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='space-y-4'
        >
          <h2 className='text-3xl md:text-4xl font-bold font-playfair text-foreground'>
            Misyonumuz
          </h2>
          <p className='text-lg text-muted-foreground mb-4'>
            Estetik bakımda mükemmellik yoluyla özgüven kazandırmak
          </p>
          <p className='text-base md:text-lg text-muted-foreground leading-relaxed'>
            Veneta Klinik olarak misyonumuz, bireylerin kendi
            ciltlerinde kendilerini güvende hissetmelerini sağlamak ve
            doğal güzelliklerini ortaya çıkaran olağanüstü estetik
            bakım hizmeti sunmaktır. Her hastanın benzersiz
            hedeflerine ve yaşam tarzına uygun kişiselleştirilmiş
            tedavi planları oluşturmaya inanıyoruz.
          </p>
          <p className='text-base md:text-lg text-muted-foreground leading-relaxed'>
            Sürekli eğitim, en son teknolojilerin benimsenmesi ve
            hasta güvenliğine olan sarsılmaz bağlılığımız ile, güven
            ve üstün sonuçlara dayalı kalıcı ilişkiler kurarak önde
            gelen bir estetik klinik olma konumumuzu korumaya
            çalışıyoruz.
          </p>
        </motion.div>

        {/* İstatistikler Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='grid grid-cols-2 gap-8'
        >
          <div className='stat-item'>
            <span
              className='stat-number text-4xl md:text-5xl font-bold text-primary'
              data-value='13'
            >
              0
            </span>
            <p className='text-sm md:text-base text-muted-foreground'>
              Yıllık Deneyim
            </p>
          </div>
          <div className='stat-item'>
            <span
              className='stat-number text-4xl md:text-5xl font-bold text-primary'
              data-value='5000'
            >
              0
            </span>
            <p className='text-sm md:text-base text-muted-foreground'>
              Mutlu Hasta
            </p>
          </div>
          <div className='stat-item'>
            <span
              className='stat-number text-4xl md:text-5xl font-bold text-primary'
              data-value='20'
            >
              0
            </span>
            <p className='text-sm md:text-base text-muted-foreground'>
              Uzman Hekim
            </p>
          </div>
          <div className='stat-item'>
            <span
              className='stat-number text-4xl md:text-5xl font-bold text-primary'
              data-value='30'
            >
              0
            </span>
            <p className='text-sm md:text-base text-muted-foreground'>
              Uygulanan Prosedür
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMission;
