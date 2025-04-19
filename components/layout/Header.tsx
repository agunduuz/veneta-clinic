'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { navigationItems } from '@/data/navigation';
import { ThemeSwitcher } from '../Header/ThemeSwitcher';
import { LanguageSwitcher } from '../Header/LanguageSwitcher';
import { Navigation } from '../Header/Navigation';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Mobil menü açıldığında scroll'u engelle
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isMenuOpen]);

  return (
    <header className='pt-4 pb-4 bg-background'>
      <div className='container'>
        <nav className='flex justify-between items-center'>
          {/* Logo */}
          <Link href='/' className='logo'>
            <Image
              src='/veneta-logo.svg'
              alt='Veneta Clinic Logo'
              width={50}
              height={150}
              className='h-16 w-auto'
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <Navigation items={navigationItems} />
          </div>

          {/* Kontroller (Theme + Dil) */}
          <div className='flex items-center gap-4'>
            <div className='hidden md:flex items-center gap-4'>
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='md:hidden p-2 rounded-full hover:bg-muted transition-colors duration-200 z-20'
              aria-label='Toggle menu'
            >
              {isMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden overflow-y-auto`}
        >
          <div className='flex flex-col h-full pt-20 px-6'>
            <div className='mobile-navigation'>
              <Navigation items={navigationItems} isMobile={true} />
            </div>
            <div className='mt-auto mb-8 flex items-center justify-center gap-4'>
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
