// types/surgical-aesthetics.ts

// ✅ API Response (Direkt field'lar + arrays)
export interface SurgicalAestheticsData extends PageData {
  features: Feature[];
  aboutSection: AboutSection | null;
  aboutAreas: AboutArea[];
  aboutAdvantages: AboutAdvantage[];
  processSteps: ProcessStep[];
  whyUs: WhyUsReason[];
  faqs: FAQ[];
  deviceFeatures: DeviceItem[];
  deviceAdvantages: DeviceItem[];
  treatmentAreas: TreatmentArea[];
  pricing: Pricing[];
}

export interface PageData {
  id: string;
  slug: string;
  locale: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;

  // Hero Section
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroButtonReviews: string;
  heroButtonPhone: string;
  heroImage: string;
  heroImageAlt: string;

  // Device Section
  deviceTitle: string;
  deviceDescription: string;
  deviceFeaturesTitle: string;
  deviceAdvantagesTitle: string;

  // Pricing Section
  pricingTitle: string;
  pricingDescription: string;
  pricingCallText: string;

  // Categories Intro
  categoriesIntroTitle?: string | null;
  categoriesIntroDescription?: string | null;

  // Why Us Section
  whyUsTitle: string;

  // FAQ Section
  faqTitle: string;

  // CTA Section
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonPhone: string;
  ctaButtonWhatsApp: string;
}

export interface Feature {
  id: string;
  pageSlug: string;
  locale: string;
  icon: string;
  title: string;
  description: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AboutSection {
  id: string;
  pageSlug: string;
  locale: string;
  title: string;
  description: string;
  areasTitle: string;
  advantagesTitle: string;
  createdAt: string;
  updatedAt: string;
}

export interface AboutArea {
  id: string;
  pageSlug: string;
  locale: string;
  text: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AboutAdvantage {
  id: string;
  pageSlug: string;
  locale: string;
  text: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProcessStep {
  id: string;
  pageSlug: string;
  locale: string;
  number: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WhyUsReason {
  id: string;
  pageSlug: string;
  locale: string;
  icon: string;
  title: string;
  description: string;
  colorScheme: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  pageSlug: string;
  locale: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Device Items (Lazer Epilasyon için)
export interface DeviceItem {
  id: string;
  pageSlug: string;
  locale: string;
  type: string; // "feature" | "advantage"
  title: string;
  description: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Treatment Areas (Lazer Epilasyon için)
export interface TreatmentArea {
  id: string;
  pageSlug: string;
  locale: string;
  title: string;
  description: string;
  image?: string | null;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Pricing (Lazer Epilasyon için)
export interface Pricing {
  id: string;
  pageSlug: string;
  locale: string;
  packageName: string;
  sessionCount: string;
  price: string;
  colorScheme: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
