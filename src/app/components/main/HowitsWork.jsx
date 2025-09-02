"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, FileText, ShieldCheck, Lightbulb } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Connect With Us",
    desc: "Reach out via call, WhatsApp, or our website. Tell us your needs—buying, selling, ESOPs, or anything else.",
    icon: <Phone className="w-8 h-8 text-white" />,
  },
  {
    id: 2,
    title: "Get Expert Guidance",
    desc: "We'll guide you through the options, pricing, and process based on your goals and preferences.",
    icon: <Lightbulb className="w-8 h-8 text-white" />,
  },
  {
    id: 3,
    title: "Complete Documentation",
    desc: "We assist in completing the required formalities—whether it's demat onboarding, KYC, or ESOP verification.",
    icon: <FileText className="w-8 h-8 text-white" />,
  },
  {
    id: 4,
    title: "Trade Securely",
    desc: "Enjoy a smooth, secure transaction with fast fund transfer, timely share delivery, and full support at every step.",
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 w-[700px] h-[700px] bg-green-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-5xl font-extrabold text-center mb-20 bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          How It Works
        </motion.h2>

        {/* Steps Grid */}
        <div className="relative grid md:grid-cols-4 gap-10">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 rounded-full -z-10" />

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              whileHover={{ rotateX: 8, rotateY: -8, scale: 1.05 }}
              className="relative group bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-xl p-8 transition-transform duration-500"
            >
              {/* Step Number */}
              <span className="absolute -top-5 left-6 text-7xl font-extrabold text-gray-100 group-hover:text-emerald-200 transition-colors">
                {step.id}
              </span>

              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-400 shadow-lg shadow-emerald-200/50 mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-3">
                {step.title}
                <ArrowRight className="w-4 h-4 text-green-500 group-hover:translate-x-1 transition-transform" />
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
