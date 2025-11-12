import Link from "next/link";
import { Calendar, ShoppingBag, BookOpen, Award } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Personalized Routines",
    description: "Get custom daily schedules tailored to your pet type and apartment size. Perfect for studio to 3BHK spaces.",
    href: "/routine",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: ShoppingBag,
    title: "Curated Products",
    description: "Discover apartment-friendly pet products with affiliate recommendations from trusted Indian brands.",
    href: "/products",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: BookOpen,
    title: "Expert Guides",
    description: "SEO-rich articles on odor control, indoor activities, training, and more for apartment living.",
    href: "/blog",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Award,
    title: "Premium Membership",
    description: "Unlock exclusive downloads, webinars, and advanced Q&A sessions with pet care experts.",
    href: "/membership",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Apartment Pet Care
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive resources designed specifically for urban pet owners in India
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.color} mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
