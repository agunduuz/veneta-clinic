'use client';

const CallToActionEnglish = () => {
  return (
    <section className='relative py-16 bg-primary/70 overflow-hidden'>
      {/* Soft background circles */}
      <div className='absolute left-8 top-8 w-40 h-40 bg-primary/30 rounded-full z-0' />
      <div className='absolute right-0 top-0 w-72 h-72 bg-primary/30 rounded-full z-0' />
      <div className='container mx-auto px-4 relative z-10 flex flex-col items-center text-center'>
        <h2 className='text-2xl md:text-4xl font-bold font-playfair mb-4 text-foreground'>
          Ready to Start Your Transformation Journey?
        </h2>
        <p className='text-base md:text-lg text-foreground mb-8 max-w-2xl'>
          Schedule a consultation with our experts to discuss your
          aesthetic goals and create a personalized treatment plan for
          you.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button className='bg-background text-primary font-semibold px-8 py-3 rounded-md shadow hover:bg-primary/90 hover:text-background transition-colors border border-transparent'>
            Get Consultation
          </button>
          <button className='bg-transparent text-foreground font-semibold px-8 py-3 rounded-md border border-foreground/40 hover:bg-background/60 transition-colors'>
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionEnglish;
