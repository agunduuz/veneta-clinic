'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type BlogPost = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'surgical' | 'non-surgical';
  author: string;
  date: string;
  readTime: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding Dermal Filler Types',
    description:
      'A comprehensive guide on different dermal filler types, their applications, longevity, and what to expect during the treatment process.',
    image:
      'https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=1600',
    category: 'non-surgical',
    author: 'Dr. Sarah Johnson',
    date: 'March 15, 2024',
    readTime: '8 min',
  },
  {
    id: 2,
    title: 'Rhinoplasty Recovery Process',
    description:
      'Detailed information about what to expect from the first day after surgery to full recovery period.',
    image:
      'https://images.pexels.com/photos/4269274/pexels-photo-4269274.jpeg?auto=compress&cs=tinysrgb&w=1600',
    category: 'surgical',
    author: 'Dr. Michael Davis',
    date: 'March 12, 2024',
    readTime: '10 min',
  },
  {
    id: 3,
    title: 'Wrinkle Treatment: Facts and Myths',
    description:
      'Explaining common misconceptions about wrinkles and scientific facts about this popular cosmetic treatment.',
    image:
      'https://images.pexels.com/photos/7319170/pexels-photo-7319170.jpeg?auto=compress&cs=tinysrgb&w=1600',
    category: 'non-surgical',
    author: 'Dr. Emily Wilson',
    date: 'March 10, 2024',
    readTime: '6 min',
  },
];

const LatestBlogEnglish = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className='py-20 bg-muted/20'>
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={containerVariants}
        className='container mx-auto px-4'
      >
        <div className='text-center mb-12'>
          <motion.h2
            variants={itemVariants}
            className='text-3xl md:text-4xl font-bold font-playfair mb-4'
          >
            Latest from Our Blog
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className='text-muted-foreground max-w-2xl mx-auto'
          >
            Expert insights, procedure information, and
            recommendations for your aesthetic journey
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className='group bg-background rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300'
            >
              <div className='relative h-48 md:h-56 overflow-hidden'>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='absolute top-4 left-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${
                      post.category === 'surgical'
                        ? 'bg-accent/90 text-accent-foreground'
                        : 'bg-secondary/90 text-secondary-foreground'
                    }
                    backdrop-blur-sm`}
                  >
                    {post.category === 'surgical'
                      ? 'Surgical'
                      : 'Non-Surgical'}
                  </span>
                </div>
              </div>

              <div className='p-6'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground mb-3'>
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className='text-xl font-semibold font-playfair mb-3 group-hover:text-primary transition-colors'>
                  {post.title}
                </h3>

                <p className='text-muted-foreground text-sm mb-4 line-clamp-2'>
                  {post.description}
                </p>

                <Link
                  href='#'
                  className='inline-flex items-center text-primary font-medium text-sm group-hover:text-primary/80 transition-colors'
                >
                  Read More
                  <svg
                    className='w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform'
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
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className='text-center mt-12'
        >
          <Link
            href='#'
            className='inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-md 
                     hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform duration-200'
          >
            View All Blog Posts
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LatestBlogEnglish;
