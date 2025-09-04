"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-white flex flex-col items-center justify-center overflow-hidden">
      {/* 🔥 Animated trading bars in background */}
      <div className="absolute inset-0 flex justify-center gap-2 opacity-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: 20 }}
            animate={{ height: [20, 120, 40, 90, 30] }}
            transition={{
              repeat: Infinity,
              duration: 2 + i * 0.1,
              ease: "easeInOut",
            }}
            className="w-1 bg-gradient-to-t from-sky-400 to-emerald-500 rounded"
          />
        ))}
      </div>

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden mt-10"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-cyan-500 text-white p-8 text-center">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold mb-2 tracking-tight"
          >
            Contact FutureStock
          </motion.h1>
          <p className="text-sky-100">
            Let’s connect about markets, trading & opportunities 🚀
          </p>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.form
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold shadow-lg"
            >
              <Send size={18} /> Send Message
            </motion.button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center space-y-6"
          >
            <InfoCard
              icon={<Phone className="text-green-600" size={22} />}
              title="Trading Desk"
              value="+91 98765 43210"
              color="green"
            />
            <InfoCard
              icon={<Mail className="text-blue-600" size={22} />}
              title="Support Email"
              value="support@futurestock.com"
              color="blue"
            />
            <InfoCard
              icon={<MapPin className="text-purple-600" size={22} />}
              title="HQ Address"
              value="Bangalore, India"
              color="purple"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-4 border border-${color}-200 p-4 rounded-lg shadow-sm hover:shadow-md transition`}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-slate-600">{value}</p>
      </div>
    </motion.div>
  );
}
