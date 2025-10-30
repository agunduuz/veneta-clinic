// components/Home/PatientStories.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Testimonial = {
  id: number;
  nameKey: string;
  procedureKey: string;
  image: string;
  rating: number;
  commentKey: string;
};

const PatientStories = () => {
  const { t } = useTranslation();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      nameKey: "home.testimonials.patient1Name",
      procedureKey: "home.testimonials.patient1Procedure",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1600",
      rating: 5,
      commentKey: "home.testimonials.patient1Comment",
    },
    {
      id: 2,
      nameKey: "home.testimonials.patient2Name",
      procedureKey: "home.testimonials.patient2Procedure",
      image:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1600",
      rating: 5,
      commentKey: "home.testimonials.patient2Comment",
    },
    {
      id: 3,
      nameKey: "home.testimonials.patient3Name",
      procedureKey: "home.testimonials.patient3Procedure",
      image:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
      rating: 5,
      commentKey: "home.testimonials.patient3Comment",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-10 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            {t("home.testimonials.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("home.testimonials.subtitle")}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 relative px-4"
                >
                  <div className="bg-muted/30 rounded-2xl p-4 md:p-12">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-foreground italic mb-4 text-sm md:text-base">
                          &quot;{t(testimonial.commentKey)}&quot;
                        </p>
                        <h3 className="font-semibold text-lg md:text-xl">
                          {t(testimonial.nameKey)}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {t(testimonial.procedureKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background rounded-full p-2 shadow-lg hover:bg-primary/5 transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-background rounded-full p-2 shadow-lg hover:bg-primary/5 transition-colors"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                  ${
                    idx === selectedIndex ? "bg-primary w-8" : "bg-primary/20"
                  }`}
                onClick={() => emblaApi?.scrollTo(idx)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PatientStories;
