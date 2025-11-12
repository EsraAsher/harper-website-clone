import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-8 sm:p-12 text-center text-white">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Sparkles className="w-8 h-8" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your Pet Care Routine?
            </h2>
            
            {/* Description */}
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of Indian pet parents who are making apartment living work for their furry friends. Get personalized routines, expert advice, and curated products.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/routine"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                Try Routine Generator
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm text-white/80 mb-4">Trusted by pet parents across India</p>
              <div className="flex flex-wrap items-center justify-center gap-8 text-white/60">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1000+</div>
                  <div className="text-xs">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-xs">Guides</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.8★</div>
                  <div className="text-xs">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
