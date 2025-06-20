import Image from 'next/image';

const ContactHeaderEn = () => (
  <section className='container my-8'>
    <div className='flex flex-col md:flex-row bg-secondary rounded-2xl overflow-hidden shadow-md'>
      {/* Left Area */}
      <div className='flex-1 flex flex-col justify-center p-8 md:p-12'>
        <h1 className='text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight'>
          Contact Us For <br />
          Your Health
        </h1>
        <p className='text-muted-foreground text-lg mb-8'>
          Get in touch quickly with our expert doctors, take the right
          step for your health.
        </p>
        <button className='bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-8 py-3 rounded-xl text-lg transition w-max shadow'>
          Apply Now
        </button>
      </div>
      {/* Right Area */}
      <div className='flex-1 relative min-h-[260px] md:min-h-[400px]'>
        <Image
          src='/images/doctors-team.jpg'
          alt='Doctors Team'
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 50vw'
          priority
          style={{
            borderTopRightRadius: '1rem',
            borderBottomRightRadius: '1rem',
          }}
        />
      </div>
    </div>
  </section>
);

export default ContactHeaderEn;
