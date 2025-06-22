'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GallerySlider({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [current, images.length]);

  if (!images || images.length === 0) return null;

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === current) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <div className='relative w-full max-w-[600px] mx-auto'>
      {/* Main Image Container */}
      <div className='relative overflow-hidden rounded-2xl shadow-2xl'>
        <div
          className='flex transition-transform duration-300 ease-in-out'
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className='relative w-full flex-shrink-0'
              style={{ minWidth: '100%' }}
            >
              <Image
                src={image}
                alt={`${alt} - ${index + 1}`}
                width={600}
                height={400}
                className='w-full h-96 object-cover'
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-10'
              onClick={prevSlide}
              disabled={isTransitioning}
              aria-label='Önceki fotoğraf'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
            <button
              className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-10'
              onClick={nextSlide}
              disabled={isTransitioning}
              aria-label='Sonraki fotoğraf'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className='absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium z-10'>
            {current + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Dots Navigation */}
      {images.length > 1 && (
        <div className='flex justify-center mt-4 gap-2'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === current
                  ? 'bg-primary scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Fotoğraf ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className='flex gap-2 mt-4 overflow-x-auto pb-2'>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 relative overflow-hidden rounded-lg transition-all duration-200 ${
                index === current
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'hover:opacity-80'
              }`}
              aria-label={`Fotoğraf ${index + 1}`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={60}
                className='w-20 h-15 object-cover'
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
