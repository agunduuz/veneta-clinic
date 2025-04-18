// app/page.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen px-4 sm:px-20 py-20 gap-12'>
      <Image
        src='/next.svg'
        alt='Veneta Clinic Logo'
        width={180}
        height={38}
      />

      <h1 className='text-3xl sm:text-5xl font-semibold text-center'>
        Welcome to Veneta Clinic
      </h1>

      <p className='text-center max-w-2xl text-sm sm:text-base leading-relaxed'>
        We offer world-class aesthetic, plastic surgery, and hair
        transplant services with a commitment to quality, trust, and
        satisfaction.
      </p>

      <div className='flex flex-col sm:flex-row gap-4'>
        <a
          href='/services'
          className='bg-black text-white dark:bg-white dark:text-black rounded-full px-6 py-3 text-sm sm:text-base hover:opacity-90 transition'
        >
          View Services
        </a>
        <a
          href='/contact'
          className='border border-gray-300 dark:border-gray-600 rounded-full px-6 py-3 text-sm sm:text-base hover:bg-gray-100 dark:hover:bg-gray-800 transition'
        >
          Contact Us
        </a>
      </div>
    </main>
  );
}
