"use client";

import { useState } from "react";
import { Mail, Download, CheckCircle } from "lucide-react";

export default function LeadMagnetSection() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/email-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          leadMagnet: "7-day-apartment-pet-plan",
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
        setName("");
      } else {
        const data = await response.json();
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              You're All Set!
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Check your email for your free 7-Day Apartment Pet Care Plan. We've also added you to our newsletter for more tips and guides.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-primary hover:underline font-medium"
            >
              Subscribe another email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Content */}
            <div className="p-8 sm:p-12 bg-gradient-to-br from-primary to-primary/80 text-white">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-6">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Free 7-Day Apartment Pet Plan
              </h3>
              <p className="text-white/90 leading-relaxed mb-6">
                Get a complete weekly routine customized for apartment living. Includes:
              </p>
              <ul className="space-y-3">
                {[
                  "Daily schedules for morning, afternoon & evening",
                  "Space-efficient exercise ideas",
                  "Feeding guidelines and portions",
                  "Noise management tips",
                  "Quick cleaning routines",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 sm:p-12">
              <h4 className="text-xl font-semibold text-foreground mb-6">
                Get Your Free Guide
              </h4>
              
              {error && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="lead-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Download Free Guide"}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
