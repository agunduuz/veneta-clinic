'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutMissionEnglish = () => {
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
      {/* Left Column - Mission and Statistics */}
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
            src='/images/batibey-batmaci-2.png'
            alt='Expert Doctor'
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
            &ldquo;Our commitment to excellence guides everything we
            do, from patient care to the latest aesthetic
            innovations.&rdquo;
          </blockquote>
          <div className='flex flex-col'>
            <cite className='text-lg font-semibold text-foreground not-italic'>
              Dr. Batıbey Batmacı
            </cite>
            <span className='text-sm text-muted-foreground mb-2'>
              Medical Director & Plastic Surgeon
            </span>
            <div className='text-xs text-muted-foreground space-y-1'>
              <p>
                • Selçuk University Meram Faculty of Medicine Graduate
              </p>
              <p>• 13+ Years of Plastic Surgery Experience</p>
              <p>• 5000+ Successful Operations</p>
              <p>
                • International Association of Aesthetic Plastic
                Surgeons Member
              </p>
              <p>• Expert in Latest Technologies</p>
            </div>
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
            Our Mission
          </h2>
          <p className='text-lg text-muted-foreground mb-4'>
            Empowering confidence through excellence in aesthetic care
          </p>
          <p className='text-base md:text-lg text-muted-foreground leading-relaxed'>
            As Veneta Clinic, our mission is to ensure individuals
            feel confident in their own skin and provide exceptional
            aesthetic care services that bring out their natural
            beauty. We believe in creating personalized treatment
            plans that align with each patient&apos;s unique goals and
            lifestyle.
          </p>
          <p className='text-base md:text-lg text-muted-foreground leading-relaxed'>
            Through continuous education, adoption of the latest
            technologies, and our unwavering commitment to patient
            safety, we strive to maintain our position as a leading
            aesthetic clinic by building lasting relationships based
            on trust and superior results.
          </p>
        </motion.div>

        {/* Statistics Grid */}
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
              Years of Experience
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
              Happy Patients
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
              Expert Physicians
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
              Procedures Performed
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMissionEnglish;
