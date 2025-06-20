'use client';
import { useState } from 'react';
import { Globe } from 'lucide-react';
import { languages, Language } from '@/data/languages';
import { useRouter, usePathname } from 'next/navigation';

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Turkish to English category mapping
  const categoryMapping = {
    // Main categories
    '/ameliyatli-estetik': '/en/surgical-aesthetics',
    '/lazer-epilasyon': '/en/laser-hair-removal',
    '/sac-ekimi': '/en/hair-transplant',
    '/hakkimizda': '/en/about',
    '/iletisim': '/en/contact',
    '/': '/en',

    // Surgical aesthetics subcategories
    '/ameliyatli-estetik/yuz': '/en/surgical-aesthetics/facial',
    '/ameliyatli-estetik/burun-estetigi':
      '/en/surgical-aesthetics/facial-rhinoplasty',
    '/ameliyatli-estetik/yuz-germe':
      '/en/surgical-aesthetics/facial-face-lift',
    '/ameliyatli-estetik/goz-kapagi-estetigi':
      '/en/surgical-aesthetics/facial-eye-bag-surgery',
    '/ameliyatli-estetik/vucut': '/en/surgical-aesthetics/body',
    '/ameliyatli-estetik/karin-germe':
      '/en/surgical-aesthetics/body-tummy-tuck',
    '/ameliyatli-estetik/liposuction':
      '/en/surgical-aesthetics/body-liposuction',
    '/ameliyatli-estetik/meme': '/en/surgical-aesthetics/breast',
    '/ameliyatli-estetik/meme-buyutme':
      '/en/surgical-aesthetics/breast-augmentation',
    '/ameliyatli-estetik/meme-kucultme':
      '/en/surgical-aesthetics/breast-reduction',
  };

  // English to Turkish category mapping
  const reverseCategoryMapping = Object.fromEntries(
    Object.entries(categoryMapping).map(([tr, en]) => [en, tr])
  );

  const handleLanguageChange = (lang: Language) => {
    setIsOpen(false);

    if (lang.code === 'en') {
      // Convert Turkish path to English
      const englishPath =
        categoryMapping[pathname as keyof typeof categoryMapping];
      if (englishPath) {
        router.push(englishPath);
      } else {
        // If no direct mapping, try to add /en prefix
        if (!pathname.startsWith('/en/')) {
          router.push(`/en${pathname}`);
        }
      }
    } else if (lang.code === 'tr') {
      // Convert English path to Turkish
      const turkishPath =
        reverseCategoryMapping[
          pathname as keyof typeof reverseCategoryMapping
        ];
      if (turkishPath) {
        router.push(turkishPath);
      } else {
        // If no direct mapping, try to remove /en prefix
        if (pathname.startsWith('/en/')) {
          router.push(pathname.replace('/en', ''));
        }
      }
    }
  };

  // Determine current language based on pathname
  const getCurrentLanguage = () => {
    if (pathname.startsWith('/en/') || pathname === '/en') {
      return 'EN';
    }
    return 'TR';
  };

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 rounded-full hover:bg-muted transition-colors duration-200 text-accent-foreground flex items-center gap-2'
        aria-label='Change language'
      >
        <Globe className='w-5 h-5' />
        <span className='text-sm font-medium'>
          {getCurrentLanguage()}
        </span>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 bg-background rounded-lg shadow-xl p-2 min-w-[150px] border-t-4 border-primary z-20'>
          <div className='flex flex-col'>
            {languages.map((lang, index) => (
              <button
                key={index}
                onClick={() => handleLanguageChange(lang)}
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
