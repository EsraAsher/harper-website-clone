"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Tag } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog-posts/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        setError("Failed to load blog post");
        console.error("Failed to fetch blog post:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      care: "bg-blue-50 text-blue-700 border-blue-200",
      training: "bg-purple-50 text-purple-700 border-purple-200",
      health: "bg-green-50 text-green-700 border-green-200",
      lifestyle: "bg-orange-50 text-orange-700 border-orange-200",
      "apartment-tips": "bg-pink-50 text-pink-700 border-pink-200",
    };
    return colors[category] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-8 animate-pulse space-y-6">
                <div className="h-8 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-6xl mb-4">🐾</div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Blog Post Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                The article you're looking for doesn't exist or has been moved.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#fef9f3] via-[#fef3e2] to-[#d4f4dd] py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Back Link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </Link>

              {/* Category Badge */}
              <div className="mb-4">
                <span
                  className={`inline-block text-xs font-medium px-3 py-1 rounded-full border ${getCategoryColor(
                    post.category
                  )}`}
                >
                  {post.category.replace("-", " ")}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  5 min read
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <article className="max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div
                  className="text-foreground leading-relaxed"
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.8",
                    fontSize: "1.125rem",
                  }}
                >
                  {post.content}
                </div>
              </div>

              {/* Tags */}
              {post.tags && (
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Tag className="w-5 h-5 text-muted-foreground" />
                    {post.tags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary text-foreground text-sm rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Section */}
              <div className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Want more pet care tips?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get our free 7-day apartment pet care plan and join our
                  newsletter for expert advice delivered to your inbox.
                </p>
                <Link
                  href="/#lead-magnet"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Get Free Guide
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Related Articles Section */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Continue Reading
              </h2>
              <div className="text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-foreground border border-border rounded-lg hover:shadow-md transition-all font-medium"
                >
                  View All Articles
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
