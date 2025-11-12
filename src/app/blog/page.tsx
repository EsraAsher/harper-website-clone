"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { Search, Clock, ArrowRight, Filter } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  tags?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "care", label: "Pet Care" },
    { value: "training", label: "Training" },
    { value: "health", label: "Health" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "apartment-tips", label: "Apartment Tips" },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog-posts?limit=50&published=true");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
          setFilteredPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags?.toLowerCase().includes(query)
      );
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts]);

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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#fef9f3] via-[#fef3e2] to-[#d4f4dd] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                PawSpace Blog
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Expert advice and guides for apartment pet owners in India
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 bg-white border-b border-border sticky top-[64px] z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Filter:</span>
              </div>
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      selectedCategory === cat.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground">
                Showing {filteredPosts.length} of {posts.length} articles
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl overflow-hidden border border-border animate-pulse"
                  >
                    <div className="h-48 bg-muted" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-muted rounded w-24" />
                      <div className="h-6 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No articles found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group bg-white rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    {/* Featured Image Placeholder */}
                    <div className="h-48 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                      <div className="text-6xl">🐾</div>
                    </div>

                    <div className="p-6">
                      {/* Category & Read Time */}
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full border ${getCategoryColor(
                            post.category
                          )}`}
                        >
                          {post.category.replace("-", " ")}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          5 min read
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
