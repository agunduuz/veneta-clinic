// app/(routes)/blog/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
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

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "surgical" | "non-surgical"
  >("all");

  const loadBlogPosts = useCallback(async () => {
    setLoading(true);
    try {
      const url =
        activeFilter === "all"
          ? `/api/blog?locale=tr`
          : `/api/blog?locale=tr&category=${activeFilter}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setBlogPosts(data);
      }
    } catch (error) {
      console.error("Failed to load blog posts:", error);
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  useEffect(() => {
    loadBlogPosts();
  }, [loadBlogPosts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
              Blog
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Estetik ve sağlık hakkında güncel bilgiler, uzman görüşleri ve
              ipuçları
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2">
            {["all", "surgical", "non-surgical"].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter as typeof activeFilter)}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 text-sm md:text-base
                  ${
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted/30 text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter === "all"
                  ? "Tümü"
                  : filter === "surgical"
                  ? "Ameliyatlı"
                  : "Ameliyatsız"}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Yükleniyor...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Henüz blog yazısı eklenmemiş.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {blogPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group bg-background rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/blog/${post.slug}`}>
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
                            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm
                            ${
                              post.category === "surgical"
                                ? "bg-accent/90 text-accent-foreground"
                                : "bg-secondary/90 text-secondary-foreground"
                            }`}
                          >
                            {post.category === "surgical"
                              ? "Ameliyatlı"
                              : "Ameliyatsız"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        {post.author && <span>{post.author}</span>}
                        {post.author && <span>•</span>}
                        <span>
                          {new Date(post.createdAt).toLocaleDateString("tr-TR")}
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

                      <span className="inline-flex items-center text-primary font-medium text-sm group-hover:text-primary/80 transition-colors">
                        Devamını Oku
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
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
