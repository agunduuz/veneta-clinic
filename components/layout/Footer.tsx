'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  // Mail,
  MapPin,
  // Facebook,
  // Instagram,
  // Twitter,
} from 'lucide-react';

const Footer = () => {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en/') || pathname === '/en';

  // Turkish content
  const turkishContent = {
    // newsletter: {
    //   title: 'Bültene Abone Olun',
    //   description:
    //     'En son haberler ve gelişmeler için e-posta listemize katılın. Gereksiz e-posta göndermeyeceğimize söz veriyoruz.',
    //   placeholder: 'E-posta adresiniz',
    //   buttonLabel: 'Abone Ol',
    // },
    corporate: {
      title: 'Kurumsal',
      links: [
        { href: '/hakkimizda', text: 'Hakkımızda' },
        { href: '/hizmetlerimiz', text: 'Hizmetlerimiz' },
        { href: '/doktorlarimiz', text: 'Doktorlarımız' },
        { href: '/blog', text: 'Blog' },
        { href: '/iletisim', text: 'İletişim' },
      ],
    },
    services: {
      title: 'Hizmetler',
      links: [
        { href: '/ameliyatli-estetik', text: 'Estetik' },
        { href: '/lazer-epilasyon', text: 'Lazer Epilasyon' },
        { href: '/cilt-bakimi', text: 'Cilt Bakımı' },
        { href: '/dolgu', text: 'Dolgu' },
        { href: '/kirisiklik', text: 'Kırışıklık Tedavisi' },
      ],
    },
    contact: {
      title: 'İletişim',
      location: 'İstanbul, Türkiye',
      copyright: 'Tüm hakları saklıdır.',
    },
  };

  // English content
  const englishContent = {
    newsletter: {
      title: 'Subscribe to Newsletter',
      description:
        'Join our email list for the latest news and updates. We promise not to send unnecessary emails.',
      placeholder: 'Your email address',
      buttonLabel: 'Subscribe',
    },
    corporate: {
      title: 'Corporate',
      links: [
        { href: '/en/about', text: 'About Us' },
        { href: '/en/services', text: 'Our Services' },
        { href: '/en/doctors', text: 'Our Doctors' },
        { href: '/en/blog', text: 'Blog' },
        { href: '/en/contact', text: 'Contact' },
      ],
    },
    services: {
      title: 'Services',
      links: [
        {
          href: '/en/surgical-aesthetics',
          text: 'Surgical Aesthetics',
        },
        {
          href: '/en/laser-hair-removal',
          text: 'Laser Hair Removal',
        },
        { href: '/en/skin-care', text: 'Skin Care' },
        { href: '/en/fillers', text: 'Fillers' },
        { href: '/en/wrinkle-treatment', text: 'Wrinkle Treatment' },
      ],
    },
    contact: {
      title: 'Contact',
      location: 'Istanbul, Turkey',
      copyright: 'All rights reserved.',
    },
  };

  const content = isEnglish ? englishContent : turkishContent;

  return (
    <footer className='bg-primary/90 text-primary-foreground'>
      <div className='container mx-auto px-4 py-12 flex flex-col gap-10 lg:gap-0 lg:flex-row lg:justify-between lg:items-start'>
        {/* Newsletter */}
        {/* <div className='flex-1 mb-8 lg:mb-0 max-w-md'>
          <h3 className='text-lg md:text-xl font-bold mb-3 font-playfair'>
            {content.newsletter.title}
          </h3>
          <p className='text-primary-foreground/90 mb-4 text-sm md:text-base'>
            {content.newsletter.description}
          </p>
          <form className='flex items-center bg-background rounded-lg p-1 shadow max-w-xs'>
            <input
              type='email'
              placeholder={content.newsletter.placeholder}
              className='flex-1 px-4 py-2 bg-transparent outline-none text-foreground placeholder:text-foreground/50 rounded-l-lg'
            />
            <button
              type='submit'
              className='bg-primary text-primary-foreground rounded-lg p-2 ml-1 hover:bg-accent transition-colors'
              aria-label={content.newsletter.buttonLabel}
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5 12h14M12 5l7 7-7 7'
                />
              </svg>
            </button>
          </form>
        </div> */}

        {/* Links */}
        <div className='flex-[2] grid grid-cols-2 md:grid-cols-3 gap-8'>
          <div className='flex items-center justify-center'>
            <div className='flex flex-col'>
              <h4 className='font-bold mb-3 font-playfair'>
                {content.corporate.title}
              </h4>
              <ul className='space-y-2 text-sm'>
                {content.corporate.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className='hover:text-accent transition-colors'
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <div className='flex flex-col '>
              <h4 className='font-bold mb-3 font-playfair'>
                {content.services.title}
              </h4>
              <ul className='space-y-2 text-sm'>
                {content.services.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className='hover:text-accent transition-colors'
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Contact */}
          <div className='flex items-center justify-center'>
            <div className='flex flex-col'>
              <h4 className='font-bold mb-3 font-playfair'>
                {content.contact.title}
              </h4>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-center gap-2'>
                  <Phone className='text-accent h-5 w-5' />
                  <a
                    href='tel:+902125612322'
                    className='hover:text-accent transition-colors'
                  >
                    +90 212 561 23 22
                  </a>
                </li>
                {/* <li className='flex items-center gap-2'>
                  <Mail className='text-accent h-5 w-5' />
                  <a
                    href='mailto:eyup17@gmail.com'
                    className='hover:text-accent transition-colors'
                  >
                    eyup17@gmail.com
                  </a>
                </li> */}
                <li className='flex items-center gap-2'>
                  <MapPin className='text-accent h-5 w-5' />
                  <span>{content.contact.location}</span>
                </li>
              </ul>
              {/* <div className='flex gap-3 mt-4'>
                <a
                  href='https://facebook.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-background rounded-full p-2 hover:bg-accent transition-colors'
                >
                  <Facebook className='h-5 w-5 text-primary' />
                </a>
                <a
                  href='https://instagram.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-background rounded-full p-2 hover:bg-accent transition-colors'
                >
                  <Instagram className='h-5 w-5 text-primary' />
                </a>
                <a
                  href='https://twitter.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-background rounded-full p-2 hover:bg-accent transition-colors'
                >
                  <Twitter className='h-5 w-5 text-primary' />
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className='bg-primary/80 py-4 text-center text-sm text-primary-foreground/80 border-t border-primary-foreground/10'>
        &copy; {new Date().getFullYear()} Veneta Clinic.{' '}
        {content.contact.copyright}
      </div>
    </footer>
  );
};

export default Footer;
