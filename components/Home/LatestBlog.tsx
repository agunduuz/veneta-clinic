// components/Home/LatestBlog.tsx
"use client";

import { useTranslation } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type BlogPost = {
  id: number;
  titleKey: string;
  descriptionKey: string;
  image: string;
  category: "surgical" | "non-surgical";
  authorKey: string;
  dateKey: string;
  readTimeKey: string;
};

const LatestBlog = () => {
  const { t } = useTranslation();

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      titleKey: "home.blog.post1Title",
      descriptionKey: "home.blog.post1Description",
      image:
        "https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "non-surgical",
      authorKey: "home.blog.post1Author",
      dateKey: "home.blog.post1Date",
      readTimeKey: "home.blog.post1ReadTime",
    },
    {
      id: 2,
      titleKey: "home.blog.post2Title",
      descriptionKey: "home.blog.post2Description",
      image:
        "https://images.pexels.com/photos/4269274/pexels-photo-4269274.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "surgical",
      authorKey: "home.blog.post2Author",
      dateKey: "home.blog.post2Date",
      readTimeKey: "home.blog.post2ReadTime",
    },
    {
      id: 3,
      titleKey: "home.blog.post3Title",
      descriptionKey: "home.blog.post3Description",
      image:
        "https://images.pexels.com/photos/7319170/pexels-photo-7319170.jpeg?auto=compress&cs=tinysrgb&w=1600",
      category: "non-surgical",
      authorKey: "home.blog.post3Author",
      dateKey: "home.blog.post3Date",
      readTimeKey: "home.blog.post3ReadTime",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-muted/20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold font-playfair mb-4"
          >
            {t("home.blog.title")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {t("home.blog.subtitle")}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group bg-background rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={t(post.titleKey)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${
                      post.category === "surgical"
                        ? "bg-accent/90 text-accent-foreground"
                        : "bg-secondary/90 text-secondary-foreground"
                    }
                    backdrop-blur-sm`}
                  >
                    {post.category === "surgical"
                      ? t("home.blog.categorySurgical")
                      : t("home.blog.categoryNonSurgical")}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span>{t(post.authorKey)}</span>
                  <span>•</span>
                  <span>{t(post.dateKey)}</span>
                  <span>•</span>
                  <span>{t(post.readTimeKey)}</span>
                </div>

                <h3 className="text-xl font-semibold font-playfair mb-3 group-hover:text-primary transition-colors">
                  {t(post.titleKey)}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {t(post.descriptionKey)}
                </p>

                <Link
                  href="#"
                  className="inline-flex items-center text-primary font-medium text-sm group-hover:text-primary/80 transition-colors"
                >
                  {t("home.blog.readMore")}
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-12">
          <Link
            href="#"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-md 
                     hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform duration-200"
          >
            {t("home.blog.viewAll")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LatestBlog;
