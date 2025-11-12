"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useSession } from "@/lib/auth-client";
import {
  Check,
  Crown,
  Download,
  Users,
  Calendar,
  BookOpen,
  Video,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface Membership {
  id: number;
  userId: string;
  tier: string;
  status: string;
  startDate: string;
  endDate: string;
}

export default function MembershipPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [currentMembership, setCurrentMembership] = useState<Membership | null>(null);
  const [isLoadingMembership, setIsLoadingMembership] = useState(true);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push(`/login?redirect=${encodeURIComponent("/membership")}`);
    }
  }, [session, isPending, router]);

  useEffect(() => {
    const fetchMembership = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(`/api/memberships/${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setCurrentMembership(data);
        }
      } catch (error) {
        console.error("Failed to fetch membership:", error);
      } finally {
        setIsLoadingMembership(false);
      }
    };

    if (session?.user?.id) {
      fetchMembership();
    }
  }, [session?.user?.id]);

  const handleSubscribe = async (tier: string) => {
    if (!session?.user) {
      router.push(`/login?redirect=${encodeURIComponent("/membership")}`);
      return;
    }

    // Placeholder for payment integration (Stripe/Razorpay)
    toast.info("Payment integration coming soon! This feature will allow you to subscribe to premium plans.");
  };

  const plans = [
    {
      name: "Free",
      tier: "free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started with basic pet care",
      features: [
        "Access to basic routine generator",
        "3 blog articles per week",
        "Community forum access",
        "Email newsletters",
      ],
      buttonText: "Current Plan",
      highlighted: false,
      icon: BookOpen,
    },
    {
      name: "Premium",
      tier: "premium",
      price: "₹499",
      period: "per month",
      description: "Everything you need for comprehensive pet care",
      features: [
        "Unlimited routine generation",
        "Full access to all blog content",
        "Premium downloadable guides (PDF)",
        "Monthly Q&A webinars",
        "Priority email support",
        "Exclusive product discounts",
        "Ad-free experience",
      ],
      buttonText: "Subscribe Now",
      highlighted: true,
      icon: Crown,
    },
    {
      name: "Pro",
      tier: "pro",
      price: "₹4,999",
      period: "per year",
      description: "Best value for dedicated pet parents",
      features: [
        "Everything in Premium",
        "Annual subscription (2 months free)",
        "1-on-1 consultation calls",
        "Custom pet care plans",
        "Early access to new features",
        "VIP community access",
        "Partner brand perks",
      ],
      buttonText: "Subscribe Now",
      highlighted: false,
      icon: Video,
    },
  ];

  if (isPending || isLoadingMembership) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-secondary">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
        <section className="bg-gradient-to-br from-[#fef9f3] via-[#fef3e2] to-[#d4f4dd] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Crown className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Upgrade Your Pet Care Journey
              </h1>
              <p className="text-lg text-muted-foreground">
                Get access to premium guides, webinars, and personalized support for your furry friend
              </p>
            </div>
          </div>
        </section>

        {/* Current Membership Status */}
        {currentMembership && (
          <section className="py-8 bg-white border-b border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto bg-accent/20 border border-accent rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Plan</p>
                    <p className="text-xl font-bold text-foreground capitalize">
                      {currentMembership.tier}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        currentMembership.status === "active"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {currentMembership.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Pricing Plans */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => {
                const Icon = plan.icon;
                const isCurrentPlan =
                  currentMembership?.tier === plan.tier &&
                  currentMembership?.status === "active";

                return (
                  <div
                    key={plan.tier}
                    className={`relative bg-white rounded-2xl overflow-hidden transition-all ${
                      plan.highlighted
                        ? "border-2 border-primary shadow-xl scale-105"
                        : "border border-border hover:shadow-lg"
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                        Most Popular
                      </div>
                    )}

                    <div className={`p-8 ${plan.highlighted ? "pt-14" : ""}`}>
                      {/* Icon */}
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>

                      {/* Plan Name */}
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {plan.name}
                      </h3>

                      {/* Price */}
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-foreground">
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground ml-2">
                          {plan.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm mb-6">
                        {plan.description}
                      </p>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleSubscribe(plan.tier)}
                        disabled={isCurrentPlan}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                          plan.highlighted
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                        } ${
                          isCurrentPlan
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {isCurrentPlan ? "Current Plan" : plan.buttonText}
                      </button>

                      {/* Features */}
                      <div className="mt-8 space-y-3">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Why Go Premium?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Download,
                    title: "Downloadable Resources",
                    description:
                      "Access premium PDF guides, checklists, and meal plans you can save and reference anytime.",
                  },
                  {
                    icon: Video,
                    title: "Monthly Webinars",
                    description:
                      "Join live Q&A sessions with pet care experts and get your questions answered in real-time.",
                  },
                  {
                    icon: Users,
                    title: "Priority Support",
                    description:
                      "Get faster responses and personalized advice from our dedicated support team.",
                  },
                  {
                    icon: Calendar,
                    title: "Custom Plans",
                    description:
                      "Receive tailored pet care routines based on your specific apartment size and pet needs.",
                  },
                ].map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="flex gap-4 p-6 rounded-xl bg-secondary border border-border"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {[
                  {
                    q: "Can I cancel my subscription anytime?",
                    a: "Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
                  },
                  {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets through our secure payment partners Stripe and Razorpay.",
                  },
                  {
                    q: "Is there a free trial available?",
                    a: "We offer a free tier with limited access. You can try out our basic features before upgrading to Premium or Pro.",
                  },
                  {
                    q: "Can I switch between plans?",
                    a: "Absolutely! You can upgrade or downgrade your plan anytime. Changes will be reflected in your next billing cycle.",
                  },
                ].map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white rounded-lg border border-border overflow-hidden"
                  >
                    <summary className="px-6 py-4 cursor-pointer font-semibold text-foreground hover:bg-secondary/50 transition-colors list-none flex items-center justify-between">
                      {faq.q}
                      <span className="text-primary ml-4">+</span>
                    </summary>
                    <div className="px-6 py-4 text-muted-foreground border-t border-border">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
