import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type BlogPost = {
  id: string;
  locale: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  imageUrl: string;
  category: string | null;
  author: string | null;
  readTime: string | null;
  createdAt: string;
};

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blog/${slug}?locale=en`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return null;
  }
}

async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blog?locale=en`, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    const posts = await res.json();
    return posts.filter((p: BlogPost) => p.slug !== currentSlug).slice(0, 3);
  } catch {
    return [];
  }
}

export default async function EnglishBlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <section className="relative h-[400px] md:h-[500px]">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </section>

      {/* Content */}
      <article className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          {post.category && (
            <div className="mb-6">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-medium
                ${
                  post.category === "surgical"
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {post.category === "surgical" ? "Surgical" : "Non-Surgical"}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold font-playfair mb-6 text-foreground">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-muted-foreground mb-8 pb-8 border-b">
            {post.author && (
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{post.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US")}
              </span>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{post.readTime}</span>
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
            <p className="text-lg text-foreground/90 italic">{post.excerpt}</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
              {post.content || post.excerpt}
            </div>
          </div>

          {/* Back Button */}
          <div className="mb-12">
            <Link
              href="/en/blog"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to All Posts
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold font-playfair mb-8 text-center">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/en/blog/${relatedPost.slug}`}
                  className="group bg-background rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedPost.imageUrl}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
