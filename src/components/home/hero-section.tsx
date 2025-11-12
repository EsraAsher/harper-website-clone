"use client";

import Link from "next/link";
import { ArrowRight, Dog, Cat, Home } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#fef9f3] via-[#fef3e2] to-[#d4f4dd] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">Smart Pet Care for Urban Apartments</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your Guide to Happy Pets in{" "}
            <span className="text-primary">Small Spaces</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Expert routines, curated products, and practical guides for urban apartment pet owners in India. Make the most of your space while keeping your furry friends healthy and happy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/routine"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              Get Your Routine
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-foreground rounded-xl font-semibold hover:bg-white/80 transition-all shadow-md hover:shadow-lg"
            >
              Explore Guides
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <Dog className="w-8 h-8 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">1000+</div>
              <div className="text-sm text-muted-foreground">Pet Parents</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <Cat className="w-8 h-8 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">Care Guides</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
              <Home className="w-8 h-8 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">8</div>
              <div className="text-sm text-muted-foreground">Apartment Types</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
    </section>
  );
}
