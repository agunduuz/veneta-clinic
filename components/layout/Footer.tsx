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
    <footer className='bg-primary text-primary-foreground'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Contact Information */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold font-playfair'>
              İletişim
            </h3>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Phone className='text-accent h-5 w-5' />
                <a
                  href='tel:+902222222222'
                  className='hover:text-accent transition-colors'
                >
                  +90 222 222 22 22
                </a>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='text-accent h-5 w-5' />
                <a
                  href='mailto:info@venetaclinic.com'
                  className='hover:text-accent transition-colors'
                >
                  info@venetaclinic.com
                </a>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='text-accent h-5 w-5' />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold font-playfair'>
              Hızlı Bağlantılar
            </h3>
            <ul className='space-y-2'>
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
                  href='/contact'
                  className='hover:text-accent transition-colors'
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className='space-y-4'>
            <h3 className='text-xl font-bold font-playfair'>
              Sosyal Medya
            </h3>
            <div className='flex gap-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-accent transition-colors'
              >
                <Facebook className='h-6 w-6' />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-accent transition-colors'
              >
                <Instagram className='h-6 w-6' />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-accent transition-colors'
              >
                <Twitter className='h-6 w-6' />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-12 pt-8 border-t border-primary-foreground/20 text-center'>
          <p>
            &copy; {new Date().getFullYear()} Veneta Clinic. Tüm
            hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
