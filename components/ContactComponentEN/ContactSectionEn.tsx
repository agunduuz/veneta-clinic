'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const avatars = [
  '/images/avatar1.png',
  '/images/avatar2.png',
  '/images/avatar3.png',
  '/images/avatar4.png',
  '/images/avatar5.png',
];

export default function ContactSectionEn() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration
      const emailData = {
        to_email: 'eyup17@gmail.com',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        subject: 'New Contact Form Message - Veneta Clinic',
      };

      // Using EmailJS service
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='container py-12'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left Information Area */}
        <div className='flex-1'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Contact Us For Your Health Needs
          </h2>
          <p className='mb-6 text-muted-foreground'>
            Reach out to us for support, feedback, or appointments.
            Fill out the form, let us confirm your visit, and meet
            with our health professionals.
          </p>
          <div className='flex items-center gap-2 mb-4 flex-col lg:flex-row'>
            <div className='flex -space-x-2'>
              {avatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt='Doctor'
                  width={40}
                  height={40}
                  className='rounded-full border-2 border-white shadow'
                />
              ))}
            </div>
            <span className='ml-4 bg-secondary px-4 py-2 rounded-full font-medium text-foreground'>
              400+ Satisfied Customers
            </span>
          </div>
          <Link
            href='https://www.google.com/search?sca_esv=6b19787a6a994d6b&sxsrf=AE3TifO7ziWVrPJR7-exDpI2Tc4SHaPgDg:1750273044954&q=veneta+clinic+istanbul&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E-lKDiz5ZMaKtR0Xzei2bM2K9BLcTk2LlwS4-SH1VUmb6Z4MtebRYz07tnCdFD-x2s953po%3D&uds=AOm0WdEAlSiTiojV6t08JvKtroEmny9Y3G9YSQidmqyrjkNTmw8Y6m2RTAum_iwvoDAao2eBv66DvL4E8-5RROD8YZlw107ephAqUuJc8s73RtQNXzX1-CtBWOu2ptMEq-8LI5cPc6kM&sa=X&ved=2ahUKEwjE3-qY0_uNAxVERfEDHf01CNwQ3PALegQIHhAE&biw=1728&bih=992&dpr=2'
            target='_blank'
            className='flex items-center mb-2'
          >
            <span className='text-yellow-400 text-xl mr-2'>★</span>
            <span className='font-bold'>(4.9)</span>
            <span className='ml-2 text-muted-foreground'>
              400+ Google reviews
            </span>
          </Link>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
            <Link
              href='https://www.google.com/maps/place/Soprano+Lazer+Epilasyon+%7C+Buz+Lazer+%7C+Ni%C5%9Fanta%C5%9F%C4%B1+Lazer+Epilasyon+%7C+Laser+Hair+Removal+istanbul+%7C+Epilation+Laser+Epilation/@41.0518288,28.9890787,17z/data=!3m1!4b1!4m6!3m5!1s0x14cabca23318a107:0x5e988f79a28ac1fd!8m2!3d41.0518288!4d28.9916536!16s%2Fg%2F11csqvqcr0?entry=ttu&g_ep=EgoyMDI1MDYxNS4wIKXMDSoASAFQAw%3D%3D'
              target='_blank'
              className='stats-card'
            >
              <span className='text-cyan-500 text-2xl mr-3'>📍</span>
              <div>
                <div className='font-semibold'>Address</div>
                <div className='text-sm text-muted-foreground'>
                  Teşvikiye, Vali Konağı Cd. Demir Han No: 36 Kat:7
                  Nişantaşı, Şişli / İstanbul
                </div>
              </div>
            </Link>
            <Link href='tel:+902125612322' className='stats-card'>
              <span className='text-cyan-500 text-2xl mr-3'>📞</span>
              <div>
                <div className='font-semibold'>Phone</div>
                <div className='text-sm text-muted-foreground'>
                  +90 212 561 23 22
                </div>
              </div>
            </Link>
            <div className='stats-card'>
              <span className='text-cyan-500 text-2xl mr-3'>⏰</span>
              <div>
                <div className='font-semibold'>Working Hours</div>
                <div className='text-sm text-muted-foreground'>
                  24/7 Service
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Form Area */}
        <div className='flex-1 bg-primary rounded-2xl p-8 shadow-lg flex flex-col justify-center'>
          <h3 className='text-white text-2xl font-bold mb-2'>
            Contact Form
          </h3>
          <p className='text-white/80 mb-6'>
            You can reach us anytime you want
          </p>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg'>
              Your message has been sent successfully! We will get
              back to you as soon as possible.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
              An error occurred while sending the message. Please try
              again or contact us by phone.
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              <input
                type='text'
                name='firstName'
                placeholder='First Name'
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className='flex-1 p-3 rounded-lg bg-input border focus:ring-2 focus:ring-primary outline-none'
              />
              <input
                type='text'
                name='lastName'
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className='flex-1 p-3 rounded-lg bg-input border focus:ring-2 focus:ring-primary outline-none'
              />
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
                required
                className='flex-1 p-3 rounded-lg bg-input border focus:ring-2 focus:ring-primary outline-none'
              />
              <input
                type='tel'
                name='phone'
                placeholder='Phone'
                value={formData.phone}
                onChange={handleInputChange}
                required
                className='flex-1 p-3 rounded-lg bg-input border focus:ring-2 focus:ring-primary outline-none'
              />
            </div>
            <textarea
              name='message'
              placeholder='Your Message'
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              required
              className='w-full p-3 rounded-lg bg-input border focus:ring-2 focus:ring-primary outline-none'
            />
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full md:w-auto bg-white text-primary font-bold px-8 py-3 rounded-full shadow hover:bg-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
