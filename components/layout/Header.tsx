'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { navigationItems } from '@/data/navigation';
import { ThemeSwitcher } from '../Header/ThemeSwitcher';
import { LanguageSwitcher } from '../Header/LanguageSwitcher';
import { Navigation } from '../Header/Navigation';

const Header = () => {
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

          {/* Ana Navigasyon */}
          <Navigation items={navigationItems} />

          {/* Kontroller (Theme + Dil) */}
          <div className='icons flex items-center gap-4'>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
