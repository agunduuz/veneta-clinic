'use client';
import { useState } from 'react';
import { Globe } from 'lucide-react';
import { languages } from '@/data/languages';

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 rounded-full hover:bg-muted transition-colors duration-200 text-accent-foreground flex items-center gap-2'
        aria-label='Change language'
      >
        <Globe className='w-5 h-5' />
        <span className='text-sm font-medium'>TR</span>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 bg-background rounded-lg shadow-xl p-2 min-w-[150px] border-t-4 border-primary'>
          <div className='flex flex-col'>
            {languages.map((lang, index) => (
              <button
                key={index}
                onClick={() => setIsOpen(false)}
                className='flex items-center gap-2 px-4 py-2 text-background-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200'
                dir={lang.rtl ? 'rtl' : 'ltr'}
              >
                <span className='w-6'>{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
