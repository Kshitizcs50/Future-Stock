"use client";

import {
  AcademicCapIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function Features() {
  const features = [
    {
      name: "Smart Analytics",
      description:
        "Track sales, growth, and performance with AI-powered real-time insights and dashboards.",
      icon: ChartBarIcon,
    },
    {
      name: "Seamless Shopping",
      description:
        "Enjoy a smooth checkout with secure payments and a user-friendly experience.",
      icon: ShoppingBagIcon,
    },
    {
      name: "Complete Liquidity Partner",
      description:
        "Unlike others, we don’t just sell—we’re also active buyers, giving you full liquidity support.",
      icon: AcademicCapIcon,
    },
    {
      name: "Secure & Reliable",
      description:
        "Built with enterprise-grade security so your data and transactions are always safe.",
      icon: ShieldCheckIcon,
    },
    {
      name: "Fast Innovation",
      description:
        "Our AI-driven platform evolves quickly, bringing you new features every month.",
      icon: RocketLaunchIcon,
    },
    {
      name: "Community Support",
      description:
        "Join a growing network of users, mentors, and innovators who share knowledge.",
      icon: UserGroupIcon,
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Discover the features that make our platform powerful, secure, and
          user-friendly.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-6">
              <feature.icon className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              {feature.name}
            </h3>
            <p className="mt-4 text-gray-600 text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
