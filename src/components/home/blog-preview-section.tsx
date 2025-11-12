"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
}

export default function BlogPreviewSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog-posts?limit=3");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      care: "bg-blue-50 text-blue-700",
      training: "bg-purple-50 text-purple-700",
      health: "bg-green-50 text-green-700",
      lifestyle: "bg-orange-50 text-orange-700",
      "apartment-tips": "bg-pink-50 text-pink-700",
    };
    return colors[category] || "bg-gray-50 text-gray-700";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Latest Pet Care Guides
            </h2>
            <p className="text-lg text-muted-foreground">
              Expert tips and advice for apartment pet owners
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-border animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-20" />
                  <div className="h-6 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                      {post.category.replace("-", " ")}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      5 min read
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="text-primary text-sm font-medium group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
