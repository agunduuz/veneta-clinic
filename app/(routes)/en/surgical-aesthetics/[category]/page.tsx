import { englishNavigationItems } from '@/data/navigation';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import EnglishCategoryPageContent from '@/components/CategoryComponent/EnglishCategoryPageContent';
import PhoneButton from '@/components/Header/PhoneButton';
import WhatsAppButton from '@/components/Header/WhatsAppButton';

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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [
      '/images/goz-kapagi-1.jpeg',
      '/images/goz-kapagi-2.jpeg',
      '/images/goz-kapagi-3.jpeg',
      '/images/goz-kapagi-4.jpeg',
      '/images/goz-kapagi-5.jpeg',
      '/images/goz-kapagi-6.jpeg',
    ],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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
    images: [],
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

  return (
    <>
      <EnglishCategoryPageContent
        operationInfo={operationInfo}
        subMenu={subMenu}
      />
      <PhoneButton />
      <WhatsAppButton />
    </>
  );
}
