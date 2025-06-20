import { englishNavigationItems } from '@/data/navigation';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import {
  Award,
  Users,
  Clock,
  Shield,
  Star,
  CheckCircle,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Zap,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

// English operation data for each surgical category
const englishOperationData = {
  facial: {
    title: 'Facial Aesthetics',
    description:
      'Facial aesthetics are surgical procedures performed to rejuvenate facial features and achieve a more balanced appearance.',
    advantages: [
      'Rejuvenated facial appearance',
      'More balanced facial features',
      'Increased self-confidence',
      'Natural results',
    ],
    process: [
      {
        step: 'Initial Consultation',
        description:
          'Facial analysis and personalized treatment plan with our expert doctor.',
      },
      {
        step: 'Surgery Day',
        description:
          'Safe facial aesthetics surgery under modern operating room conditions.',
      },
      {
        step: 'Recovery Process',
        description:
          'Rapid recovery process with regular check-ups and professional follow-up.',
      },
    ],
    faqs: [
      {
        question: 'How long does facial aesthetics surgery take?',
        answer: 'Surgery duration varies between 2-4 hours.',
      },
      {
        question: 'How does the recovery process go?',
        answer:
          'Swelling and bruising may occur in the first 1-2 weeks, normal life can resume within 3-4 weeks.',
      },
      {
        question: 'Are the results permanent?',
        answer:
          'Yes, facial aesthetics results are long-lasting for many years.',
      },
    ],
    image: '/images/goz-kapagi.jpeg',
  },
  rhinoplasty: {
    title: 'Rhinoplasty',
    description:
      'Rhinoplasty is a surgical procedure performed to correct the shape of the nose and resolve functional problems.',
    advantages: [
      'More balanced nose appearance',
      'Improved breathing',
      'Nose in harmony with face',
      'Increased self-confidence',
    ],
    process: [
      {
        step: 'Initial Consultation',
        description:
          'Nose analysis, 3D imaging and personalized treatment plan.',
      },
      {
        step: 'Surgery Day',
        description:
          'Safe rhinoplasty surgery with open or closed technique.',
      },
      {
        step: 'Recovery Process',
        description:
          'Packing is removed on day 7, normal life can resume within 2 weeks.',
      },
    ],
    faqs: [
      {
        question: 'How long does rhinoplasty take?',
        answer: 'Surgery duration varies between 1-2 hours.',
      },
      {
        question:
          'How long does it take for the nose to take its final shape?',
        answer:
          'The nose may take 6-12 months to take its final shape.',
      },
      {
        question: 'Which technique is better, open or closed?',
        answer:
          "Both techniques are effective, the doctor decides based on the patient's condition.",
      },
    ],
    image: '/images/burun-estetigi.jpg',
  },
  'face-lift': {
    title: 'Face Lift',
    description:
      'Face lift is a surgical procedure performed to reduce signs of aging and achieve a more youthful appearance.',
    advantages: [
      'Significant rejuvenation effect',
      'Correction of sagging tissues',
      'Tighter facial features',
      'Long-lasting results',
    ],
    process: [
      {
        step: 'Initial Consultation',
        description: 'Facial analysis and evaluation of aging signs.',
      },
      {
        step: 'Surgery Day',
        description: 'Safe face lift surgery with minimal incision.',
      },
      {
        step: 'Recovery Process',
        description:
          'Swelling decreases within 2-3 weeks, normal life can resume within 1 month.',
      },
    ],
    faqs: [
      {
        question: 'How long does face lift surgery take?',
        answer: 'Surgery duration varies between 2-3 hours.',
      },
      {
        question: 'How long do the results last?',
        answer: 'Face lift results can last 5-10 years.',
      },
      {
        question: 'Will there be scars?',
        answer:
          'Incisions are hidden in the hairline, minimal scarring occurs.',
      },
    ],
    image: '/images/yuz-germe.jpg',
  },
  'facial-eye-bag-surgery': {
    title: 'Eye Bag Surgery',
    description:
      'Eye bag surgery is a surgical procedure performed to make the eye area more attractive.',
    advantages: [
      'More attractive eye appearance',
      'Eye area rejuvenation',
      'Larger eye effect',
      'Natural results',
    ],
    process: [
      {
        step: 'Initial Consultation',
        description:
          'Eye area analysis and personalized treatment plan.',
      },
      {
        step: 'Surgery Day',
        description: 'Safe eye bag surgery with delicate technique.',
      },
      {
        step: 'Recovery Process',
        description:
          'Stitches are removed within 1 week, normal appearance within 2-3 weeks.',
      },
    ],
    faqs: [
      {
        question: 'How long does eye bag surgery take?',
        answer: 'Surgery duration varies between 1-1.5 hours.',
      },
      {
        question: 'How does the recovery process go?',
        answer:
          'Swelling and bruising may occur in the first days, decreases within 1 week.',
      },
      {
        question: 'Are the results permanent?',
        answer: 'Yes, eye bag surgery results are permanent.',
      },
    ],
    image: '/images/goz-kapagi-1.jpeg',
  },
  body: {
    title: 'Body Aesthetics',
    description:
      'Body aesthetics are surgical procedures performed to improve body shape and achieve a more balanced appearance.',
    advantages: [
      'Improved body shape',
      'More balanced proportions',
      'Increased self-confidence',
      'Long-lasting results',
    ],
    process: [
      {
        step: 'Initial Consultation',
        description:
          'Body analysis and goal setting with personalized plan.',
      },
      {
        step: 'Surgery Day',
        description:
          'Safe body aesthetics surgery with modern techniques.',
      },
      {
        step: 'Recovery Process',
        description: 'Normal activities can resume within 2-4 weeks.',
      },
    ],
    faqs: [
      {
        question: 'How long does body aesthetics surgery take?',
        answer: 'Surgery duration varies between 2-4 hours.',
      },
      {
        question: 'Can I exercise?',
        answer: 'Light sports can be started 2-3 months later.',
      },
      {
        question: 'How long do the results last?',
        answer: 'Results are permanent with a healthy lifestyle.',
      },
    ],
    image: '/images/vucut-estetigi.jpg',
  },
  'tummy-tuck': {
    title: 'Tummy Tuck',
    description:
      'Tummy tuck is a procedure performed to remove excess skin and fat tissue from the abdominal area to achieve a tighter appearance.',
    advantages: [
      'Tightened abdominal area',
      'Flattened abdomen',
      'Improved posture',
      'Increased self-confidence',
    ],
    process: [
      {
        step: 'Initial Consultation',
        description:
          'Abdominal area analysis and personalized treatment plan.',
      },
      {
        step: 'Surgery Day',
        description:
          'Safe tummy tuck surgery with removal of excess skin and fat.',
      },
      {
        step: 'Recovery Process',
        description: 'Normal activities can resume within 3-4 weeks.',
      },
    ],
    faqs: [
      {
        question: 'How long does tummy tuck surgery take?',
        answer: 'Surgery duration varies between 2-3 hours.',
      },
      {
        question: 'Will there be scars?',
        answer:
          'Incision is hidden in the groin line, visibility decreases over time.',
      },
      {
        question: 'Can it be done after pregnancy?',
        answer: 'Yes, it can be done 6 months after childbirth.',
      },
    ],
    image: '/images/karin-germe.jpg',
  },
  liposuction: {
    title: 'Liposuction',
    description:
      'Liposuction is a procedure performed to remove excess fat tissue from specific areas of the body to achieve a more balanced body shape.',
    advantages: [
      'Targeted fat removal',
      'More balanced body shape',
      'Quick results',
      'Minimal scarring',
    ],
    process: [
      {
        step: 'Initial Consultation',
        description:
          'Body analysis and determination of target areas.',
      },
      {
        step: 'Surgery Day',
        description:
          'Safe fat removal with modern liposuction techniques.',
      },
      {
        step: 'Recovery Process',
        description: 'Normal activities can resume within 1-2 weeks.',
      },
    ],
    faqs: [
      {
        question: 'How long does liposuction take?',
        answer: 'Surgery duration varies between 1-3 hours.',
      },
      {
        question: 'Will the fat come back?',
        answer: 'Fat does not return with a healthy lifestyle.',
      },
      {
        question: 'Which areas can it be applied to?',
        answer:
          'Can be applied to areas such as abdomen, waist, hips, legs, arms.',
      },
    ],
    image: '/images/liposuction.jpg',
  },
  breast: {
    title: 'Breast Aesthetics',
    description:
      'Breast aesthetics are surgical procedures performed to improve the shape, size and symmetry of breasts.',
    advantages: [
      'Improved breast shape',
      'More balanced proportions',
      'Increased self-confidence',
      'Natural appearance',
    ],
    process: [
      {
        step: 'Initial Consultation',
        description:
          'Breast analysis and personalized treatment plan.',
      },
      {
        step: 'Surgery Day',
        description: 'Safe breast aesthetics surgery.',
      },
      {
        step: 'Recovery Process',
        description: 'Normal activities can resume within 2-3 weeks.',
      },
    ],
    faqs: [
      {
        question: 'How long does breast aesthetics surgery take?',
        answer: 'Surgery duration varies between 2-3 hours.',
      },
      {
        question: 'Can I breastfeed?',
        answer: 'Breastfeeding function is preserved in most cases.',
      },
      {
        question: 'Are the results permanent?',
        answer: 'Yes, breast aesthetics results are permanent.',
      },
    ],
    image: '/images/meme-estetigi.jpg',
  },
  augmentation: {
    title: 'Breast Augmentation',
    description:
      'Breast augmentation is a surgical procedure performed to increase breast size and achieve a fuller appearance.',
    advantages: [
      'Increased breast size',
      'Fuller appearance',
      'Improved proportions',
      'Increased self-confidence',
    ],
    process: [
      {
        step: 'Initial Consultation',
        description:
          'Breast analysis, implant selection and personalized plan.',
      },
      {
        step: 'Surgery Day',
        description:
          'Safe breast augmentation surgery with implant placement.',
      },
      {
        step: 'Recovery Process',
        description: 'Normal activities can resume within 2-3 weeks.',
      },
    ],
    faqs: [
      {
        question: 'How long does breast augmentation take?',
        answer: 'Surgery duration varies between 1-2 hours.',
      },
      {
        question: 'Which implant type is better?',
        answer:
          'Each implant type has advantages, doctor recommendation is important.',
      },
      {
        question: 'Are the results natural?',
        answer:
          'Yes, natural results are achieved with modern techniques.',
      },
    ],
    image: '/images/meme-buyutme.jpg',
  },
  reduction: {
    title: 'Breast Reduction',
    description:
      'Breast reduction is a surgical procedure performed to reduce large breasts and achieve a more balanced appearance.',
    advantages: [
      'Reduced breast size',
      'More balanced proportions',
      'Reduced back pain',
      'Improved quality of life',
    ],
    process: [
      {
        step: 'Initial Consultation',
        description: 'Breast analysis and target size determination.',
      },
      {
        step: 'Surgery Day',
        description: 'Safe breast reduction surgery.',
      },
      {
        step: 'Recovery Process',
        description: 'Normal activities can resume within 3-4 weeks.',
      },
    ],
    faqs: [
      {
        question: 'How long does breast reduction take?',
        answer: 'Surgery duration varies between 2-3 hours.',
      },
      {
        question: 'Can I breastfeed?',
        answer: 'Breastfeeding function is preserved in most cases.',
      },
      {
        question: 'Will there be scars?',
        answer: 'Scars lose their prominence over time.',
      },
    ],
    image: '/images/meme-kucultme.jpg',
  },
};

export async function generateStaticParams() {
  const surgical = englishNavigationItems.find(
    (item) => item.title === 'Surgical Aesthetics'
  );
  return (
    surgical?.subMenus?.map((sub) => ({
      category: sub.href.replace('/en/surgical-aesthetics/', ''),
    })) || []
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const surgical = englishNavigationItems.find(
    (item) => item.title === 'Surgical Aesthetics'
  );
  const subMenu = surgical?.subMenus?.find(
    (sub) =>
      sub.href.replace('/en/surgical-aesthetics/', '') === category
  );

  if (!subMenu) return { title: 'Page Not Found' };

  const operationInfo =
    englishOperationData[
      category as keyof typeof englishOperationData
    ];
  const title = `${
    operationInfo?.title || subMenu.title
  } | Turkey's Best Aesthetic Clinic | Veneta Clinic`;
  const description = `${
    operationInfo?.title || subMenu.title
  } - Turkey's leading aesthetic clinic. 15+ years of experience, expert doctors, modern technology. Call now for free consultation!`;

  return {
    title,
    description,
    keywords: [
      operationInfo?.title || subMenu.title,
      'aesthetic surgery',
      'Turkey aesthetic clinic',
      'Istanbul aesthetics',
      'safe aesthetics',
      'expert doctor',
      'modern technology',
      'patient satisfaction',
    ].join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      siteName: 'Veneta Clinic',
      images: [
        {
          url: operationInfo?.image || '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${
            operationInfo?.title || subMenu.title
          } - Veneta Clinic`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [operationInfo?.image || '/images/og-image.jpg'],
    },
    alternates: {
      canonical: `https://venetaclinic.com/en/surgical-aesthetics/${category}`,
    },
  };
}

export default async function EnglishCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const surgical = englishNavigationItems.find(
    (item) => item.title === 'Surgical Aesthetics'
  );
  const subMenu = surgical?.subMenus?.find(
    (sub) =>
      sub.href.replace('/en/surgical-aesthetics/', '') === category
  );

  if (!subMenu) return notFound();

  const operationInfo =
    englishOperationData[
      category as keyof typeof englishOperationData
    ];

  const stats = [
    { icon: Users, value: '15,000+', label: 'Happy Patients' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Star, value: '4.9/5', label: 'Patient Rating' },
    { icon: Shield, value: '100%', label: 'Safety' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Modern Technology',
      description: 'Latest technological devices and methods',
    },
    {
      icon: Heart,
      title: 'Patient-Focused',
      description:
        "Planning according to each patient's special needs",
    },
    {
      icon: Clock,
      title: 'Quick Recovery',
      description: 'Fast recovery with minimal invasive methods',
    },
    {
      icon: TrendingUp,
      title: 'Proven Results',
      description: 'Methods supported by scientific research',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden'>
        <div className='absolute inset-0 bg-grid-pattern opacity-5'></div>
        <div className='container py-16 md:py-24 relative z-10'>
          <div className='flex flex-col lg:flex-row items-center gap-12'>
            <div className='flex-1 space-y-6'>
              <div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-fade-in'>
                <Award className='h-4 w-4' />
                Turkey&apos;s Best Aesthetic Clinic
              </div>

              <h1 className='text-4xl md:text-6xl font-bold leading-tight animate-title-slide-up'>
                {operationInfo?.title || subMenu.title}
                <span className='block text-primary'>
                  Expert Doctors
                </span>
              </h1>

              <p className='text-xl text-muted-foreground leading-relaxed animate-fade-up'>
                With 15+ years of experience and modern technology, we
                serve as Turkey&apos;s leading clinic in{' '}
                {operationInfo?.title || subMenu.title.toLowerCase()}.
                Meet our expert team for safe, effective and natural
                results.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 animate-fade-up'>
                <Link
                  href='tel:+902125612322'
                  target='_blank'
                  className='bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg'
                >
                  <Phone className='h-5 w-5 inline mr-2' />
                  Free Consultation
                </Link>
                <Link
                  href='https://wa.me/905309153488'
                  target='_blank'
                  className='border-2 border-primary text-primary px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300'
                >
                  <Calendar className='h-5 w-5 inline mr-2' />
                  Book Appointment
                </Link>
              </div>
            </div>

            <div className='flex-1 flex justify-center'>
              <div className='relative'>
                <Image
                  src={
                    operationInfo?.image || '/images/doctors-team.jpg'
                  }
                  alt={`${
                    operationInfo?.title || subMenu.title
                  } - Veneta Clinic Expert Doctors`}
                  width={500}
                  height={400}
                  className='rounded-2xl shadow-2xl object-cover animate-float'
                  priority
                />
                <div className='absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg animate-slide-in-right'>
                  <div className='flex items-center gap-3'>
                    <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                      <Star className='h-6 w-6 text-primary' />
                    </div>
                    <div>
                      <p className='font-bold text-lg'>4.9/5</p>
                      <p className='text-sm text-muted-foreground'>
                        Patient Rating
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-16 bg-muted/30'>
        <div className='container'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className='stats-card text-center animate-fade-in'
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <stat.icon className='h-8 w-8 text-primary mx-auto mb-2' />
                <div className='text-2xl font-bold text-foreground'>
                  {stat.value}
                </div>
                <div className='text-sm text-muted-foreground'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Why Choose Veneta Clinic?
            </h2>
            <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
              As Turkey&apos;s most reliable aesthetic clinic, we
              provide the highest quality service to each of our
              patients.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className='feature-card bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in'
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className='icon-container w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 transition-transform duration-300'>
                  <feature.icon className='h-8 w-8 text-primary' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>
                  {feature.title}
                </h3>
                <p className='text-muted-foreground'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className='py-16 bg-gradient-to-r from-primary/5 to-secondary/5'>
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6'>
              <h2 className='text-3xl md:text-4xl font-bold'>
                Why Should You Choose Us for{' '}
                {operationInfo?.title || subMenu.title}?
              </h2>
              <p className='text-lg text-muted-foreground'>
                We apply the safest and most effective treatment
                methods with our expert doctors, modern technology and
                patient-focused approach.
              </p>

              <div className='space-y-4'>
                {[
                  'Expert and experienced doctor staff',
                  'Modern and safe technology',
                  'Personalized treatment plans',
                  'Quick recovery processes',
                  'Continuous patient follow-up',
                  'Affordable price guarantee',
                ].map((item, idx) => (
                  <div
                    key={item}
                    className='flex items-center gap-3 animate-fade-in'
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <CheckCircle className='h-5 w-5 text-primary flex-shrink-0' />
                    <span className='text-foreground'>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className='relative'>
              <Image
                src='/images/klinik-resimleri.jpeg'
                alt='Veneta Clinic Modern Clinic Environment'
                width={600}
                height={400}
                className='rounded-2xl shadow-xl object-cover'
              />
              <div className='absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg'>
                <div className='flex items-center gap-3'>
                  <MapPin className='h-5 w-5 text-primary' />
                  <div>
                    <p className='font-semibold'>
                      Istanbul, Nisantasi
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      Central Location
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className='py-16 bg-gradient-to-r from-primary/5 to-secondary/5'>
        <div className='container'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-3xl md:text-4xl font-bold mb-8 text-center'>
              {operationInfo?.title || subMenu.title} - Turkey&apos;s
              Best Aesthetic Clinic
            </h1>

            <div className='prose prose-lg max-w-none'>
              <h2 className='text-2xl md:text-3xl font-bold mb-6 text-primary'>
                What is {operationInfo?.title || subMenu.title}?
              </h2>
              <p className='text-lg text-muted-foreground mb-8 leading-relaxed'>
                {operationInfo?.description ||
                  `${subMenu.title} is one of the safe and effective aesthetic surgical procedures performed with modern medical technologies and our expert doctor staff. With 15+ years of experience, we prepare personalized treatment plans according to each patient\'s special needs.`}
              </p>

              <h2 className='text-2xl md:text-3xl font-bold mb-6 text-primary'>
                {operationInfo?.title || subMenu.title} Advantages
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                {operationInfo?.advantages?.map((advantage, idx) => (
                  <div
                    key={idx}
                    className='bg-white rounded-xl p-6 shadow-lg'
                  >
                    <h3 className='text-xl font-semibold mb-3 text-foreground'>
                      {advantage}
                    </h3>
                    <p className='text-muted-foreground'>
                      This is one of the important benefits achieved
                      with {operationInfo?.title || subMenu.title}.
                    </p>
                  </div>
                )) || [
                  <div
                    key='1'
                    className='bg-white rounded-xl p-6 shadow-lg'
                  >
                    <h3 className='text-xl font-semibold mb-3 text-foreground'>
                      Safe Technology
                    </h3>
                    <p className='text-muted-foreground'>
                      Safe operations with latest technological
                      devices and minimal invasive methods.
                    </p>
                  </div>,
                  <div
                    key='2'
                    className='bg-white rounded-xl p-6 shadow-lg'
                  >
                    <h3 className='text-xl font-semibold mb-3 text-foreground'>
                      Expert Doctors
                    </h3>
                    <p className='text-muted-foreground'>
                      Professional service with expert and experienced
                      surgeons in their field.
                    </p>
                  </div>,
                ]}
              </div>

              <h2 className='text-2xl md:text-3xl font-bold mb-6 text-primary'>
                {operationInfo?.title || subMenu.title} Process
              </h2>
              <div className='space-y-6 mb-8'>
                {operationInfo?.process?.map((step, idx) => (
                  <div key={idx} className='flex items-start gap-4'>
                    <div className='w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1'>
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold mb-2'>
                        {step.step}
                      </h3>
                      <p className='text-muted-foreground'>
                        {step.description}
                      </p>
                    </div>
                  </div>
                )) || [
                  <div key='1' className='flex items-start gap-4'>
                    <div className='w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1'>
                      1
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold mb-2'>
                        Initial Consultation
                      </h3>
                      <p className='text-muted-foreground'>
                        Detailed meeting with our expert doctor and
                        preparation of personalized treatment plan.
                      </p>
                    </div>
                  </div>,
                ]}
              </div>

              <h2 className='text-2xl md:text-3xl font-bold mb-6 text-primary'>
                {operationInfo?.title || subMenu.title} Prices
              </h2>
              <p className='text-lg text-muted-foreground mb-6'>
                {operationInfo?.title || subMenu.title} prices may
                vary depending on the patient&apos;s special condition
                and the scope of the procedure. You can make a free
                consultation appointment for detailed information and
                price offer.
              </p>

              <div className='bg-primary/10 rounded-xl p-6 mb-8'>
                <h3 className='text-xl font-semibold mb-3 text-primary'>
                  Why Should You Choose Veneta Clinic?
                </h3>
                <ul className='space-y-2 text-muted-foreground'>
                  <li className='flex items-center gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary flex-shrink-0' />
                    15+ years of experience and expert staff
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary flex-shrink-0' />
                    Modern technology and safe environment
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary flex-shrink-0' />
                    Personalized treatment plans
                  </li>
                  <li className='flex items-center gap-2'>
                    <CheckCircle className='h-5 w-5 text-primary flex-shrink-0' />
                    Continuous patient follow-up and support
                  </li>
                </ul>
              </div>

              <h2 className='text-2xl md:text-3xl font-bold mb-6 text-primary'>
                Frequently Asked Questions About{' '}
                {operationInfo?.title || subMenu.title}
              </h2>
              <div className='space-y-4 mb-8'>
                {operationInfo?.faqs?.map((faq, idx) => (
                  <div
                    key={idx}
                    className='bg-white rounded-xl p-6 shadow-lg'
                  >
                    <h3 className='text-xl font-semibold mb-2 text-foreground'>
                      {faq.question}
                    </h3>
                    <p className='text-muted-foreground'>
                      {faq.answer}
                    </p>
                  </div>
                )) || [
                  <div
                    key='1'
                    className='bg-white rounded-xl p-6 shadow-lg'
                  >
                    <h3 className='text-xl font-semibold mb-2 text-foreground'>
                      How long does{' '}
                      {operationInfo?.title || subMenu.title} take?
                    </h3>
                    <p className='text-muted-foreground'>
                      Surgery duration varies between 1-3 hours
                      depending on the patient&apos;s condition.
                    </p>
                  </div>,
                ]}
              </div>

              <div className='text-center bg-primary text-primary-foreground rounded-2xl p-8'>
                <h2 className='text-2xl md:text-3xl font-bold mb-4'>
                  Contact Us Now for{' '}
                  {operationInfo?.title || subMenu.title}
                </h2>
                <p className='text-lg mb-6 opacity-90'>
                  Call now or send a message via WhatsApp for free
                  consultation with our expert doctors.
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Link
                    href='tel:+902125612322'
                    className='bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300'
                  >
                    <Phone className='h-5 w-5 inline mr-2' />
                    Call Now
                  </Link>
                  <Link
                    href='https://wa.me/905309153488'
                    target='_blank'
                    className='border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300'
                  >
                    Message via WhatsApp
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
