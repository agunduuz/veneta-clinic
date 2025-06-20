'use client';
import { motion } from 'framer-motion';

const PhoneButton = () => {
  const handlePhoneClick = () => {
    // Phone link - you can customize the phone number
    const phoneNumber = '+902125612322'; // Replace with your actual phone number
    const phoneUrl = `tel:${phoneNumber}`;

    window.location.href = phoneUrl;
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handlePhoneClick}
      className='fixed bottom-20 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white 
                 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300
                 flex items-center justify-center group mb-2'
      aria-label='Telefon ile arama yap'
    >
      <svg
        className='w-6 h-6'
        fill='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19c-.54 0-.99.45-.99.99 0 9.36 7.6 16.96 16.96 16.96.54 0 .99-.45.99-.99v-3.5c0-.54-.45-.99-.99-.99z' />
      </svg>

      {/* Tooltip */}
      <div
        className='absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'
      >
        Telefon ile arama yap
        <div className='absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-gray-900'></div>
      </div>
    </motion.button>
  );
};

export default PhoneButton;
