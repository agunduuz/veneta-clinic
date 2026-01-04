// lib/homepage.ts
// Utility to fetch homepage data from API
export async function getHomepageData(locale: "tr" | "en" = "tr") {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const [
      heroRes,
      aboutRes,
      featuresRes,
      proceduresRes,
      testimonialsRes,
      blogRes,
      ctaRes,
    ] = await Promise.all([
      fetch(`${baseUrl}/api/homepage/hero?locale=${locale}`, {
        cache: "no-store",
      }),
      fetch(`${baseUrl}/api/homepage/about?locale=${locale}`, {
        cache: "no-store",
      }),
      fetch(`${baseUrl}/api/homepage/features?locale=${locale}`, {
        cache: "no-store",
      }),
      fetch(`${baseUrl}/api/homepage/procedures?locale=${locale}`, {
        cache: "no-store",
      }),
      fetch(`${baseUrl}/api/homepage/testimonials?locale=${locale}`, {
        cache: "no-store",
      }),
      fetch(`${baseUrl}/api/homepage/blog?locale=${locale}`, {
        cache: "no-store",
      }),
      fetch(`${baseUrl}/api/homepage/cta?locale=${locale}`, {
        cache: "no-store",
      }),
    ]);

    const [hero, about, features, procedures, testimonials, blog, cta] =
      await Promise.all([
        heroRes.json(),
        aboutRes.json(),
        featuresRes.json(),
        proceduresRes.json(),
        testimonialsRes.json(),
        blogRes.json(),
        ctaRes.json(),
      ]);

    return {
      hero,
      about,
      features,
      procedures,
      testimonials,
      blog,
      cta,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}

// Types
export interface HeroData {
  id: string;
  locale: string;
  title: string;
  description: string;
  stat1Number: string;
  stat1Text: string;
  stat2Number: string;
  stat2Text: string;
  button1Text: string;
  button1Link: string;
  button2Text: string;
  button2Link: string;
  imageUrl: string;
}

export interface AboutData {
  id: string;
  locale: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  rating: number;
}

export interface FeatureData {
  id: string;
  locale: string;
  title: string;
  description: string;
  order: number;
}

export interface CTAData {
  id: string;
  locale: string;
  title: string;
  description: string;
  button1Text: string;
  button1Link: string;
  button2Text: string;
  button2Link: string;
}
