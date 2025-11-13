// components/Home/LatestBlog.tsx
"use client";

import { useTranslation, useLocale } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  category: string | null;
  author: string | null;
  readTime: string | null;
  createdAt: string;
};

interface LatestBlogProps {
  data?: BlogPost[] | null;
}

const LatestBlog = ({ data }: LatestBlogProps) => {
  const { t } = useTranslation();
  const { locale } = useLocale();

  // Use database data
  const blogPosts = data && data.length > 0 ? data : [];

  // If no data, don't show section
  if (blogPosts.length === 0) {
    return null;
  }

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
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {post.category && (
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
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  {post.author && <span>{post.author}</span>}
                  {post.author && <span>•</span>}
                  <span>
                    {new Date(post.createdAt).toLocaleDateString(
                      locale === "tr" ? "tr-TR" : "en-US"
                    )}
                  </span>
                  {post.readTime && (
                    <>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-semibold font-playfair mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <Link
                  href={`/${locale === "en" ? "en/" : ""}blog/${post.slug}`}
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
