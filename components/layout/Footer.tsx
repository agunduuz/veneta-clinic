import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className='bg-primary/90 text-primary-foreground'>
      <div className='container mx-auto px-4 py-12 flex flex-col gap-10 lg:gap-0 lg:flex-row lg:justify-between lg:items-start'>
        {/* Newsletter */}
        <div className='flex-1 mb-8 lg:mb-0 max-w-md'>
          <h3 className='text-lg md:text-xl font-bold mb-3 font-playfair'>
            Bültene Abone Olun
          </h3>
          <p className='text-primary-foreground/90 mb-4 text-sm md:text-base'>
            En son haberler ve gelişmeler için e-posta listemize
            katılın. Gereksiz e-posta göndermeyeceğimize söz
            veriyoruz.
          </p>
          <form className='flex items-center bg-background rounded-lg p-1 shadow max-w-xs'>
            <input
              type='email'
              placeholder='E-posta adresiniz'
              className='flex-1 px-4 py-2 bg-transparent outline-none text-foreground placeholder:text-foreground/50 rounded-l-lg'
            />
            <button
              type='submit'
              className='bg-primary text-primary-foreground rounded-lg p-2 ml-1 hover:bg-accent transition-colors'
              aria-label='Abone Ol'
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
        </div>

        {/* Links */}
        <div className='flex-[2] grid grid-cols-2 md:grid-cols-3 gap-8'>
          <div className='flex items-center justify-center'>
            <div className='flex flex-col justify-center'>
              <h4 className='font-bold mb-3 font-playfair'>
                Kurumsal
              </h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='/about'
                    className='hover:text-accent transition-colors'
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services'
                    className='hover:text-accent transition-colors'
                  >
                    Hizmetlerimiz
                  </Link>
                </li>
                <li>
                  <Link
                    href='/doctors'
                    className='hover:text-accent transition-colors'
                  >
                    Doktorlarımız
                  </Link>
                </li>
                <li>
                  <Link
                    href='/blog'
                    className='hover:text-accent transition-colors'
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='hover:text-accent transition-colors'
                  >
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <div className='flex flex-col justify-center'>
              <h4 className='font-bold mb-3 font-playfair'>
                Hizmetler
              </h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link
                    href='/services/estetik'
                    className='hover:text-accent transition-colors'
                  >
                    Estetik
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services/cilt-bakimi'
                    className='hover:text-accent transition-colors'
                  >
                    Cilt Bakımı
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services/dolgu'
                    className='hover:text-accent transition-colors'
                  >
                    Dolgu
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services/botoks'
                    className='hover:text-accent transition-colors'
                  >
                    Botoks
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services/liposuction'
                    className='hover:text-accent transition-colors'
                  >
                    Liposuction
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Contact */}
          <div className='flex items-center justify-center'>
            <div className='flex flex-col justify-center'>
              <h4 className='font-bold mb-3 font-playfair'>
                İletişim
              </h4>
              <ul className='space-y-2 text-sm'>
                <li className='flex items-center gap-2'>
                  <Phone className='text-accent h-5 w-5' />
                  <a
                    href='tel:+902222222222'
                    className='hover:text-accent transition-colors'
                  >
                    +90 222 222 22 22
                  </a>
                </li>
                <li className='flex items-center gap-2'>
                  <Mail className='text-accent h-5 w-5' />
                  <a
                    href='mailto:info@venetaclinic.com'
                    className='hover:text-accent transition-colors'
                  >
                    info@venetaclinic.com
                  </a>
                </li>
                <li className='flex items-center gap-2'>
                  <MapPin className='text-accent h-5 w-5' />
                  <span>İstanbul, Türkiye</span>
                </li>
              </ul>
              <div className='flex gap-3 mt-4'>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className='bg-primary/80 py-4 text-center text-sm text-primary-foreground/80 border-t border-primary-foreground/10'>
        &copy; {new Date().getFullYear()} Veneta Clinic. Tüm hakları
        saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
