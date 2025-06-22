'use client';
import { motion } from 'framer-motion';
import { UserCircle2, Target, Sparkles, Clock } from 'lucide-react';

const features = [
  {
    icon: <UserCircle2 className='w-8 h-8 text-primary' />,
    title: 'Uzman Kadro',
    description:
      'Yılların deneyimine sahip sertifikalı uzman kadromuzla hizmetinizdeyiz.',
  },
  {
    icon: <Target className='w-8 h-8 text-primary' />,
    title: 'Kişiye Özel Bakım',
    description:
      'Hedeflerinizi anlıyor, size özel tedavi planları geliştiriyoruz.',
  },
  {
    icon: <Sparkles className='w-8 h-8 text-primary' />,
    title: 'İleri Teknoloji',
    description:
      'En son teknoloji ve yöntemlerle doğal görünümlü sonuçlar elde ediyoruz.',
  },
  {
    icon: <Clock className='w-8 h-8 text-primary' />,
    title: 'Esnek Planlama',
    description:
      'Yoğun yaşam temponuza uygun esnek randevu seçenekleri sunuyoruz.',
  },
];

const Features = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className='py-16 bg-secondary/30'>
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className='container mx-auto px-4'
      >
        <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='feature-card group'
            >
              <div
                className='relative p-6 bg-background rounded-xl shadow-md hover:shadow-xl 
                            transition-all duration-300 border border-primary/10 
                            hover:border-primary/30 h-full'
              >
                <div
                  className='absolute -top-4 left-6 p-2 bg-accent rounded-lg 
                              group-hover:scale-110 transition-transform duration-300'
                >
                  {feature.icon}
                </div>
                <div className='mt-6 space-y-3'>
                  <h3 className='text-xl font-semibold font-playfair'>
                    {feature.title}
                  </h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Features;
